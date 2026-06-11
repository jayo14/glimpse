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

interface HeaderProps {
  role: "HOST" | "GUEST" | "PHOTOGRAPHER";
}

export default function DashboardHeader({ role }: HeaderProps) {
  const router = useRouter();
  const { user, loading } = useAuth({ requireAuth: true });

  const handleSignOut = async () => {
    try {
      await AuthService.logout();
      toast.success("Signed out successfully.");
      router.push("/auth/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to terminate session securely.");
    }
  };

  return (
    <header className="w-full h-16 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-center px-4">
      {/* Constraints header area to match your minimalist step form forms width exactly */}
      <div className="w-full max-w-md flex items-center justify-between">
        
        {/* BRANDING LOGO */}
        <Link 
          href={role === "HOST" ? "/host" : "/guest"} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-4 h-4 fill-current text-foreground transition-transform group-hover:rotate-45 duration-300">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path d="M12 2l1.88 5.79h6.08l-4.92 3.58 1.88 5.79-4.92-3.58-4.92 3.58 1.88-5.79-4.92-3.58h6.08z"/>
            </svg>
          </div>
          <span className="font-serif text-md font-semibold tracking-wide lowercase">glimpse</span>
          <span className="text-[8px] font-mono tracking-widest uppercase px-1.5 py-0.5 bg-muted rounded-md text-muted-foreground opacity-60">
            {role}
          </span>
        </Link>

        {/* RIGHT UTILITIES PANEL */}
        <div className="flex items-center gap-3">
          {role === "HOST" && (
            <Link 
              href="/host-dashboard/create-event" 
              className="inline-flex items-center gap-1 h-8 px-3.5 rounded-full border border-border bg-card/40 text-[10px] uppercase tracking-wider font-semibold hover:bg-card transition-colors cursor-pointer"
            >
              <Sparkles size={10} /> Create
            </Link>
          )}

          {/* USER PROFILE CONTROL SELECTION */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="w-8 h-8 rounded-full border border-border bg-card overflow-hidden flex items-center justify-center cursor-pointer transition-transform active:scale-95">
                {loading ? (
                  <Loader2 size={12} className="animate-spin text-muted-foreground" />
                ) : user?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="font-serif text-xs font-bold text-muted-foreground uppercase">
                    {(user?.full_name || "U").charAt(0)}
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-52 rounded-xl border border-border bg-popover text-popover-foreground shadow-neo-blue p-1 font-sans">
              <DropdownMenuLabel className="px-2.5 py-2 text-xs">
                <p className="font-semibold text-foreground truncate">{user?.full_name || "User Profile"}</p>
                <p className="text-[10px] text-muted-foreground tracking-wide font-normal truncate mt-0.5">Workspace account</p>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator className="bg-border/40" />
              
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg text-xs px-2.5 py-2 focus:bg-accent focus:text-accent-foreground cursor-pointer">
                <LayoutGrid size={14} /> Hub Console
              </DropdownMenuItem>
              
              <DropdownMenuItem className="flex items-center gap-2 rounded-lg text-xs px-2.5 py-2 focus:bg-accent focus:text-accent-foreground cursor-pointer">
                <Settings size={14} /> Profile Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-border/40" />
              
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-lg text-xs px-2.5 py-2 text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer"
              >
                <LogOut size={14} /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  );
}