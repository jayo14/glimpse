"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Download, ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

      toast.success("Event link copied");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Unable to share event");
    }
  };

  return (
    <div className="w-full flex flex-col items-center text-center animate-fade-in">
      {/* Decorative Event Header Snapshot Card */}
      <div className="w-full h-40 relative rounded-2xl overflow-hidden border border-border bg-card mb-6">
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Event Cover"
            fill
            className="object-cover opacity-60 filter grayscale-[20%]"
          />
        ) : (
          <div className="w-full h-full bg-deep-slate opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-left flex items-end justify-between">
          <div>
            <h2 className="text-xl font-serif text-foreground leading-tight">
              {title}
            </h2>

            {eventDate && (
              <p className="text-xs text-muted-foreground mt-1 tracking-wide">
                {eventDate}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Styled Minimalist QR Canvas Box */}
      <div className="p-5 bg-white rounded-2xl border border-border shadow-neo-blue mb-6 inline-flex flex-col items-center">
        <QRCodeSVG
          ref={qrRef}
          value={liveShareUrl}
          size={180}
          level="H"
          bgColor="#ffffff"
          fgColor="#040406"
          includeMargin={false}
        />
      </div>

      <h1 className="text-2xl font-serif tracking-tight leading-tight mb-2">
        Your Visual Stream is Live
      </h1>
      <p className="text-muted-foreground text-xs max-w-xs mb-8 leading-relaxed">
        Share this code with guests so they can instantly join your Glimpse
        event.{" "}
      </p>

      {/* Action Utilities Buttons Stack */}
      <div className="grid grid-cols-2 gap-3 w-full mb-4">
        <Button
          type="button"
          onClick={shareEventLink}
          className="h-12 border border-border rounded-full text-xs font-semibold uppercase tracking-wider bg-card/40 hover:bg-card inline-flex items-center justify-center gap-2 transition-all cursor-pointer text-foreground"
        >
          <Link size={14} /> Share Link
        </Button>
        <Button
          type="button"
          onClick={downloadQRCode}
          className="h-12 border border-border rounded-full text-xs font-semibold uppercase tracking-wider bg-card/40 hover:bg-card inline-flex items-center justify-center gap-2 transition-all cursor-pointer text-foreground"
        >
          <Download size={14} /> Download QR
        </Button>
      </div>

      <Button
        type="button"
        size="lg"
        onClick={onDone}
        className="rounded-full w-full h-12 bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center justify-center font-sans mt-2"
      >
        Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
