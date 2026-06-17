"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, Tv, Heart, Sparkles, Flame } from "lucide-react";
import { Photo } from "@/lib/types";

interface TvSlideshowProps {
  eventName: string;
  themeColor: string;
  photos: Photo[];
  onClose: () => void;
  isHero?: boolean;
}

export default function TvSlideshow({ eventName, themeColor, photos, onClose, isHero = false }: TvSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 6000;

  useEffect(() => {
    if (photos.length === 0) return;

    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (isPlaying) {
      const startTime = Date.now();
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const widthPercent = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(widthPercent);
      }, 100);

      timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
        setProgress(0);
      }, SLIDE_DURATION);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [currentIndex, isPlaying, photos.length]);

  if (photos.length === 0) {
    return (
      <div className={isHero ? "w-full h-full flex flex-col items-center justify-center bg-black text-white font-body" : "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-body"}>
        {!isHero && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex items-center justify-center h-12 w-12 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <Tv className="h-16 w-16 text-white/10 animate-pulse mb-6" />
        <h3 className="font-heading italic text-2xl tracking-tight">No Photos Uploaded Yet</h3>
        <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] mt-3 max-w-sm text-center">
          Upload some photos to see them live
        </p>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    setProgress(0);
  };

  const content = (
    <div className={isHero ? "w-full h-full bg-black flex flex-col justify-between overflow-hidden relative select-none font-body text-white" : "fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none font-body text-white"}>

      <div className="absolute inset-0 z-0 opacity-20 scale-110 pointer-events-none filter blur-[120px] transition-all duration-1000">
        <img
          src={currentPhoto.url}
          alt=""
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-8 py-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white">
            <Tv className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border bg-white text-black border-white">
                Live Stream Active
              </span>
            </div>
            <h1 className="font-heading italic text-xl text-white tracking-tight mt-1">
              {eventName || "My Event Hub"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-white text-black hover:bg-white/90 transition-all cursor-pointer shadow-xl"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-black" />}
            </button>

            <button
              onClick={handleNext}
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {!isHero && (
            <>
              <div className="h-8 w-px bg-white/10 mx-2"></div>
              <button
                onClick={onClose}
                className="flex items-center justify-center h-12 px-6 gap-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-pointer text-[11px] font-bold uppercase tracking-[0.2em]"
              >
                <X className="h-4 w-4" />
                Exit
              </button>
            </>
          )}
        </div>
      </header>

      <main className="relative flex-1 z-10 flex items-center justify-center px-4 md:px-24 py-8">
        <div className="relative max-h-[70vh] w-full flex flex-col justify-center items-center shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">

          <img
            src={currentPhoto.url}
            alt="Venue Display"
            className="max-h-[65vh] object-contain select-none animate-fade-in grayscale-[20%] opacity-90"
            style={{ animationDuration: "500ms" }}
            referrerPolicy="no-referrer"
          />

          <div className="absolute right-6 bottom-6 flex items-center gap-2 p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-[10px] font-medium text-white">
            <div className="flex items-center gap-1.5 px-2 border-r border-white/10">
              <Heart className="h-3.5 w-3.5 fill-white text-white" />
              <span>{currentPhoto.reactions.heart}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 border-r border-white/10">
              <Flame className="h-3.5 w-3.5 text-white" />
              <span>{currentPhoto.reactions.fire}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>{currentPhoto.reactions.sparkle}</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-gradient-to-t from-black to-transparent pt-16 pb-12 px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-white/10 pb-8">

          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center font-heading font-bold text-xs uppercase">
                {currentPhoto.uploaderName.charAt(0)}
              </div>
              <div className="font-body">
                <span className="text-white text-sm font-semibold tracking-wide">
                  {currentPhoto.uploaderName}
                </span>
                <span className="text-white/40 text-[11px] uppercase tracking-widest ml-3">
                  {currentPhoto.timestamp}
                </span>
              </div>
            </div>

            {currentPhoto.caption ? (
              <p className="text-white text-2xl md:text-3xl font-heading italic leading-tight tracking-tight pr-12">
                "{currentPhoto.caption}"
              </p>
            ) : (
              <p className="text-white/40 text-sm italic font-heading">
                Captured another perspective...
              </p>
            )}
          </div>

          <div className="text-right">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] block mb-2">Projecting</span>
            <span className="text-white font-heading text-3xl italic block">
              {currentIndex + 1} <span className="text-white/20 font-light mx-1">/</span> {photos.length}
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <div className="h-px w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </footer>

    </div>
  );

  return isHero ? content : content;
}
