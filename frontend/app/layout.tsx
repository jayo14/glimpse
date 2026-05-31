import React from "react";
import "@fontsource-variable/geist";
import "../src/index.css";

export const metadata = {
  title: "Glimpse - Event Visual Accumulator",
  description: "Seamless guest-sourced event visual accumulator platform. Raw joy, streamed natively.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[#F5F5F5] text-[#18171C]">
        {children}
      </body>
    </html>
  );
}
