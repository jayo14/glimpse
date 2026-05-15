'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Selection,
  CheckCircle,
  Sparkle,
  ShieldCheck,
  ArrowRight,
  Flashlight,
  Aperture,
  X
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function GuestFaceSearch() {
  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'scanning' | 'success'>('upload');
  const [preview, setSetPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSetPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setStep('scanning');
    // Simulate scan process
    setTimeout(() => {
      setStep('success');
    }, 4500);
  };

  return (
    <DashboardShell role="guest">
      <div className="max-w-4xl mx-auto py-6 min-h-[80vh] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full text-center space-y-12"
            >
              <div className="space-y-4">
                 <p className="gl-label text-[var(--viola)]">Step 1 of 2</p>
                 <h1 className="gl-heading-display-md text-[var(--text-primary)]">Take a quick selfie</h1>
                 <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto leading-relaxed">
                   Our AI will use this to find all the photos you appear in across the event.
                 </p>
              </div>

              <div className="relative group max-w-sm mx-auto">
                 <div
                   onClick={() => fileInputRef.current?.click()}
                   className={cn(
                     "aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-dashed border-slate-200 bg-white shadow-xl cursor-pointer transition-all duration-500 hover:border-[var(--viola)]/50 relative flex items-center justify-center",
                     preview && "border-solid border-[var(--viola)] ring-8 ring-[var(--blush)]/20"
                   )}
                 >
                    {preview ? (
                      <img src={preview} alt="Selfie" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-slate-400 group-hover:text-[var(--viola)] transition-colors">
                         <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[var(--blush)] transition-colors">
                            <Camera size={40} weight="duotone" />
                         </div>
                         <p className="font-bold text-sm">Open Camera</p>
                      </div>
                    )}
                 </div>

                 <input
                   type="file"
                   ref={fileInputRef}
                   onChange={handleFileChange}
                   accept="image/*"
                   capture="user"
                   className="hidden"
                 />

                 {preview && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setSetPreview(null)}
                      className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors z-20"
                    >
                       <X size={20} weight="bold" />
                    </motion.button>
                 )}
              </div>

              <div className="space-y-8">
                 <Button
                   disabled={!preview}
                   onClick={startScan}
                   className="h-16 px-16 text-xl shadow-viola group disabled:opacity-50 disabled:shadow-none"
                 >
                    Start Finding Me <Sparkle className="ml-2 group-hover:rotate-12 transition-transform" weight="fill" />
                 </Button>

                 <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 max-w-sm mx-auto">
                    <div className="flex flex-col items-center gap-1.5 opacity-60">
                       <ShieldCheck size={24} weight="duotone" className="text-[var(--aperture-teal)]" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Private</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 opacity-60">
                       <Flashlight size={24} weight="duotone" className="text-[var(--viola)]" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Instant</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 opacity-60">
                       <Selection size={24} weight="duotone" className="text-[var(--flash-gold)]" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Secure</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-xl text-center space-y-12"
            >
               <div className="relative mx-auto w-64 h-64">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="var(--slate-100)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="var(--viola)"
                      strokeWidth="8"
                      strokeDasharray="753.98"
                      initial={{ strokeDashoffset: 753.98 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                        <img src={preview || ''} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[var(--viola)]/10" />

                        <motion.div
                          animate={{ top: ['-10%', '110%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--viola)] to-transparent shadow-[0_0_15px_var(--viola)] z-20"
                        />
                        <motion.div
                           animate={{ opacity: [0.2, 0.5, 0.2] }}
                           transition={{ duration: 0.5, repeat: Infinity }}
                           className="absolute inset-0 flex items-center justify-center"
                        >
                           <Selection size={120} weight="thin" className="text-white/20" />
                        </motion.div>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <motion.h2
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="gl-heading-display-md text-[var(--ink)]"
                  >
                    Finding your moments...
                  </motion.h2>
                  <div className="flex flex-col items-center gap-2">
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Aperture size={18} className="animate-spin-slow" /> Indexing faces
                     </p>
                     <p className="text-xs text-slate-400">Comparing 842 photos for matches</p>
                  </div>
               </div>

               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: [0, 0, 0, 0.8, 0] }}
                 transition={{ duration: 4.5, times: [0, 0.8, 0.9, 0.95, 1] }}
                 className="fixed inset-0 bg-white z-[200] pointer-events-none"
               />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 100 }}
              className="w-full max-w-2xl text-center space-y-12"
            >
               <div className="relative">
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto perspective-[1000px]">
                     {[
                       'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop',
                       'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
                       'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop'
                     ].map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 50, rotateY: 30 }}
                          animate={{ opacity: 1, y: 0, rotateY: 0 }}
                          transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
                          className="aspect-square rounded-2xl overflow-hidden shadow-photo ring-4 ring-white"
                        >
                           <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                     ))}
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[var(--aperture-teal)] text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
                  >
                     <CheckCircle size={20} weight="fill" /> 23 Photos Found
                  </motion.div>
               </div>

               <div className="space-y-4">
                  <h2 className="gl-heading-display-md text-[var(--ink)]">Pure magic!</h2>
                  <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
                    We found 23 photos of you. They are now available in your personal gallery.
                  </p>
               </div>

               <Button
                 onClick={() => router.push('/dashboard/guest')}
                 className="h-16 px-16 text-xl shadow-viola group"
               >
                  View My Photos <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" weight="bold" />
               </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
}
