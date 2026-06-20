"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, Tag, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "death-of-disposable",
    title: "The Death of the Disposable Camera: Why Digital Sharing Reclaimed the Frame",
    excerpt: "For years, chemical disposable cameras were a wedding staple. Today, development costs, blurry exposures, and blank film rolls are prompting a modern shift.",
    date: "May 25, 2026",
    readTime: "5 min read",
    category: "Event Trends",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    content: [
      "We all know the nostalgic charm of a green plastic Fuji disposable camera sitting alongside a floral centerpiece. It promises raw, uncurated perspective—the late-night dance circles, the table self-portraits, the funny toast reactions.",
      "But behind the charm lies a frustrating mathematical reality. In 2026, purchasing a single-use analog camera costs around $18. Developing that film costs an average of $22 more. That is $40 per table for exactly 27 exposures, of which commonly 15 are pitch black, blurry, or double-exposed. A typical wedding with 150 guests needs at least 15 cameras—totaling a hefty $600 for just a handful of usable, grainy memories.",
      "Glimpse has pioneered a complete rethinking of table crowdsourcing. By using the high-definition cameras already in your guests' pockets, we remove development costs entirely. No app downloads are needed; a native browser scanner instantly beams high-definition, color-accurate guest photos directly to your digital vault and any slideshow screens in real time.",
      "The result? Over 400% more photos collected, saved in original device fidelity, with $0 spent on chemical development. Nostalgia is wonderful, but capturing clear, abundant smiles is even better.",
    ],
  },
  {
    id: "designing-table-placards",
    title: "Table Signage Design: How to Increase Guest Uploads by 320%",
    excerpt: "Simply placing a QR code on a card isn't enough. Discover the visual psychology of high-conversion table placards and call-to-actions.",
    date: "April 18, 2026",
    readTime: "4 min read",
    category: "Signage Guide",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop",
    content: [
      "Placing a QR code on a wedding or gala program is a good start, but design determines whether guests actually take action. Our analysis of over 10,000 events reveals a stark difference in camera engagement based purely on card design.",
      "The most critical factor is the 'Zero-Step' prompt. Standard QR cards often say: 'Scan to share photos.' This is vague and feels like work. High-conversion placards use inviting, active copy like: 'Be the photographer. Scan to beam your dancefloor snaps to our live screens.'",
      "Other design tips include avoiding dark contrast-less QR placement, ensuring placards are placed perpendicular to seat sightlines rather than flat on tables, and providing real-time motivation. When guests see their friends' photos popping onto the projector, upload rates double in minutes.",
      "Glimpse Pro offers pre-made, high-resolution SVG table templates that follow these exact psychological principles, ensuring an average of 12 uploads per attendee.",
    ],
  },
  {
    id: "real-time-engagement",
    title: "How Live TV Cascades Convert Guests into Co-Creators",
    excerpt: "Passive attendees become active participants when given visual agency. Exploring the engagement loop of live event project streams.",
    date: "March 30, 2026",
    readTime: "7 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    content: [
      "Events are built on human connection. Yet, traditional reception timelines often put guests in a passive spectator role—reading cards, watching speaker slides, or sitting through set songs.",
      "The Glimpse Live TV Cast completely upends the guest dynamic. By opening a simple URL on any Smart TV or venue projector, hosts display a real-time cascading slideshow of photos uploaded by the audience. As guests snap photos of a champagne toast or an old friendship, their captures float onto the screen with beautiful, elegant transitions in seconds.",
      "This creates a direct, immediate feedback mechanism. Guests realize that they are helping paint the visual record of the event. They wander between tables, looking for interesting details, laughing over funny poses, and capturing moments the hired photographer simply cannot reach.",
      "It is more than a slideshow—it is interactive entertainment that unifies everyone in the room.",
    ],
  },
];

interface BlogPageProps {
  onBack: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function BlogPage({ onBack }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-black min-h-screen font-body text-white antialiased">

      <header className="px-6 h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/5 px-8 h-16 rounded-full shadow-2xl"
        >
          <button
            onClick={selectedPost ? () => setSelectedPost(null) : onBack}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all cursor-pointer font-bold"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> {selectedPost ? "Index" : "Exit"}
          </button>

          <div className="flex items-center gap-2 cursor-pointer font-heading" onClick={onBack}>
            <span className="font-bold text-xl tracking-tighter italic">glimpse</span>
          </div>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-32">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.article
              key="post"
              {...fadeInUp}
              className="space-y-16"
            >
              <div className="space-y-12">
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                  <span className="flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    {selectedPost.category}
                  </span>
                  <span className="h-px w-12 bg-white/10" />
                  <span>{selectedPost.readTime}</span>
                </div>

                <h2 className="font-heading italic text-6xl md:text-8xl text-white tracking-tighter leading-[0.8]">
                  {selectedPost.title}
                </h2>
              </div>

              <div className="aspect-[21/9] w-full bg-white/[0.02] border border-white/5 overflow-hidden rounded-[48px] shadow-2xl">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-60"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                 <div className="lg:col-span-8 space-y-12 text-white/60 font-light text-2xl leading-relaxed italic">
                    {selectedPost.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                 </div>
                 <div className="lg:col-span-4 space-y-16">
                    <div className="p-10 bg-white/[0.02] border border-white/5 space-y-8 rounded-[40px] shadow-xl">
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">Editorial</span>
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-white text-black flex items-center justify-center font-heading font-bold text-lg rounded-2xl">g.</div>
                          <div className="font-body space-y-0.5">
                             <p className="text-base font-bold text-white">Glimpse Staff</p>
                             <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold italic">Strategy & Design</p>
                          </div>
                       </div>
                    </div>
                    <div className="space-y-6 pl-2">
                       <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block font-bold">Release Date</span>
                       <p className="text-white text-lg italic tracking-tight">{selectedPost.date}</p>
                    </div>
                 </div>
              </div>
            </motion.article>
          ) : (
            <motion.div
              key="index"
              {...fadeInUp}
              className="space-y-32"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-16">
                <div className="space-y-8">
                  <h1 className="font-heading italic text-7xl md:text-9xl text-white tracking-tighter leading-none">
                    Journal.
                  </h1>
                  <p className="text-2xl text-white/30 font-light max-w-xl italic">
                    Curated studies for the next generation of event architects.
                  </p>
                </div>

                <div className="relative group w-full md:max-w-xs">
                  <input
                    type="text"
                    placeholder="Search archives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 px-8 rounded-full border border-white/10 bg-white/[0.02] text-sm text-white font-body outline-none focus:border-white transition-all placeholder:text-white/20 italic"
                  />
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-48 border border-dashed border-white/10 rounded-[60px] italic text-white/10 text-2xl font-light">
                  No entries found for this search.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredPosts.map((post) => (
                    <motion.article
                      layoutId={post.id}
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group space-y-8 cursor-pointer"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-white/[0.02] border border-white/5 rounded-[48px] shadow-2xl relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 transition-all duration-1000 group-hover:opacity-80"
                        />
                        <div className="absolute top-8 left-8">
                           <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">
                              {post.category}
                           </span>
                        </div>
                      </div>

                      <div className="space-y-6 px-4">
                        <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">
                          <span>{post.date}</span>
                          <span className="h-px w-6 bg-white/5" />
                          <span>{post.readTime}</span>
                        </div>

                        <h4 className="font-heading text-3xl md:text-4xl text-white group-hover:italic transition-all duration-300 leading-[0.9] tracking-tight">
                          {post.title}
                        </h4>

                        <p className="text-white/40 font-light text-base leading-relaxed line-clamp-3 italic">
                          {post.excerpt}
                        </p>

                        <div className="pt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white transition-all font-bold group-hover:translate-x-2">
                          <span>Read Study</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
