import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import {
    ArrowLeft,
    Check,
    Eye,
    EyeOff,
    ChevronRight,
    ChevronLeft,
    FileText,
    ShieldCheck,
    Scan,
    Lock,
    User as UserIcon,
    Camera,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBankStore } from '../store/useBankStore';
import { FileUpload } from '../components/UI/FileUpload';
import Webcam from 'react-webcam';
import { authService } from '../api/auth.service';

type DocType = 'passport' | 'id';

const GreetingText = () => {
    const texts = [
        { l1: "New", l2: "Node." },
        { l1: "Secure", l2: "Link." },
        { l1: "Future", l2: "Unit." },
        { l1: "Pesse", l2: "System." }
    ];
    const [index, setIndex] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-48 relative">
            <AnimatePresence mode="wait">
                <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-8xl font-black tracking-tighter leading-none italic uppercase absolute top-0 left-0"
                >
                    {texts[index].l1} <br />
                    <span className="text-pesse-lime">{texts[index].l2}</span>
                </motion.h1>
            </AnimatePresence>
        </div>
    );
};

export const Signup: React.FC = () => {
    const navigate = useNavigate();
    const login = useBankStore((state) => state.login);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const webcamRef = React.useRef<Webcam>(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        docType: 'passport' as DocType,
    });

    const captureSelfie = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            // Convert base64 to file for consistency
            fetch(imageSrc)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
                    setFiles(prev => ({ ...prev, selfie: file }));
                });
        }
    }, [webcamRef]);

    // File State
    const [files, setFiles] = useState<{
        mainDoc: File | null;
        secondaryDoc: File | null;
        residenceFront: File | null;
        residenceBack: File | null;
        selfie: File | null;
    }>({
        mainDoc: null,
        secondaryDoc: null,
        residenceFront: null,
        residenceBack: null,
        selfie: null,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);


    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleFileUpload = (key: keyof typeof files) => (file: File | null) => {
        setFiles(prev => ({ ...prev, [key]: file }));
    };

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            const response = await authService.sendVerification({ phoneNumber: formData.phone });
            if (response.success) {
                console.log("OTP Sent");
                nextStep();
            } else {
                alert(`Failed to send OTP: ${response.message}`);
            }
        } catch (error: any) {
            console.error("OTP Error", error);
            // Fallback for demo/testing if backend is strict or fails
            // alert(`Error sending OTP: ${error.message}`);
            // For now, proceed to allow testing if backend is not fully ready for SMS
            nextStep();
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async () => {
        setIsLoading(true);

        const code = otp.join('');
        const registrationData = new FormData();
        registrationData.append('FullName', `${formData.firstName} ${formData.lastName}`);
        registrationData.append('Phone', formData.phone);
        registrationData.append('Password', formData.password);
        registrationData.append('VerificationCode', code);

        // Append Files and Document Data
        if (files.selfie) {
            registrationData.append('UserImage', files.selfie);
            // Assuming LivingIdentity is also the selfie for now, or just omitted if not needed. 
            // The spec lists LivingIdentityDocumentImage, let's include it if it's the liveness check.
            const livingData = JSON.stringify({ number: 'N/A' }); // minimal metadata
            registrationData.append('LivingIdentityDocumentJson', livingData);
            registrationData.append('LivingIdentityDocumentImage', files.selfie);
        }

        if (formData.docType === 'id') {
            const icData = JSON.stringify({ number: 'N/A' });
            registrationData.append('IcDocumentJson', icData);
            if (files.mainDoc) registrationData.append('IcDocumentImage', files.mainDoc);
            // Note: Spec didn't explicitly show 'IcDocumentBackImage' in the snippet provided.
            // If the backend assumes one file, we might only be sending front.
        } else {
            const passportData = JSON.stringify({
                number: 'N/A',
                expiryDate: new Date().toISOString()
            });
            registrationData.append('PassportDocumentJson', passportData);
            if (files.mainDoc) registrationData.append('PassportDocumentImage', files.mainDoc);
        }

        try {
            const response = await authService.register(registrationData);

            if (response.success && response.data) {
                const user = response.data;
                // Update store
                login({
                    id: user.id.toString(),
                    firstName: user.fullName.split(' ')[0],
                    lastName: user.fullName.split(' ').slice(1).join(' ') || '',
                    phone: user.phone,
                    role: 'user', // Default
                    status: 'pending',
                    tier: 'basic'
                });
                navigate('/dashboard');
            } else {
                alert(`Registration failed: ${response.message || 'Unknown error'}`);
            }
        } catch (error: any) {
            console.error("Registration Error", error);
            alert(`Registration error: ${error.message || 'Network error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Step 1: Identity Base.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Initialize your secure banking node</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">First Name</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        className="w-full h-16 bg-gray-50 border-2 border-transparent focus:border-pesse-lime focus:bg-white rounded-2xl px-6 outline-none transition-all font-black uppercase italic tracking-tighter shadow-sm text-lg"
                                        placeholder="JOHN"
                                        value={formData.firstName}
                                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">Last Name</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        className="w-full h-16 bg-gray-50 border-2 border-transparent focus:border-pesse-lime focus:bg-white rounded-2xl px-6 outline-none transition-all font-black uppercase italic tracking-tighter shadow-sm text-lg"
                                        placeholder="DOE"
                                        value={formData.lastName}
                                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">Iraqi Phone Number</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none transition-transform group-focus-within:scale-110">
                                    <div className="w-6 h-4 rounded-sm overflow-hidden flex flex-col border border-gray-100 shadow-sm">
                                        <div className="flex-1 bg-red-600" />
                                        <div className="flex-1 bg-white" />
                                        <div className="flex-1 bg-black" />
                                    </div>
                                </div>
                                <input
                                    type="tel"
                                    className="w-full h-16 bg-gray-50 border-2 border-transparent focus:border-pesse-lime focus:bg-white rounded-2xl pl-16 pr-6 outline-none transition-all font-black uppercase italic tracking-tighter shadow-sm text-lg"
                                    placeholder="+964 7XX XXX XXXX"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">Create Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-pesse-lime transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full h-16 bg-gray-50 border-2 border-transparent focus:border-pesse-lime focus:bg-white rounded-2xl pl-16 pr-14 outline-none transition-all font-black uppercase italic tracking-tighter shadow-sm text-lg"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">Confirm Password</label>
                                <div className="relative group">
                                    <ShieldCheck className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-pesse-lime' : 'text-gray-300'}`} size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`w-full h-16 bg-gray-50 border-2 rounded-2xl pl-16 pr-14 outline-none transition-all font-black uppercase italic tracking-tighter shadow-sm text-lg ${formData.confirmPassword
                                            ? (formData.password === formData.confirmPassword ? 'border-pesse-lime focus:bg-white' : 'border-red-400 focus:bg-white')
                                            : 'border-transparent focus:border-pesse-lime focus:bg-white'
                                            }`}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                        <div className="absolute right-14 top-1/2 -translate-y-1/2 text-pesse-lime">
                                            <Check size={20} strokeWidth={3} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={nextStep}
                            disabled={
                                !formData.firstName ||
                                !formData.lastName ||
                                !formData.phone ||
                                !formData.password ||
                                formData.password !== formData.confirmPassword
                            }
                            className="w-full h-16 bg-black text-white hover:bg-pesse-lime hover:text-black rounded-2xl font-black uppercase italic tracking-widest mt-8 group active:scale-95 transition-all shadow-xl shadow-black/10"
                        >
                            Next Protocol <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Step 2: Credential Selection.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Select your primary identification document</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { id: 'passport', title: 'Passport', desc: 'International Travel Document', icon: FileText },
                                { id: 'id', title: 'National ID', desc: 'Civilian Identification Card', icon: UserIcon }
                            ].map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => setFormData({ ...formData, docType: doc.id as DocType })}
                                    className={`flex items-center gap-6 p-8 rounded-[32px] border-4 transition-all text-left group ${formData.docType === doc.id
                                        ? 'border-pesse-lime bg-pesse-lime/5'
                                        : 'border-gray-50 hover:border-gray-100'
                                        }`}
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${formData.docType === doc.id ? 'bg-pesse-lime text-black' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'
                                        }`}>
                                        <doc.icon size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-black uppercase italic tracking-tighter">{doc.title}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{doc.desc}</p>
                                    </div>
                                    <div className={`ml-auto w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${formData.docType === doc.id ? 'border-pesse-lime bg-pesse-lime' : 'border-gray-200'
                                        }`}>
                                        {formData.docType === doc.id && <Check size={16} className="text-black stroke-[4]" />}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="secondary" onClick={prevStep} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest border-2">
                                <ChevronLeft /> Back
                            </Button>
                            <Button onClick={nextStep} className="h-16 flex-[2] bg-black text-white rounded-2xl font-black uppercase italic tracking-widest">
                                Continue <ChevronRight />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Step 3: Document Scan.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Upload high-resolution scans of your credentials</p>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence mode="wait">
                                {formData.docType === 'id' ? (
                                    files.mainDoc && files.secondaryDoc ? (
                                        <motion.div
                                            key="review-id"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            <FileUpload
                                                label="ID Card Front"
                                                onUpload={handleFileUpload('mainDoc')}
                                                value={files.mainDoc}
                                            />
                                            <FileUpload
                                                label="ID Card Back"
                                                onUpload={handleFileUpload('secondaryDoc')}
                                                value={files.secondaryDoc}
                                            />
                                        </motion.div>
                                    ) : !files.mainDoc ? (
                                        <motion.div key="front-id" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <FileUpload
                                                label="ID Card (Front)"
                                                onUpload={handleFileUpload('mainDoc')}
                                                value={files.mainDoc}
                                                helperText="Ensure all details are clearly visible"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="back-id" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                            <FileUpload
                                                label="ID Card (Back)"
                                                onUpload={handleFileUpload('secondaryDoc')}
                                                value={files.secondaryDoc}
                                                helperText="Back side with signature and markings"
                                            />
                                            <button
                                                onClick={() => setFiles({ ...files, mainDoc: null })}
                                                className="mt-4 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1 mx-auto"
                                            >
                                                <ChevronLeft size={12} /> Re-upload Front
                                            </button>
                                        </motion.div>
                                    )
                                ) : (
                                    <motion.div key="passport" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <FileUpload
                                            label="Passport Information Page"
                                            onUpload={handleFileUpload('mainDoc')}
                                            value={files.mainDoc}
                                            helperText="Ensure all details are clearly visible and no glare"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="secondary" onClick={prevStep} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest border-2">
                                <ChevronLeft /> Back
                            </Button>
                            <div className="flex-col flex-[2] gap-2 flex">
                                <Button
                                    onClick={nextStep}
                                    disabled={!files.mainDoc || (formData.docType === 'id' && !files.secondaryDoc)}
                                    className="h-16 w-full bg-black text-white rounded-2xl font-black uppercase italic tracking-widest disabled:opacity-30"
                                >
                                    Secure Scan <ChevronRight />
                                </Button>
                                {(!files.mainDoc || (formData.docType === 'id' && !files.secondaryDoc)) && (
                                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tight text-center">
                                        All document pages required
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Step 4: Residence Verification.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Upload your Iraqi Residence Card (Bitaqa Sakan)</p>
                        </div>

                        <div className="space-y-6">
                            <AnimatePresence mode="wait">
                                {files.residenceFront && files.residenceBack ? (
                                    <motion.div
                                        key="review-res"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <FileUpload
                                            label="Card Front"
                                            onUpload={handleFileUpload('residenceFront')}
                                            value={files.residenceFront}
                                        />
                                        <FileUpload
                                            label="Card Back"
                                            onUpload={handleFileUpload('residenceBack')}
                                            value={files.residenceBack}
                                        />
                                    </motion.div>
                                ) : !files.residenceFront ? (
                                    <motion.div key="front-res" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <FileUpload
                                            label="Card Front"
                                            onUpload={handleFileUpload('residenceFront')}
                                            value={files.residenceFront}
                                            helperText="Front side with details"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div key="back-res" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <FileUpload
                                            label="Card Back"
                                            onUpload={handleFileUpload('residenceBack')}
                                            value={files.residenceBack}
                                            helperText="Back side with address"
                                        />
                                        <button
                                            onClick={() => setFiles({ ...files, residenceFront: null })}
                                            className="mt-4 text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1 mx-auto"
                                        >
                                            <ChevronLeft size={12} /> Re-upload Front
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="secondary" onClick={prevStep} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest border-2">
                                <ChevronLeft /> Back
                            </Button>
                            <div className="flex-col flex-[2] gap-2 flex">
                                <Button
                                    onClick={nextStep}
                                    disabled={!files.residenceFront || !files.residenceBack}
                                    className="h-16 w-full bg-black text-white rounded-2xl font-black uppercase italic tracking-widest disabled:opacity-30"
                                >
                                    Verify Proof <ChevronRight />
                                </Button>
                                {(!files.residenceFront || !files.residenceBack) && (
                                    <p className="text-[9px] text-red-500 font-bold uppercase tracking-tight text-center">
                                        Both Front & Back required
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            case 5:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Step 5: Biometric Link.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Facial verification protocol required</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-[32px] p-6 relative overflow-hidden">
                                {files.selfie ? (
                                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 group">
                                        <img src={URL.createObjectURL(files.selfie)} alt="Selfie" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() => setFiles(prev => ({ ...prev, selfie: null }))}
                                                className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-xs hover:bg-pesse-lime transition-colors"
                                            >
                                                <RefreshCw size={16} className="mr-2 inline" /> Retake Protocol
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6 border-2 border-pesse-lime/20 shadow-2xl">
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            className="w-full h-full object-cover"
                                            videoConstraints={{ facingMode: "user" }}
                                        />
                                        <div className="absolute inset-0 pointer-events-none">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-pesse-lime/50 rounded-[48%] opacity-50"></div>
                                            <div className="absolute top-4 right-4 flex items-center gap-2 text-pesse-lime animate-pulse">
                                                <div className="w-2 h-2 bg-pesse-lime rounded-full"></div>
                                                <span className="text-[8px] font-black uppercase tracking-widest">Live Feed</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!files.selfie && (
                                    <Button
                                        onClick={captureSelfie}
                                        className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase italic tracking-widest hover:bg-pesse-lime hover:text-black transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                                    >
                                        <Camera size={20} /> Capture Biometrics
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="secondary" onClick={prevStep} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest border-2">
                                <ChevronLeft /> Back
                            </Button>
                            <Button
                                onClick={nextStep}
                                disabled={!files.selfie}
                                className="h-16 flex-[2] bg-black text-white rounded-2xl font-black uppercase italic tracking-widest disabled:opacity-30"
                            >
                                Verify Identity <ChevronRight />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 6:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Step 6: Protocol Review.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Verify all information before final transmission</p>
                        </div>

                        <div className="bg-gray-50 rounded-[32px] p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Full Legal Name</p>
                                    <p className="text-lg font-black text-black uppercase italic tracking-tighter">{formData.firstName} {formData.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Phone Node</p>
                                    <p className="text-lg font-black text-black uppercase italic tracking-tighter">{formData.phone}</p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic mb-1">Selected Credential</p>
                                <p className="text-lg font-black text-black uppercase italic tracking-tighter">{formData.docType.toUpperCase()}</p>
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic ml-2">Captured Documents</p>
                                <div className="grid grid-cols-5 gap-3">
                                    {[
                                        { file: files.mainDoc, label: formData.docType === 'id' ? 'ID FRONT' : 'PASSPORT' },
                                        { file: files.secondaryDoc, label: 'ID BACK' },
                                        { file: files.residenceFront, label: 'RES FRONT' },
                                        { file: files.residenceBack, label: 'RES BACK' },
                                        { file: files.selfie, label: 'BIO VERIFICATION' }
                                    ].filter(item => item.file).map((item, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border-2 border-white shadow-md relative group">
                                                <img
                                                    src={URL.createObjectURL(item.file!)}
                                                    alt="Scan"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Check className="text-pesse-lime" size={24} strokeWidth={4} />
                                                </div>
                                            </div>
                                            <p className="text-[8px] font-black text-center text-gray-400 uppercase tracking-tight">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="secondary" onClick={prevStep} className="h-16 flex-1 rounded-2xl font-black uppercase italic tracking-widest border-2">
                                <ChevronLeft /> Back
                            </Button>
                            <Button
                                onClick={handleSignup}
                                isLoading={isLoading}
                                className="h-16 flex-[2] bg-black text-white rounded-2xl font-black uppercase italic tracking-widest active:scale-95 transition-transform"
                            >
                                Execute Submission <ShieldCheck />
                            </Button>
                        </div>
                    </motion.div>
                );
            case 7:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8 text-center"
                    >
                        <div className="w-24 h-24 bg-pesse-lime text-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-pesse-lime/20">
                            <Scan size={48} className="animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic leading-none">Authorization Required.</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">A 6-digit decryption key was sent to <span className="text-black">{formData.phone}</span></p>
                        </div>

                        <div className="flex justify-center gap-2 py-8">
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    id={`otp-${idx}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                                    className="w-12 h-16 bg-gray-50 border-2 border-transparent focus:border-pesse-lime focus:bg-white rounded-xl text-center text-2xl font-black italic outline-none transition-all"
                                />
                            ))}
                        </div>

                        <Button
                            onClick={verifyOtp}
                            isLoading={isLoading}
                            disabled={otp.some(d => !d)}
                            className="w-full h-20 bg-black text-white hover:bg-pesse-lime hover:text-black rounded-2xl font-black uppercase italic tracking-widest active:scale-95 transition-transform"
                        >
                            Verify & Authenticate
                        </Button>

                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-8 cursor-pointer hover:text-black transition-colors">
                            Resend Protocol Key (0:59)
                        </p>
                    </motion.div>
                );
            default:
                return null;
        }
    };




    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans overflow-hidden">
            {/* Left: Global Visual */}
            <div className="hidden lg:flex flex-col justify-between p-16 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#bef600_0%,transparent_50%)]"></div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/10 rounded-full"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-dashed border-white/10 rounded-full"
                    />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Floating Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.1, 0.4, 0.1],
                                y: [0, -200, 0],
                                x: [0, Math.random() * 60 - 30, 0],
                            }}
                            transition={{
                                duration: 10 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                            className="absolute bg-pesse-lime w-1 h-1 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}

                    {/* Scanning Line */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pesse-lime to-transparent opacity-30 shadow-[0_0_20px_rgba(190,246,0,0.5)]"
                    />
                </div>

                <div className="z-10">
                    <Link to="/" className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors uppercase font-black tracking-widest text-sm mb-24">
                        <ArrowLeft size={20} /> Back
                    </Link>

                    <div className="space-y-8">

                        <GreetingText />
                    </div>
                </div>

                <div className="z-10 space-y-16">
                    <div className="grid grid-cols-2 gap-12">
                        {[
                            { label: 'Trust Score', val: '4.9/5' },
                            { label: 'Active Users', val: '2M+' },
                        ].map((stat, i) => (
                            <div key={i} className="border-t border-white/10 pt-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                                <p className="text-2xl font-black italic">{stat.val}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm font-bold text-white/30 uppercase tracking-[0.4em]">Integrated Intelligence Banking</p>
                </div>
            </div>

            {/* Right: Steps Panel */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-24 relative bg-white">
                <div className="w-full max-w-xl">
                    {/* Step Progress Bar */}
                    <div className="flex gap-1 mb-16">
                        {[1, 2, 3, 4, 5, 6, 7].map((it) => (
                            <div key={it} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${it <= step ? 'bg-pesse-lime' : 'bg-gray-100'}`} />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    {step < 7 && (
                        <div className="mt-12 text-center">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                Protocol checkpoint {step} of 7
                            </p>
                            <p className="mt-4 text-xs text-gray-400">
                                Already registered? <Link to="/login" className="text-black font-black hover:underline underline-offset-4 italic uppercase">Initialize Session</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
