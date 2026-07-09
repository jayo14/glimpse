import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Glimpse — Find every photo you're in",
  description:
    "The event photo app that finds you. Scan a QR code, take a 10-second selfie, and every photo you're in lands in your own private gallery — while the night is still happening.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
