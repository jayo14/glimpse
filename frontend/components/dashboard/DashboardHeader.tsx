"use client";

import React from "react";
import Link from "next/link";
import { Settings, LogOut, LayoutGrid, Sparkles, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface HeaderProps {
  role: "HOST" | "GUEST" | "PHOTOGRAPHER";
}

export default function DashboardHeader({ role }: HeaderProps) {
  const router = useRouter();
  const { user, loading } = useAuth({ requireAuth: true });

  const handleSignOut = async () => {
    try {
      await AuthService.logout();
      toast.success("Signed out.");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Failed to sign out.");
    }
  };

  return (
    <header className="w-full h-20 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50 flex items-center px-6">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between bg-white/5 px-6 h-12 rounded-full border border-white/5 shadow-2xl">
        
        <Link 
          href={role === "HOST" ? "/host" : "/guest"} 
          className="flex items-center gap-3 group cursor-pointer"
        >
          <span className="font-heading text-xl font-bold tracking-tighter italic">glimpse</span>
          <span className="text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-white/40">
            {role}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {role === "HOST" && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/event/create" 
                className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-all cursor-pointer shadow-xl"
              >
                <Sparkles size={10} /> Create
              </Link>
            </motion.div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center cursor-pointer transition-all shadow-xl"
              >
                {loading ? (
                  <Loader2 size={12} className="animate-spin text-white/20" />
                ) : user?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover grayscale" />
                ) : (
                  <div className="font-heading text-[10px] font-bold text-white/40 uppercase">
                    {(user?.full_name || "U").charAt(0)}
                  </div>
                )}
              </motion.div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-60 rounded-[32px] border border-white/10 bg-black/90 backdrop-blur-2xl text-white shadow-2xl p-2 font-body mt-4">
              <DropdownMenuLabel className="px-4 py-4 space-y-1">
                <p className="font-bold text-sm tracking-tight truncate uppercase tracking-[0.1em]">{user?.full_name || "Architect"}</p>
                <p className="text-[10px] text-white/30 tracking-[0.2em] font-bold uppercase truncate italic">{user?.email || "Session active"}</p>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator className="bg-white/5 mx-2" />
              
              <DropdownMenuItem className="flex items-center gap-3 rounded-full text-xs px-4 py-3 focus:bg-white/5 focus:text-white cursor-pointer transition-all mt-1">
                <LayoutGrid size={14} className="opacity-30" /> Hub Console
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-3 rounded-full text-xs px-4 py-3 focus:bg-white/5 focus:text-white cursor-pointer transition-all">
                <Settings size={14} className="opacity-30" /> Profile Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-white/5 mx-2 mt-1" />
              
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="flex items-center gap-3 rounded-full text-xs px-4 py-3 text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer transition-all mt-1 mb-1"
              >
                <LogOut size={14} className="opacity-50" /> Finalize Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}