/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Play, Pause, ChevronLeft, ChevronRight, Tv, Heart, Sparkles, Flame, Calendar } from "lucide-react";
import { Photo } from "../types";

interface TvSlideshowProps {
  eventName: string;
  themeColor: string;
  photos: Photo[];
  onClose: () => void;
}

export default function TvSlideshow({ eventName, themeColor, photos, onClose }: TvSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  useEffect(() => {
    if (photos.length === 0) return;

    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (isPlaying) {
      // Progress Bar Interval (runs every 100ms)
      const startTime = Date.now();
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const widthPercent = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(widthPercent);
      }, 100);

      // Slide Change Timer
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
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-night text-platinum font-sans">
        <button
          id="close-empty-slideshow-btn"
          onClick={onClose}
          className="absolute top-6 right-6 flex items-center justify-center h-10 w-10 rounded-full bg-charcoal border border-silver/15 text-stone hover:text-platinum hover:bg-deep-slate transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>
        <Tv className="h-16 w-16 text-[#8C929D] animate-pulse mb-4" />
        <h3 className="font-serif font-medium text-xl">No Photos Uploaded Yet</h3>
        <p className="text-stone text-xs mt-1.5 max-w-sm text-center">
          Upload some photos in the mock smartphone preview first, then cast your slideshow to see them live!
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

  const getThemeBadgeColor = () => {
    switch (themeColor) {
      case "rose": return "bg-rose-mist/10 border-rose-mist/20 text-rose-mist";
      case "emerald": return "bg-sage-green/10 border-sage-green/20 text-sage-green";
      case "blue": return "bg-silver/10 border-silver/20 text-[#EDEEF2]";
      default: return "bg-silver/15 border-silver/25 text-[#EDEEF2]";
    }
  };

  return (
    <div id="tv-slideshow-overlay" className="fixed inset-0 z-50 bg-[#18171C] flex flex-col justify-between overflow-hidden select-none font-sans text-platinum">
      
      {/* AMBIENT GLOW BACKDROP */}
      <div className="absolute inset-0 z-0 opacity-25 scale-110 pointer-events-none filter blur-3xl transition-all duration-1000">
        <img 
          src={currentPhoto.url} 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* TOP HEADER STATUS */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-[#000000]/80 to-transparent">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#263043]/30 border border-silver/10 text-platinum">
            <Tv className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getThemeBadgeColor()}`}>
                Live Feedcast Active
              </span>
            </div>
            <h1 className="font-serif font-medium text-base text-platinum tracking-tight mt-0.5">
              {eventName || "My Event Hub"}
            </h1>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center space-x-3">
          <button
            id="slideshow-prev-btn"
            onClick={handlePrev}
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-charcoal/40 border border-silver/10 hover:bg-[#263043]/60 text-stone hover:text-platinum transition-colors cursor-pointer"
            title="Previous Photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            id="slideshow-play-pause-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#263043] hover:bg-[#18171C] text-platinum border border-[#263043] transition-colors cursor-pointer"
            title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
          </button>

          <button
            id="slideshow-next-btn"
            onClick={handleNext}
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-charcoal/40 border border-silver/10 hover:bg-[#263043]/60 text-stone hover:text-platinum transition-colors cursor-pointer"
            title="Next Photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="h-6 w-px bg-silver/10 my-auto"></div>

          <button
            id="slideshow-exit-btn"
            onClick={onClose}
            className="flex items-center justify-center h-10 px-4 gap-1.5 rounded-xl bg-deep-rose/20 border border-deep-rose/30 text-rose-mist hover:text-platinum hover:bg-deep-rose hover:border-transparent transition-all cursor-pointer text-xs font-semibold"
            title="Exit Projector Cast"
          >
            <X className="h-4.5 w-4.5" />
            Exit Cast
          </button>
        </div>
      </header>

      {/* CENTRAL IMMERSIVE PHOTO CANVAS */}
      <main className="relative flex-1 z-10 flex items-center justify-center px-4 md:px-12 py-4">
        <div className="relative max-h-[75vh] max-w-[85vw] flex flex-col justify-center items-center shadow-2xl rounded-2xl overflow-hidden border border-silver/10 bg-[#18171C]/50">
          
          {/* Main Photo */}
          <img 
            src={currentPhoto.url} 
            alt="Venue Display" 
            className="max-h-[70vh] object-contain select-none animate-fade-in"
            style={{ animationDuration: "350ms" }}
            referrerPolicy="no-referrer"
          />

          {/* Reaction Bubbles layer */}
          <div className="absolute right-4 bottom-4 flex items-center space-x-1 p-2 bg-[#000000]/60 backdrop-blur-md rounded-full border border-silver/10 text-[11px] font-sans font-medium text-platinum">
            <div className="flex items-center space-x-1 px-1.5 text-rose-mist">
              <Heart className="h-3.5 w-3.5 fill-[#F4C9C8]/10" />
              <span>{currentPhoto.reactions.heart}</span>
            </div>
            <div className="flex items-center space-x-1 px-1.5 text-sage-green">
              <Flame className="h-3.5 w-3.5 fill-[#A7C3A8]/10" />
              <span>{currentPhoto.reactions.fire}</span>
            </div>
            <div className="flex items-center space-x-1 px-1.5 text-steel-gray">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{currentPhoto.reactions.sparkle}</span>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER METADATA AND PROGRESS CAROUSEL */}
      <footer className="relative z-10 bg-gradient-to-t from-[#000000]/90 to-transparent pt-12 pb-8 px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-silver/10 pb-6">
          
          {/* Slide metadata text */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-full bg-deep-slate border border-[#8C929D]/20 flex items-center justify-center font-serif font-semibold text-xs text-platinum">
                {currentPhoto.uploaderName.charAt(0).toUpperCase()}
              </div>
              <div className="font-sans">
                <span className="text-platinum text-sm font-semibold tracking-wide">
                  {currentPhoto.uploaderName}
                </span>
                <span className="text-stone text-[10px] uppercase font-mono ml-2">
                  Uploaded at {currentPhoto.timestamp}
                </span>
              </div>
            </div>

            {currentPhoto.caption ? (
              <p className="text-[#EDEEF2] text-lg md:text-xl font-serif font-medium leading-relaxed italic pr-12">
                "{currentPhoto.caption}"
              </p>
            ) : (
              <p className="text-stone text-sm italic font-serif">
                Captured another perspective...
              </p>
            )}
          </div>

          {/* Carousel tracker numbers */}
          <div className="text-right font-sans">
            <span className="text-stone font-mono text-[11px] uppercase tracking-wider block">Currently projecting</span>
            <span className="text-platinum font-mono text-xl font-semibold block mt-0.5">
              {currentIndex + 1} <span className="text-stone">/</span> {photos.length}
            </span>
          </div>
        </div>

        {/* TIMER PROGRESS LOADING BAR */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="h-[2px] w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#94A8F3] transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </footer>

    </div>
  );
}
