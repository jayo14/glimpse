"use client";

import React, { useState } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await api.post("/waitlist", { email });
      toast.success("You have been added to the waitlist!");
      setEmail("");
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.info("You are already on the waitlist.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 border-t border-silver/60 bg-white/50 dark:bg-night/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Join the exclusive waitlist</h2>
          <p className="text-ash dark:text-stone max-w-xl mx-auto mb-10 font-sans">
            Be the first to experience the future of event photography. We are onboarding hosts and photographers in limited batches.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 h-12 px-5 rounded-full border border-silver dark:border-deep-slate bg-white dark:bg-coal text-sm outline-none focus:border-night dark:focus:border-platinum transition-colors"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 px-8 rounded-full bg-night dark:bg-platinum text-white dark:text-night hover:opacity-90 transition-opacity font-sans"
            >
              {isLoading ? "Joining..." : "Get Early Access"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
