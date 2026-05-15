'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudArrowUp,
  X,
  Check,
  FileImage,
  Selection,
  CaretRight,
  Copyright,
  MagicWand,
  Warning,
  Trash
} from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { cn } from '@/lib/utils';

export default function UploadStudio() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{id: number, name: string, size: string, status: string, progress: number}[]>([
    { id: 1, name: 'DSC_0124.jpg', size: '4.2MB', status: 'completed', progress: 100 },
    { id: 2, name: 'DSC_0125.jpg', size: '3.8MB', status: 'uploading', progress: 65 },
    { id: 3, name: 'DSC_0126.jpg', size: '5.1MB', status: 'queued', progress: 0 },
  ]);

  const removeFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <DashboardShell role="creator">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="gl-heading-display-md text-[var(--text-primary)]">Photo Upload Studio</h1>
            <p className="text-[var(--text-secondary)] mt-1">High-speed bulk upload with real-time AI indexing.</p>
          </div>
          <div className="flex items-center gap-3">
             <Badge variant="processing" className="h-10 px-4">AI Indexing Active</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
           {/* Upload Area */}
           <div className="lg:col-span-2 space-y-8">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                className={cn(
                  "gl-upload-zone min-h-[400px] flex flex-col items-center justify-center transition-all duration-700 relative overflow-hidden",
                  isDragging && "scale-[1.02] border-solid"
                )}
              >
                 {/* Animated background lines */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--viola)_0%,transparent_70%)] opacity-20" />
                 </div>

                 <motion.div
                   animate={isDragging ? { y: -20, scale: 1.2 } : { y: 0, scale: 1 }}
                   className="w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center mb-8 text-[var(--viola)]"
                 >
                    <CloudArrowUp size={48} weight="duotone" />
                 </motion.div>

                 <h2 className="text-2xl font-bold text-[var(--ink)] mb-3">Drag & drop your photos here</h2>
                 <p className="text-[var(--text-secondary)] mb-8 max-w-sm">Support for JPG, PNG, and RAW files. Up to 50MB per file.</p>

                 <div className="flex gap-4">
                    <Button className="h-12 px-8 shadow-viola">Select Files</Button>
                    <Button variant="outline" className="h-12 px-8 bg-white/50">Import from Dropbox</Button>
                 </div>
              </div>

              {/* Upload Queue */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-[var(--text-primary)]">Upload Queue ({files.length})</h3>
                    <button className="text-sm font-bold text-red-500 flex items-center gap-1 hover:opacity-80">
                       <Trash size={18} /> Clear All
                    </button>
                 </div>

                 <div className="space-y-3">
                    <AnimatePresence>
                      {files.map((file) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        >
                          <Card className="p-4 border-none shadow-sm flex items-center gap-4 group">
                             <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                <FileImage size={28} weight="duotone" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1.5">
                                   <span className="font-bold text-sm truncate">{file.name}</span>
                                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{file.size}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                   <motion.div
                                     initial={{ width: 0 }}
                                     animate={{ width: `${file.progress}%` }}
                                     className={cn(
                                       "h-full transition-all duration-500",
                                       file.status === 'completed' ? "bg-[var(--aperture-teal)]" : "bg-[var(--viola)]"
                                     )}
                                   />
                                </div>
                             </div>
                             <div className="flex items-center gap-2">
                                {file.status === 'completed' ? (
                                  <div className="w-8 h-8 rounded-full bg-[var(--aperture-teal)]/10 text-[var(--aperture-teal)] flex items-center justify-center">
                                     <Check size={18} weight="bold" />
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => removeFile(file.id)}
                                    className="w-8 h-8 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center"
                                  >
                                     <X size={18} weight="bold" />
                                  </button>
                                )}
                             </div>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                 </div>
              </div>
           </div>

           {/* Settings Sidebar */}
           <div className="space-y-8">
              <Card className="p-8 border-none shadow-sm bg-white space-y-8">
                 <div>
                    <h3 className="font-bold text-lg text-[var(--ink)] mb-6 flex items-center gap-2">
                       <Selection size={24} weight="duotone" className="text-[var(--viola)]" />
                       Upload Settings
                    </h3>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="gl-label">Target Event</label>
                          <select className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none text-sm font-medium focus:ring-2 focus:ring-[var(--viola)]/20 outline-none">
                             <option>Sterling Wedding</option>
                             <option>Tech Summit 2026</option>
                             <option>Create New Event...</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="gl-label">Album / Category</label>
                          <input type="text" placeholder="Ceremony, Reception, etc." className="w-full h-12 px-4 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-[var(--viola)]/20 outline-none" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-100 space-y-6">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Copyright size={20} weight="duotone" className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">Auto Copyright</span>
                       </div>
                       <div className="w-12 h-6 rounded-full bg-[var(--viola)] p-1 flex justify-end cursor-pointer">
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                       </div>
                    </div>

                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <MagicWand size={20} weight="duotone" className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">AI Enhancement</span>
                       </div>
                       <div className="w-12 h-6 rounded-full bg-slate-200 p-1 flex justify-start cursor-pointer">
                          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-slate-100">
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3 mb-6">
                       <Warning size={20} weight="fill" className="text-amber-500 flex-shrink-0" />
                       <p className="text-xs text-amber-800 leading-relaxed font-medium">
                          You have 1.2GB storage remaining. Consider upgrading to Pro for unlimited storage.
                       </p>
                    </div>
                    <Button fullWidth className="h-14 text-lg shadow-viola">
                       Start Processing <CaretRight className="ml-2" weight="bold" />
                    </Button>
                 </div>
              </Card>

              {/* Processing Preview */}
              <Card className="p-6 border-none bg-[var(--ink)] text-white overflow-hidden relative group">
                 <div className="relative z-10">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[var(--viola)] animate-pulse" />
                       AI Preview
                    </h4>
                    <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/10 relative overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-all duration-1000" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <Selection size={40} className="text-[var(--viola)] mb-3 opacity-60" />
                          <p className="text-xs font-bold text-white/60 tracking-widest uppercase">Detecting Faces...</p>
                       </div>
                       {/* Scanner line */}
                       <motion.div
                         animate={{ top: ['0%', '100%', '0%'] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="absolute left-0 right-0 h-[2px] bg-[var(--viola)] shadow-[0_0_15px_var(--viola)] z-20"
                       />
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </DashboardShell>
  );
}
