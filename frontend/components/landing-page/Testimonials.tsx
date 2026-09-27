"use client";

import React, { useState } from "react";
import Icon from "@/components/ui/Icon";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  stars: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Vance",
    role: "Lead Wedding Photographer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "Glimpse cut my post-event delivery time from 3 weeks to zero. Guests were thrilled receiving their portraits while still dancing on the floor!",
    stars: 5,
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Corporate Event Director",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    quote: "The Live TV wall kept all 1,200 attendees engaged throughout our keynote summit. Face search worked like pure magic.",
    stars: 5,
  },
  {
    id: 3,
    name: "David & Rachel",
    role: "Wedding Hosts",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    quote: "Every guest raved about finding their photos before the reception even ended. Truly the best decision we made for our wedding day.",
    stars: 5,
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Festival Organizer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "We processed over 25,000 photos for 3,500 guests with zero slowdown. Glimpse is completely changing event media.",
    stars: 5,
  },
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/60 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with Instrument Serif */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal text-zinc-950 tracking-tight leading-[1.05] mb-4">
            Real People. Real Results.
          </h2>
          <p className="font-sans text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Thousands trust Glimpse for their event photography and instant photo delivery.
          </p>
        </div>

        {/* 2x2 Grid of Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10 font-sans">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* User Info Row */}
                <div className="flex items-center gap-3.5 mb-5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-100"
                  />
                  <div>
                    <h3 className="text-base font-bold text-zinc-950 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">{item.role}</p>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-zinc-600 leading-relaxed italic mb-6 font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Star Rating with Material Symbols Rounded fill */}
              <div className="flex items-center gap-1 text-zinc-900 pt-2 border-t border-zinc-100">
                {[...Array(item.stars)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    className="text-base text-zinc-950 fill"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0))}
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-900 transition-all shadow-xs"
          >
            <Icon name="chevron_left" className="text-lg" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-900 transition-all shadow-xs"
          >
            <Icon name="chevron_right" className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
