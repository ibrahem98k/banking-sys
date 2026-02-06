import React, { useRef, useState } from 'react';
import { Camera, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
    label: string;
    onUpload: (file: File | null) => void;
    value: File | null;
    helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, onUpload, value, helperText }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Sync preview with the actual file value from parent
    React.useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(value);
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onUpload(file);
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUpload(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic ml-2">{label}</label>
            <div
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 rounded-[32px] p-6 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[180px] group ${value
                        ? 'border-pesse-lime bg-pesse-lime/5 border-solid shadow-[0_0_20px_rgba(190,246,0,0.1)]'
                        : 'border-gray-100 border-dashed hover:border-pesse-lime/40 hover:bg-gray-50'
                    }`}
            >
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <AnimatePresence mode="wait">
                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="relative w-full h-full flex flex-col items-center"
                        >
                            <div className="relative w-full h-32 mb-3">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white"
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 rounded-2xl bg-pesse-lime/10 animate-pulse pointer-events-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-pesse-lime font-black text-[10px] uppercase italic tracking-widest">
                                <Check size={12} strokeWidth={4} /> Captured & Encrypted
                            </div>
                            <button
                                onClick={removeFile}
                                className="absolute -top-4 -right-4 bg-black text-white p-2 rounded-2xl shadow-2xl hover:bg-red-500 hover:scale-110 transition-all z-20 border-2 border-white"
                            >
                                <X size={16} strokeWidth={3} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3 text-center"
                        >
                            <div className="w-14 h-14 rounded-[20px] bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-pesse-lime group-hover:text-black transition-all group-hover:rotate-6 shadow-sm border border-gray-100">
                                <Camera size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-black uppercase tracking-tighter italic">Upload Document</p>
                                {helperText && <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{helperText}</p>}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
