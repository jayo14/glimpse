import { Metadata, Viewport } from "next";
import Landing from "@/components/landing/Landing";

export const metadata: Metadata = {
  title: "Glimpse — Find yourself in every event photo",
  description:
    "One selfie. Every photo you’re in, from every moment of the event, delivered in seconds.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function Home() {
  return <Landing />;
}
