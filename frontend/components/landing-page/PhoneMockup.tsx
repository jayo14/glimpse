/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import { Camera, Upload, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { Photo } from "@/lib/types";

interface PhoneMockupProps {
  eventName: string;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
  onPhotoUploaded: (photo: Photo) => void;
}

const GUEST_SAMPLE_PRESETS = [
  {
    url: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=85",
    caption: "Perfect light, perfect night!",
    author: "Liam S."
  },
  {
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=85",
    caption: "Unbelievable energy at the front stage!",
    author: "Zoe Miller"
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=85",
    caption: "Captured the happiest couple on earth",
    author: "Aria Winters"
  },
  {
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=85",
    caption: "Workshop mode activated! Brainstorming!",
    author: "Tyler G."
  }
];

export default function PhoneMockup({
  eventName,
  onPhotoUploaded
}: PhoneMockupProps) {
  const [uploaderName, setUploaderName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setUploadSuccess(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPresetImage = (url: string, presetCaption: string, author: string) => {
    setSelectedImage(url);
    setCaption(presetCaption);
    if (!uploaderName) {
      setUploaderName(author);
    }
    setUploadSuccess(false);
  };

  const handleSimulatedUpload = () => {
    if (!selectedImage) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newPhoto: Photo = {
              id: "up-" + Date.now(),
              url: selectedImage,
              caption: caption.trim() || undefined,
              uploaderName: uploaderName.trim() || "Anonymous Guest",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              reactions: { heart: 0, fire: 0, sparkle: 0, thumbsup: 0 }
            };
            onPhotoUploaded(newPhoto);
            setIsUploading(false);
            setUploadSuccess(true);
            setSelectedImage(null);
            setCaption("");
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  return (
    <div id="phone-portal" className="relative w-full max-w-[320px] mx-auto select-none">
      <div className="relative aspect-[9/19] w-full rounded-[48px] border-[8px] border-white/5 bg-black p-2.5 shadow-2xl ring-1 ring-white/10">

        <div className="absolute top-4 left-1/2 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-white/5"></div>

        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[38px] bg-black text-white font-body">

          <div className="flex h-8 items-center justify-between px-6 pt-2 text-[10px] font-medium text-white/30">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="h-2 w-4 rounded-sm border border-white/10 p-0.5">
                <div className="h-full w-2.5 bg-white/40"></div>
              </div>
            </div>
          </div>

          <header className="px-6 py-4 text-center border-b border-white/5">
            <div className="flex items-center justify-center gap-2">
              <span className="font-heading font-bold text-lg tracking-tighter italic">glimpse</span>
            </div>
            <p className="mt-1 text-[8px] text-white/20 uppercase tracking-[0.2em] truncate max-w-[200px] mx-auto">
              Event: <span className="text-white/40">{eventName || "Untitled"}</span>
            </p>
          </header>

          <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-none">
            {uploadSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading italic text-2xl text-white">Beamed.</h4>
                  <p className="text-[12px] text-white/30 font-light leading-relaxed italic">
                    Your memory is now live on the main screen.
                  </p>
                </div>
                <button
                  onClick={() => setUploadSuccess(false)}
                  className="mt-4 w-full py-4 border border-white/10 text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all font-bold"
                >
                  Upload Another
                </button>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-8">
                <div className="relative flex h-16 w-16 items-center justify-center">
                   <div className="absolute inset-0 rounded-full border border-white/5 border-t-white animate-spin"></div>
                   <Upload className="h-6 w-6 text-white/40" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading italic text-2xl text-white">Transmitting...</h4>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest">Optimizing for projection</p>
                </div>

                <div className="w-full space-y-4">
                   <div className="w-full bg-white/5 h-px overflow-hidden">
                     <div
                       className="h-full bg-white transition-all duration-300"
                       style={{ width: `${uploadProgress}%` }}
                     ></div>
                   </div>
                   <span className="text-[10px] font-bold text-white/40 tracking-widest">{uploadProgress}%</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Contributor</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    className="w-full bg-white/[0.03] px-4 py-4 text-sm text-white border border-white/5 rounded-none outline-none focus:border-white transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Visual Asset</label>

                  {selectedImage ? (
                    <div className="relative group overflow-hidden border border-white/5">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full aspect-square object-cover grayscale opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 bg-black/80 text-white rounded-full p-2 border border-white/20 transition-all hover:bg-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={triggerFileInput}
                      className="border border-dashed border-white/10 p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all text-center group"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Camera className="h-8 w-8 text-white/10 mb-3 group-hover:text-white/40 transition-colors" />
                      <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Capture Frame</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Toast / Caption</label>
                  <input
                    type="text"
                    placeholder="Optional message..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full bg-white/[0.03] px-4 py-4 text-sm text-white border border-white/5 rounded-none outline-none focus:border-white transition-all placeholder:text-white/10 italic"
                  />
                </div>

                <button
                  onClick={handleSimulatedUpload}
                  disabled={!selectedImage}
                  className="w-full py-5 bg-white text-black text-[11px] uppercase tracking-[0.3em] font-bold disabled:opacity-30 transition-all hover:bg-white/90"
                >
                  Beam Moment
                </button>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-white/20">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Simulation Presets</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {GUEST_SAMPLE_PRESETS.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => selectPresetImage(preset.url, preset.caption, preset.author)}
                        className="p-3 text-left bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group"
                      >
                        <div className="flex items-center gap-2 mb-1.5 font-bold text-white/40">
                          <ImageIcon className="h-2.5 w-2.5 text-white/10 group-hover:text-white/40" />
                          <span className="text-[8px] truncate uppercase tracking-tighter">{preset.author}</span>
                        </div>
                        <span className="block truncate text-[8px] text-white/20 italic font-light">"{preset.caption}"</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          <footer className="h-6 flex items-center justify-center">
            <div className="h-1 w-16 rounded-full bg-white/10"></div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  );
}
