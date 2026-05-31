/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Camera, Upload, Check, Sparkles, Image as ImageIcon } from "lucide-react";
import { Photo } from "../types";

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
    caption: "Captured the happiest couple on earth ❤️",
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
  themeColor,
  gradientFrom,
  gradientTo,
  onPhotoUploaded
}: PhoneMockupProps) {
  const [uploaderName, setUploaderName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cluely themed color matching
  const getThemeColorClass = () => {
    switch (themeColor) {
      case "rose": 
        return "bg-rose-mist hover:bg-rose-mist/95 text-deep-rose border border-rose-mist font-medium rounded-xl shadow-cluely-lifted";
      case "emerald": 
        return "bg-sage-green hover:bg-sage-green/95 text-forest border border-sage-green font-medium rounded-xl shadow-cluely-lifted";
      case "blue": 
        return "bg-deep-slate hover:bg-night text-white border border-deep-slate font-medium rounded-xl shadow-cluely-large";
      case "purple": 
        return "bg-[#8C929D] hover:bg-[#263043] text-white border border-[#8C929D] font-medium rounded-xl shadow-cluely-lifted";
      default: 
        return "bg-deep-slate hover:bg-night text-white border border-deep-slate font-medium rounded-xl shadow-cluely-large";
    }
  };

  const getThemeTextClass = () => {
    switch (themeColor) {
      case "rose": return "text-rose-mist";
      case "emerald": return "text-sage-green";
      case "blue": return "text-steel-gray";
      case "purple": return "text-stone";
      default: return "text-[#E4E4E7]";
    }
  };

  const getThemeBorderClass = () => {
    switch (themeColor) {
      case "rose": return "border-rose-mist/35 focus:border-rose-mist";
      case "emerald": return "border-sage-green/35 focus:border-sage-green";
      case "blue": return "border-silver/45 focus:border-platinum";
      default: return "border-silver/35 focus:border-platinum";
    }
  };

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
    <div id="phone-portal" className="relative w-full max-w-[320px] mx-auto sm:mx-0 select-none">
      {/* Phone Case Bezel - Sleek minimal slate device */}
      <div className="relative aspect-[9/19] w-full rounded-[40px] border-[10px] border-deep-slate bg-[#18171C] p-2 shadow-2xl">
        
        {/* Dynamic Island Camera Notch */}
        <div className="absolute top-4 left-1/2 z-30 h-4.5 w-24 -translate-x-1/2 rounded-full bg-[#18171C]"></div>
        
        {/* Screen Container */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-[#18171C] text-platinum font-sans">
          
          {/* Status bar mock */}
          <div className="flex h-7 items-center justify-between px-5 pt-1 text-[10px] font-medium text-stone">
            <span>9:41</span>
            <div className="flex items-center space-x-1.5">
              <span>5G</span>
              <div className="h-2 w-4 rounded-xs border border-stone/80 p-0.5">
                <div className="h-full w-2.5 bg-stone"></div>
              </div>
            </div>
          </div>

          {/* Web App Header inside Screen */}
          <header className={`px-4 py-3 text-center bg-[#263043]/30 border-b border-silver/15`}>
            <div className="flex items-center justify-center space-x-1.5">
              <Camera className={`h-4.5 w-4.5 ${getThemeTextClass()}`} />
              <span className="font-serif font-medium text-sm text-platinum">Glimpse Portal</span>
            </div>
            <p className="mt-0.5 text-[10px] text-stone truncate max-w-[200px] mx-auto">
              Guest upload for <span className="text-platinum font-medium">{eventName || "My Event"}</span>
            </p>
          </header>

          {/* Screen Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4.5 py-4 scrollbar-thin scrollbar-thumb-deep-slate scrollbar-track-transparent">
            {uploadSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-green/10 border border-sage-green/20 text-sage-green mb-4 animate-bounce">
                  <Check className="h-5 w-5" />
                </div>
                <h4 className="font-serif font-medium text-sm text-platinum">Upload Complete!</h4>
                <p className="mt-1.5 text-[11px] text-stone font-sans">
                  Your photo was beamed straight onto the host's central live screen hub.
                </p>
                <button
                  id="reset-success-btn"
                  onClick={() => setUploadSuccess(false)}
                  className="mt-6 rounded-xl border border-silver/15 px-4 py-2 text-xs font-medium text-platinum hover:bg-platinum/5 transition-all w-full cursor-pointer font-sans"
                >
                  Upload Another Photo
                </button>
              </div>
            ) : isUploading ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-silver/20 border-t-2 animate-spin border-t-platinum"></div>
                  <Upload className={`h-4 w-4 ${getThemeTextClass()} animate-pulse-slow`} />
                </div>
                <h4 className="font-serif font-medium text-sm text-platinum">Beaming Moment...</h4>
                <p className="mt-1 text-[10px] text-stone font-sans">Compressing & optimizing for the main screen</p>
                
                {/* Simulated Progress bar */}
                <div className="mt-5 w-full bg-[#263043] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#EDEEF2] transition-all duration-150"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className="mt-2 text-[10px] font-mono text-platinum">{uploadProgress}%</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Form Elements */}
                <div>
                  <label className="block text-[10px] font-medium text-stone uppercase tracking-wider mb-1 font-sans">Your Name</label>
                  <input
                    id="guest-name-input"
                    type="text"
                    placeholder="e.g. Grandma, Cousin Sarah"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    className={`w-full rounded-xl bg-charcoal/40 px-3 py-2 text-xs text-platinum border placeholder:text-stone/50 focus:outline-hidden transition-all ${getThemeBorderClass()}`}
                  />
                </div>

                {/* Upload Trigger Area */}
                <div>
                  <label className="block text-[10px] font-medium text-stone uppercase tracking-wider mb-1 font-sans">Upload Photo</label>
                  
                  {selectedImage ? (
                    <div className="relative rounded-2xl overflow-hidden border border-silver/30 group shadow-sm">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="w-full aspect-square object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        id="clear-img-btn"
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 bg-charcoal/80 hover:bg-charcoal text-platinum rounded-full p-1.5 transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={triggerFileInput}
                      className={`border border-dashed rounded-2xl p-4.5 flex flex-col items-center justify-center cursor-pointer hover:bg-platinum/5 transition-all text-center ${getThemeBorderClass()}`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        name="guest-photo"
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                      <Camera className="h-6 w-6 text-stone mb-1.5" />
                      <span className="text-[10px] text-platinum font-medium font-sans">Take a Photo or Browse</span>
                      <p className="text-[8px] text-stone mt-0.5 font-sans">Supports high-res JPG, PNG</p>
                    </div>
                  )}
                </div>

                {/* Optional Caption */}
                <div>
                  <label className="block text-[10px] font-medium text-stone uppercase tracking-wider mb-1 font-sans">Cheeky Caption</label>
                  <input
                    id="guest-caption-input"
                    type="text"
                    placeholder="Add a silly tag or toast..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className={`w-full rounded-xl bg-charcoal/40 px-3 py-2 text-xs text-platinum border placeholder:text-stone/50 focus:outline-hidden transition-all ${getThemeBorderClass()}`}
                  />
                </div>

                {/* Submit action */}
                <button
                  id="guest-upload-finish-btn"
                  onClick={handleSimulatedUpload}
                  disabled={!selectedImage}
                  className={`w-full py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed ${getThemeColorClass()}`}
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload Photo
                </button>

                {/* Interactive Sandbox Helper Panel */}
                <div className="pt-3 border-t border-silver/10">
                  <div className="flex items-center space-x-1.5 text-stone mb-2">
                    <Sparkles className="h-3 w-3 text-rose-mist animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-wider font-sans">Sandbox Shortcuts:</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {GUEST_SAMPLE_PRESETS.map((preset, index) => (
                      <button
                        id={`sandbox-shortcut-${index}`}
                        key={index}
                        onClick={() => selectPresetImage(preset.url, preset.caption, preset.author)}
                        className="flex flex-col text-left p-1.5 rounded-xl bg-charcoal/50 text-[8.5px] hover:bg-charcoal border border-silver/10 hover:border-platinum/30 transition-all text-stone group cursor-pointer"
                        title={preset.caption}
                      >
                        <div className="flex items-center space-x-1 mb-0.5 font-bold text-platinum">
                          <ImageIcon className="h-2 w-2 text-stone group-hover:text-platinum" />
                          <span className="truncate">{preset.author}</span>
                        </div>
                        <span className="truncate max-w-[100px] text-stone/70 italic">"{preset.caption}"</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Phone Bottom Notch Spacer */}
          <footer className="footer-notch h-4 flex items-center justify-center py-2">
            <div className="h-1 w-20 rounded-full bg-stone/30"></div>
          </footer>
        </div>
      </div>
    </div>
  );
}
