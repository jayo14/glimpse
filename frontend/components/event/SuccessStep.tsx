"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowRight, Link, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SuccessStepProps {
  title: string;
  eventDate?: string;
  description?: string;
  imagePreview: string | null;
  eventId: string;
  inviteToken: string;
  qrCodeUrl: string;
  onDone: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function SuccessStep({
  title,
  eventDate,
  description,
  imagePreview,
  eventId,
  inviteToken,
  qrCodeUrl,
  onDone,
}: SuccessStepProps) {
  const qrRef = useRef<SVGSVGElement>(null);

  const liveShareUrl =
    qrCodeUrl ||
    `${typeof window !== "undefined" ? window.location.origin : ""}/event/join/${eventId}?inviteToken=${inviteToken}`;

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new window.Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 512, 512);
        context.drawImage(image, 32, 32, 448, 448);

        const png = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = png;
        downloadLink.download = `${title.toLowerCase().replace(/\s+/g, "-")}-qr.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    image.src = blobURL;
  };

  const shareEventLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: description || `Join ${title} on Glimpse`,
          url: liveShareUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(liveShareUrl);
      toast.success("Link copied.");
    } catch (error) {
      toast.error("Share failed.");
    }
  };

  return (
    <motion.div 
      {...fadeInUp}
      className="w-full flex flex-col items-center text-center space-y-12"
    >
      <div className="w-full h-48 relative rounded-[40px] overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl group">
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Event Cover"
            fill
            className="object-cover grayscale group-hover:scale-105 transition-all duration-1000"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
             <Sparkles className="text-white/10 h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-8 right-8 text-left space-y-1">
           <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 block font-bold italic">Visual Stream Active</span>
           <h2 className="text-3xl font-heading text-white tracking-tighter leading-none italic">
             {title}
           </h2>
           {eventDate && (
             <p className="text-xs text-white/30 tracking-[0.2em] font-bold uppercase">
               {eventDate}
             </p>
           )}
        </div>
      </div>

      <div className="p-8 bg-white rounded-[48px] border border-white/10 shadow-2xl relative">
        <QRCodeSVG
          ref={qrRef}
          value={liveShareUrl}
          size={200}
          level="H"
          bgColor="#ffffff"
          fgColor="#000000"
          includeMargin={false}
        />
        <div className="absolute -inset-4 border border-white/5 rounded-[60px] pointer-events-none" />
      </div>

      <div className="space-y-4">
        <h3 className="text-4xl md:text-5xl font-heading text-white tracking-tighter leading-none italic">
          Stream is live.
        </h3>
        <p className="text-xl text-white/40 leading-relaxed font-light italic max-w-sm mx-auto">
          Share this access matrix with guests to start the collective capture.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareEventLink}
          className="h-16 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 hover:bg-white/10 flex items-center justify-center gap-3 transition-all cursor-pointer text-white shadow-xl"
        >
          <Link size={14} /> Share
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadQRCode}
          className="h-16 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-white/5 hover:bg-white/10 flex items-center justify-center gap-3 transition-all cursor-pointer text-white shadow-xl"
        >
          <Download size={14} /> Save QR
        </motion.button>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onDone}
        className="h-20 px-12 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] inline-flex items-center justify-center gap-3 transition-all hover:bg-white/90 shadow-2xl w-full"
      >
        Go to Dashboard <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
}
