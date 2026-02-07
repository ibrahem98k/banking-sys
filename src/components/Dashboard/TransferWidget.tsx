import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../UI/Button';
import { CheckCircle2, X, Download, ShieldCheck, Loader2, ArrowRight } from 'lucide-react';
import { useBankStore } from '../../store/useBankStore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Account {
    id: string;
    type: 'Checking' | 'Savings';
    accountNumber: string;
    balance: number;
}

interface TransferWidgetProps {
    accounts: Account[];
    onTransferSuccess: () => void;
}

type Step = 'form' | 'confirm' | 'processing' | 'success';

export const TransferWidget: React.FC<TransferWidgetProps> = ({ accounts, onTransferSuccess }) => {
    const { user, updateBalance } = useBankStore();
    const [step, setStep] = useState<Step>('form');
    const [amount, setAmount] = useState('');
    const [fromAccountId, setFromAccountId] = useState(accounts && accounts.length > 0 ? accounts[0].id : '');
    const [toAccountNumber, setToAccountNumber] = useState('');
    const [error, setError] = useState<string | null>(null);
    const receiptRef = useRef<HTMLDivElement>(null);

    const fromAccount = accounts && accounts.length > 0 ? accounts.find(a => a.id === fromAccountId) : null;

    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!parseFloat(amount) || parseFloat(amount) <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (toAccountNumber.length !== 10) {
            setError("Account number must be exactly 10 digits");
            return;
        }
        if (fromAccount && fromAccount.balance < parseFloat(amount)) {
            setError("Insufficient funds");
            return;
        }
        setStep('confirm');
    };

    const confirmTransfer = async () => {
        setStep('processing');
        setError(null);

        try {
            const { transactionsService } = await import('../../api/transactions.service');
            const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
            
            if (!fromAccountId || isNaN(parseInt(fromAccountId))) {
                setError('Please select a valid account');
                setStep('form');
                return;
            }

            const response = await transactionsService.createTransfer(
                {
                    fromAccountId: parseInt(fromAccountId),
                    toAccountNumber: toAccountNumber,
                    amount: parseFloat(amount),
                    purpose: 'Transfer',
                },
                idempotencyKey
            );

            if (response.success) {
                updateBalance(-parseFloat(amount));
                setStep('success');
                onTransferSuccess();
            } else {
                setError(response.message || 'Transfer failed. Please try again.');
                setStep('form');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Transfer failed. Please try again.');
            setStep('form');
        }
    };

    const downloadPDF = async () => {
        if (!receiptRef.current) return;
        const canvas = await html2canvas(receiptRef.current, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#ffffff'
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Pesse-Receipt-${Date.now()}.pdf`);
    };

    const reset = () => {
        setStep('form');
        setAmount('');
        setToAccountNumber('');
    };

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-pesse-gray p-6 h-fit rounded-3xl shadow-xl shadow-black/5 relative overflow-hidden"
            >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-black tracking-tight uppercase">Transfer.</h3>
                    <div className="w-10 h-10 rounded-full bg-pesse-lime/10 flex items-center justify-center text-pesse-lime">
                        <ArrowRight size={20} />
                    </div>
                </div>

                {step === 'form' && (
                    <form onSubmit={handleInitialSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">From Account</label>
                            <select
                                value={fromAccountId}
                                onChange={(e) => setFromAccountId(e.target.value)}
                                className="w-full bg-pesse-light border-2 border-transparent focus:border-pesse-lime rounded-2xl py-4 px-4 text-black outline-none transition-all font-bold text-lg"
                            >
                                {accounts.map(acc => (
                                    <option key={acc.id} value={acc.id}>
                                        {acc.type} ({acc.accountNumber})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Recipient Account Number</label>
                            <input
                                type="text"
                                placeholder="0000 0000 00"
                                value={toAccountNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    if (val.length <= 10) setToAccountNumber(val);
                                }}
                                className="w-full bg-pesse-light border-2 border-transparent focus:border-pesse-lime rounded-2xl py-4 px-4 text-black placeholder-gray-300 outline-none transition-all font-bold text-xl"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Amount (USD)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-black">$</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-pesse-light border-2 border-transparent focus:border-pesse-lime rounded-2xl py-4 pl-10 pr-4 text-3xl font-black text-black placeholder-gray-200 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-bold">{error}</motion.p>}

                        <Button type="submit" className="w-full py-5 rounded-2xl text-xl font-black uppercase tracking-tighter shadow-lg shadow-pesse-lime/20">
                            Continue
                        </Button>
                    </form>
                )}

                {step === 'processing' && (
                    <div className="py-20 flex flex-col items-center justify-center text-center">
                        <div className="relative mb-8">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-24 h-24 rounded-full bg-pesse-lime/20 absolute -inset-0"
                            />
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-pesse-lime flex items-center justify-center relative z-10">
                                <Loader2 className="animate-spin text-pesse-lime w-10 h-10" />
                            </div>
                        </div>
                        <h4 className="text-2xl font-black text-black mb-2">Verifying...</h4>
                        <p className="text-gray-500 font-medium">Please wait while we secure your transaction.</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="py-10 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-pesse-lime rounded-full flex items-center justify-center mb-6 shadow-lg shadow-pesse-lime/30"
                        >
                            <CheckCircle2 size={40} className="text-black stroke-[3]" />
                        </motion.div>
                        <h4 className="text-3xl font-black text-black mb-2 tracking-tighter">Success!</h4>
                        <p className="text-gray-500 font-medium mb-8">Funds have been transferred.</p>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <button
                                onClick={downloadPDF}
                                className="flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-colors"
                            >
                                <Download size={18} /> Receipt
                            </button>
                            <button
                                onClick={reset}
                                className="flex items-center justify-center gap-2 bg-pesse-light text-black py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                Done
                            </button>
                        </div>

                        {/* Hidden Receipt for PDF Generation - Enhanced Design */}
                        <div className="fixed -left-[2000px] top-0">
                            <div
                                ref={receiptRef}
                                className="w-[794px] h-[1123px] bg-white relative overflow-hidden font-sans flex flex-col p-0"
                                style={{ boxShadow: 'none' }}
                            >
                                {/* Subtle Background Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg] select-none">
                                    <h1 className="text-[200px] font-black tracking-[0.2em]">PESSE</h1>
                                </div>

                                {/* Top Banner Design - Based on shared image */}
                                <div className="h-[220px] bg-[#f8f9fa] relative overflow-hidden border-b-[8px] border-pesse-lime">
                                    {/* Triangle Abstract Shapes - Enhanced with gradients */}
                                    <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-pesse-lime origin-top-right rotate-[35deg] translate-x-20 -translate-y-24 shadow-2xl"></div>
                                    <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-black origin-top-right rotate-[35deg] translate-x-44 -translate-y-44 opacity-25"></div>

                                    <div className="relative z-10 p-14 flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-xl shadow-black/20">
                                                <ShieldCheck size={38} className="text-pesse-lime" />
                                            </div>
                                            <div>
                                                <h1 className="text-4xl font-black tracking-tighter text-black leading-none uppercase italic">PESSE BANK.</h1>
                                                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">Certified Digital Node Entity</p>
                                            </div>
                                        </div>
                                        <div className="text-right text-[12px] font-bold text-gray-400 leading-relaxed mt-2">
                                            <p className="text-black">tx-auth@pesse.digital</p>
                                            <p>Node 0x4F-A2 | Baghdad Core</p>
                                            <p>+964 770 000 0000 | Pesse.io</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 p-20 flex flex-col relative z-10">
                                    <div className="flex justify-between items-center mb-16">
                                        <h2 className="text-6xl font-black text-black uppercase tracking-tighter italic">Invoice</h2>
                                        <div className="text-right">
                                            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 border border-green-200">
                                                Payment Verified
                                            </div>
                                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Auth Code: 88-102-XQ</p>
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className="grid grid-cols-2 gap-12 mb-16 text-sm">
                                        <div className="space-y-4 border-l-4 border-pesse-lime pl-6">
                                            <p><span className="font-black uppercase text-[10px] text-gray-400 block tracking-widest mb-1">Invoice Date</span> <span className="font-bold text-lg text-black">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></p>
                                            <p><span className="font-black uppercase text-[10px] text-gray-400 block tracking-widest mb-1">Invoice Number</span> <span className="font-bold text-lg text-black">INV-{Date.now().toString().slice(-6)}</span></p>
                                        </div>
                                        <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <p><span className="font-black uppercase text-[10px] text-gray-400 block tracking-widest mb-1">Bill To Client</span> <span className="font-black text-xl text-black uppercase italic">{user?.firstName} {user?.lastName}</span></p>
                                            <p className="font-bold text-gray-500 lowercase">{user?.email}</p>
                                            <p className="mt-2 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Debit Account: {fromAccount?.accountNumber}</p>
                                        </div>
                                    </div>

                                    {/* Table Section - Enhanced styling */}
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-black text-[10px] font-black uppercase text-pesse-lime tracking-[0.2em] text-left">
                                                <th className="p-5 rounded-tl-xl">Service Description</th>
                                                <th className="p-5 text-center">Qty</th>
                                                <th className="p-5 text-right">Unit Price</th>
                                                <th className="p-5 text-right rounded-tr-xl">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm font-bold text-black">
                                            <tr className="border-b border-gray-100">
                                                <td className="p-8">
                                                    <p className="font-black text-lg">Inter-Node Asset Transfer</p>
                                                    <p className="text-xs text-gray-400 mt-1 font-medium">To Destination: {toAccountNumber}</p>
                                                </td>
                                                <td className="p-8 text-center text-gray-400">01</td>
                                                <td className="p-8 text-right font-black text-lg">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                                <td className="p-8 text-right font-black text-lg">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                            <tr className="border-b border-gray-100">
                                                <td className="p-8 pb-12">
                                                    <p className="font-black text-lg">Secure Gateway Protocol</p>
                                                    <p className="text-xs text-gray-400 mt-1 font-medium">AES-256 Multi-Layer Encryption Fee</p>
                                                </td>
                                                <td className="p-8 pb-12 text-center text-gray-400">01</td>
                                                <td className="p-8 pb-12 text-right font-black text-lg">$0.00</td>
                                                <td className="p-8 pb-12 text-right font-black text-lg">$0.00</td>
                                            </tr>

                                            {/* Summary Rows */}
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td className="p-4 text-right font-black uppercase text-[10px] text-gray-400 tracking-widest">Subtotal</td>
                                                <td className="p-4 text-right font-black text-black text-xl border-b border-gray-100">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td className="p-4 text-right font-black uppercase text-[10px] text-gray-400 tracking-widest">Protocol Tax (0%)</td>
                                                <td className="p-4 text-right font-black text-black text-xl border-b-2 border-black/5">$0.00</td>
                                            </tr>
                                            <tr className="bg-pesse-lime">
                                                <td colSpan={2}></td>
                                                <td className="p-6 text-right font-black uppercase text-xs text-black tracking-[0.2em]">Total Outstanding</td>
                                                <td className="p-6 text-right font-black text-4xl text-black tracking-tighter italic">
                                                    ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Terms and Bottom - Refined */}
                                    <div className="mt-auto pt-16 grid grid-cols-3 gap-12 items-end">
                                        <div className="col-span-2">
                                            <p className="font-black text-black text-[12px] mb-2 uppercase tracking-widest border-b border-black w-fit pb-1">Terms 02-Node</p>
                                            <p className="text-[10px] font-bold text-gray-400 leading-relaxed max-w-md">
                                                All digital assets transferred via Pesse secure terminal are cryptographically final.
                                                Transaction hash: <span className="text-black">0x{Date.now().toString(16)}...{user?.id}</span>.
                                                Validated at {new Date().toLocaleTimeString()}.
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="inline-block p-4 border-2 border-dashed border-gray-200 rounded-2xl rotate-[-5deg]">
                                                <p className="text-[8px] font-black uppercase text-gray-300 tracking-[0.3em] mb-1">Authenticity Stamp</p>
                                                <ShieldCheck size={24} className="text-gray-200 mx-auto" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Branding Bar */}
                                <div className="h-2 bg-black w-full"></div>
                                <div className="h-6 bg-pesse-lime w-full flex items-center justify-center">
                                    <p className="text-[9px] font-black uppercase text-black tracking-[0.5em]">Pesse Digital Assets Authority — Secure Financial Layer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Confirmation Popup (Modal Overlay) */}
            <AnimatePresence>
                {step === 'confirm' && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="bg-white w-full max-w-md rounded-[40px] p-10 overflow-hidden relative shadow-2xl"
                        >
                            <button onClick={() => setStep('form')} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-500 hover:text-black transition-colors">
                                <X size={24} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-pesse-lime/10 rounded-full flex items-center justify-center mb-8">
                                    <ShieldCheck className="text-pesse-lime w-12 h-12" />
                                </div>

                                <h3 className="text-3xl font-black text-black mb-1 tracking-tighter">Confirm Transaction</h3>
                                <p className="text-gray-400 font-medium mb-10">Review the details before proceeding.</p>

                                <div className="w-full space-y-4 mb-10">
                                    <div className="bg-pesse-light rounded-3xl p-6 text-left relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-pesse-lime/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount to send</p>
                                        <p className="text-4xl font-black text-black tracking-tighter">${amount}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sender Name</p>
                                            <p className="text-sm font-black text-black">{user?.firstName} {user?.lastName}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Qi Account</p>
                                            <p className="text-sm font-black text-black">{fromAccount?.accountNumber}</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/5 rounded-2xl p-4 text-left border border-dashed border-black/10">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Transferring To</p>
                                        <p className="text-lg font-black text-black text-center tracking-widest">{toAccountNumber}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={confirmTransfer}
                                    className="w-full bg-black text-white hover:bg-zinc-900 py-6 rounded-[25px] text-2xl font-black tracking-tighter shadow-xl shadow-black/20 transition-transform active:scale-95"
                                >
                                    Confirm & Send
                                </button>

                                <p className="mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Secured by Pesse Multi-Node Auth</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
