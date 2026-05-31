/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Mail, User, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthPagesProps {
  initialMode?: "login" | "signup" | "forgot" | "reset";
  onBackToHome: () => void;
  onSuccessToast: (message: string) => void;
}

export default function AuthPages({ initialMode = "login", onBackToHome, onSuccessToast }: AuthPagesProps) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "reset">(initialMode);
  
  // Field states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  
  // Form submission simulated responses
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (mode === "login") {
      onSuccessToast(`Welcome back, ${email || "event host"}! Enjoy Glimpse spotlight.`);
      onBackToHome();
    } else if (mode === "signup") {
      onSuccessToast(`Account generated successfully for ${fullName || "host"}!`);
      onBackToHome();
    } else if (mode === "forgot") {
      onSuccessToast(`Password recovery link beamed to ${email || "your inbox"}.`);
    } else if (mode === "reset") {
      onSuccessToast("Credential lock reset successfully! Please proceed to login.");
      setMode("login");
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#18171C] flex flex-col justify-between">
      
      {/* Header Bar */}
      <header className="px-6 py-6 border-b border-[#E4E4E7]/60 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#898B91] hover:text-[#18171C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Exit Portal
          </button>

          <div className="flex items-center space-x-2 cursor-pointer font-serif" onClick={onBackToHome}>
            <div className="h-2 w-2 rounded-full bg-[#263043]"></div>
            <span className="font-medium text-md tracking-tight">glimpse.</span>
          </div>
        </div>
      </header>

      {/* Auth visual layout split screen */}
      <main className="flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[calc(100vh-160px)] px-0 sm:px-6 py-8">
        
        {/* Left column: Visual context card */}
        <div className="hidden lg:flex lg:col-span-5 bg-[#263043] rounded-3xl p-10 flex-col justify-between text-white relative overflow-hidden self-center h-[560px]">
          
          <div className="space-y-4 text-left z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B2B3BA] block">// Secure Access Console</span>
            <h2 className="font-serif text-3xl font-light leading-snug">
              Streamline the crowd photo stream with <span className="italic font-normal text-[#F4C9C8]">Spotlight Control</span>.
            </h2>
            <p className="text-xs text-[#B2B3BA] font-light leading-relaxed max-w-sm">
              Your centralized dashboard allows you to moderate live photos instantly, generate high-resolution print placards, customize headers, and download 1-click full-archive event ZIP bundles.
            </p>
          </div>

          <div className="space-y-6 z-10 text-left">
            <div className="flex items-start gap-3.5 text-xs text-[#EDEEF2] font-light">
              <ShieldCheck className="h-5 w-5 text-[#A7C3A8] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold uppercase tracking-wider text-[9px] text-white">Full Privacy Compliance</p>
                <p className="text-[#B2B3BA] mt-0.5 leading-relaxed">No tracking, no guest accounts, and encrypted high-res storage vaults.</p>
              </div>
            </div>
            
            <p className="text-[9px] text-[#B2B3BA] font-mono uppercase tracking-wider pt-4 border-t border-white/10 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Secure Auth Node active • Port 3000 Ingress verified
            </p>
          </div>

          {/* Background decorative glowing patterns representing photo streams */}
          <div className="absolute -right-1/4 -bottom-1/4 h-80 w-80 rounded-full bg-white/[0.03] blur-3xl" />
          <div className="absolute -left-1/4 -top-1/4 h-80 w-80 rounded-full bg-black/[0.12] blur-3xl" />
        </div>

        {/* Right column: Interactive form center panel */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-10 self-center">
          <div className="w-full max-w-md bg-white border border-[#E4E4E7]/60 shadow-lg p-8 sm:p-10 rounded-2xl md:rounded-3xl relative">
            
            {/* RESET SENT MEMENTO VIEW */}
            {mode === "forgot" && isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 text-center py-6"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-[#18171C]">Check your inbox</h3>
                  <p className="text-xs text-[#898B91] leading-relaxed max-w-sm mx-auto font-light">
                    We have beamed a secure, single-use password restoration link to <span className="font-semibold text-[#18171C]">{email}</span>. Click the link to define a new password.
                  </p>
                </div>
                <div className="border-t border-[#E4E4E7]/40 pt-6">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMode("login");
                    }}
                    className="text-xs font-mono font-semibold uppercase tracking-widest text-[#263043] hover:text-[#898B91] transition-colors"
                  >
                    Go back to login
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ACTIVE FORM INPUT STACK */
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl tracking-tight text-[#18171C] font-light">
                    {mode === "login" && "Welcome back"}
                    {mode === "signup" && "Launch host account"}
                    {mode === "forgot" && "Recover credentials"}
                    {mode === "reset" && "Define new password"}
                  </h3>
                  <p className="text-xs text-[#898B91] font-light">
                    {mode === "login" && "Enter your password to control your streams."}
                    {mode === "signup" && "Gather unlimited user files at your next gathering."}
                    {mode === "forgot" && "We will transmit safe restoration links to your inbox."}
                    {mode === "reset" && "Secure your profile with deep character limits."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* FULL NAME (visible only in SIGNUP mode) */}
                  {mode === "signup" && (
                    <div className="space-y-1.5 focus-within:text-[#263043] transition-colors">
                      <Label htmlFor="fullname" className="text-[10px] font-semibold uppercase tracking-wider text-[#898B91]">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B2B3BA]" />
                        <Input
                          id="fullname"
                          type="text"
                          required
                          placeholder="Lord Byron"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10 h-11 border-[#E4E4E7]/70 rounded-xl focus-visible:ring-[#263043]/30 focus-visible:border-[#263043]"
                        />
                      </div>
                    </div>
                  )}

                  {/* EMAIL (visible in LOGIN, SIGNUP, FORGOT mode) */}
                  {mode !== "reset" && (
                    <div className="space-y-1.5 focus-within:text-[#263043] transition-colors">
                      <Label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-wider text-[#898B91]">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B2B3BA]" />
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="curator@glimpse.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-11 border-[#E4E4E7]/70 rounded-xl focus-visible:ring-[#263043]/30 focus-visible:border-[#263043]"
                        />
                      </div>
                    </div>
                  )}

                  {/* PASSWORD (visible in LOGIN, SIGNUP, RESET mode) */}
                  {mode !== "forgot" && (
                    <div className="space-y-1.5 focus-within:text-[#263043] transition-colors">
                      <div className="flex justify-between items-baseline">
                        <Label htmlFor="password" className="text-[10px] font-semibold uppercase tracking-wider text-[#898B91]">
                          {mode === "reset" ? "New Password" : "Password"}
                        </Label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => setMode("forgot")}
                            className="text-[9.5px] font-semibold text-[#263043] hover:text-[#898B91] uppercase tracking-wide cursor-pointer transition-colors"
                          >
                            Forgot?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B2B3BA]" />
                        <Input
                          id="password"
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 h-11 border-[#E4E4E7]/70 rounded-xl focus-visible:ring-[#263043]/30 focus-visible:border-[#263043]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Terms checkbox for signup */}
                  {mode === "signup" && (
                    <div className="flex items-center space-x-2 pt-2 select-none">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="h-3.5 w-3.5 text-[#263043] focus:ring-[#263043] border-[#E4E4E7] rounded cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-[10px] text-[#898B91] font-light leading-none cursor-pointer">
                        I authorize and agree to the <span className="underline hover:text-[#263043]">Event Privacy standard terms</span>.
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full mt-4 h-11 bg-[#263043] hover:bg-black text-white rounded-xl text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all shadow-md"
                  >
                    {mode === "login" && "Login to Dashboard"}
                    {mode === "signup" && "Create host portal"}
                    {mode === "forgot" && "Send recovery email"}
                    {mode === "reset" && "Update password lock"}
                  </Button>

                </form>

                {/* Switch form mode controls */}
                <div className="border-t border-[#E4E4E7]/60 pt-6 text-center text-xs font-sans font-light text-[#898B91] space-y-2">
                  {mode === "login" && (
                    <p>
                      Don't have an event account?{" "}
                      <button
                        onClick={() => setMode("signup")}
                        className="font-semibold text-[#263043] hover:underline cursor-pointer"
                      >
                        Sign up here
                      </button>
                    </p>
                  )}
                  {mode === "signup" && (
                    <p>
                      Already registered a dashboard?{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="font-semibold text-[#263043] hover:underline cursor-pointer"
                      >
                        Log in instead
                      </button>
                    </p>
                  )}
                  {mode === "forgot" && (
                    <p>
                      Remembered your credentials?{" "}
                      <button
                        onClick={() => setMode("login")}
                        className="font-semibold text-[#263043] hover:underline cursor-pointer"
                      >
                        Return to login
                      </button>
                    </p>
                  )}

                  {/* Let the user try resetting password directly to satisfy testing */}
                  {mode === "login" && (
                    <button
                      onClick={() => setMode("reset")}
                      className="text-[9.5px] uppercase font-mono tracking-wider block mx-auto text-[#898B91] hover:text-[#263043]"
                    >
                      Instant Test: Direct Reset Credentials
                    </button>
                  )}
                </div>

              </motion.div>
            )}

          </div>
        </div>

      </main>

      {/* Footer info lock */}
      <footer className="py-6 border-t border-[#E4E4E7]/60 bg-white text-center text-[10px] text-[#898B91] font-mono tracking-wider">
        <p>© glimpse. • secure dashboard transport protection active</p>
      </footer>

    </div>
  );
}
