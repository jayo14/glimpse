'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkle,
  Camera,
  CheckCircle,
  Scan,
  ArrowsClockwise,
  Heart,
  ShareNetwork,
  DownloadSimple
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GuestDashboardPage() {
  const [matchingStatus, setMatchingStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setMatchingStatus('scanning');
    setScanProgress(0);
  };

  useEffect(() => {
    if (matchingStatus === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setMatchingStatus('complete'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [matchingStatus]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <section className="relative rounded-[32px] overflow-hidden bg-[var(--ink)] p-8 lg:p-12 text-white shadow-photo">
        <div className="absolute inset-0 pointer-events-none bg-[var(--gradient-magic)] opacity-40" />
        <div className="relative z-10">
          <p className="gl-section-label !text-[var(--flash-gold)] mb-4">Personal Gallery</p>
          <h1 className="gl-heading-display-md mb-2">My Found Photos</h1>
          <p className="text-[#94A3B8] max-w-md">Every moment we found you in, curated into one cinematic experience.</p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-[-15deg] hidden lg:block">
           <Camera size={240} weight="duotone" />
        </div>
      </section>

      {matchingStatus === 'idle' && (
        <Card className="p-12 text-center bg-white border-dashed border-2 border-[var(--viola)]/30 shadow-none">
           <div className="w-20 h-20 bg-[var(--blush)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Scan size={40} className="text-[var(--viola)]" />
           </div>
           <h2 className="text-2xl font-bold mb-4 text-[var(--ink)]">Find your photos</h2>
           <p className="text-[var(--slate-600)] mb-8 max-w-sm mx-auto">Upload a quick selfie and our AI will find every photo you are in within seconds.</p>
           <Button onClick={startScan} className="h-14 px-10 text-lg">
             <Camera className="mr-2" /> Take a Selfie
           </Button>
        </Card>
      )}

      {matchingStatus === 'scanning' && (
        <Card className="p-12 text-center bg-white shadow-photo relative overflow-hidden border-none">
           <motion.div
             className="absolute inset-0 bg-white z-20 pointer-events-none"
             initial={{ opacity: 0 }}
             animate={scanProgress > 95 ? { opacity: [0, 0.8, 0] } : {}}
             transition={{ duration: 0.3 }}
           />

           <div className="relative w-32 h-32 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                 <circle
                   cx="64"
                   cy="64"
                   r="60"
                   stroke="currentColor"
                   strokeWidth="8"
                   fill="transparent"
                   className="text-[var(--bg-layer-2)]"
                 />
                 <motion.circle
                   cx="64"
                   cy="64"
                   r="60"
                   stroke="currentColor"
                   strokeWidth="8"
                   fill="transparent"
                   strokeDasharray="377"
                   strokeDashoffset={377 - (377 * scanProgress) / 100}
                   className="text-[var(--viola)]"
                   strokeLinecap="round"
                 />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img src="https://i.pravatar.cc/150?u=johndoe" alt="Selfie" className="w-full h-full object-cover" />
                 </div>
              </div>
           </div>

           <h2 className="text-2xl font-bold mb-2 text-[var(--ink)] flex items-center justify-center gap-3">
             <ArrowsClockwise className="animate-spin text-[var(--viola)]" size={24} />
             Scanning...
           </h2>
           <p className="text-[var(--slate-600)]">We are analyzing 847 event photos to find you.</p>
        </Card>
      )}

      {matchingStatus === 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--aperture-teal)]/10 flex items-center justify-center">
                   <CheckCircle size={28} weight="fill" className="text-[var(--aperture-teal)]" />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-[var(--ink)]">Magic Moment Revealed</h2>
                   <p className="text-[var(--slate-600)]">We found you in 23 high-quality shots.</p>
                </div>
             </div>
             <Button variant="outline" onClick={() => setMatchingStatus('idle')} className="h-10 text-sm">
                <ArrowsClockwise className="mr-2" /> Re-scan
             </Button>
          </div>

          <div className="gl-photo-grid">
            {[
              "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop",
            ].map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: i * 0.05,
                  duration: 0.5,
                  ease: "easeOut" as const
                }}
                className="group relative aspect-[4/5] rounded-[20px] overflow-hidden bg-[var(--bg-layer-2)] shadow-sm hover:shadow-photo hover:translate-y-[-4px] transition-all duration-300"
              >
                <img src={url} alt="Match" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Flash Gold Shimmer Overlay */}
                <motion.div
                  className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-[var(--flash-gold)]/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[var(--viola)] transition-colors">
                           <Heart size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-[var(--viola)] transition-colors">
                           <ShareNetwork size={20} />
                        </button>
                      </div>
                      <button className="h-10 px-4 rounded-full bg-[var(--viola)] text-white flex items-center justify-center text-sm font-bold hover:bg-[var(--deep-viola)] transition-colors">
                         <DownloadSimple className="mr-2" /> Save
                      </button>
                   </div>
                </div>

                <div className="absolute top-4 left-4">
                   <div className="bg-[var(--flash-gold)] text-[var(--ink)] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      98% Match
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating CTA for Mobile */}
      <div className="lg:hidden fixed bottom-28 left-0 right-0 px-6 z-30">
         <Button onClick={startScan} fullWidth className="h-16 text-lg shadow-viola">
            <Scan className="mr-2" size={24} /> New Selfie Scan
         </Button>
      </div>
    </div>
  );
}
