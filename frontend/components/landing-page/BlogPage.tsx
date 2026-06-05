/* eslint-disable @next/next/no-img-element */
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
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
    title:
      "The Death of the Disposable Camera: Why Digital Sharing Reclaimed the Frame",
    excerpt:
      "For years, chemical disposable cameras were a wedding staple. Today, development costs, blurry exposures, and blank film rolls are prompting a modern shift.",
    date: "May 25, 2026",
    readTime: "5 min read",
    category: "Event Trends",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
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
    excerpt:
      "Simply placing a QR code on a card isn't enough. Discover the visual psychology of high-conversion table placards and call-to-actions.",
    date: "April 18, 2026",
    readTime: "4 min read",
    category: "Signage Guide",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop",
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
    excerpt:
      "Passive attendees become active participants when given visual agency. Exploring the engagement loop of live event project streams.",
    date: "March 30, 2026",
    readTime: "7 min read",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
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

export default function BlogPage({ onBack }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans text-[#18171C]">
      {/* Blog Hero Banner */}
      <div className="bg-[#263043] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-left space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B2B3BA] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>

          <h1 className="font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none pt-2">
            The <span className="italic">Glimpse</span> Chronicle
          </h1>
          <p className="text-sm text-[#B2B3BA] max-w-lg font-light">
            Insights, event guides, and modern visual tips to help you
            crowdsource raw candid wedding and reception memories seamlessly.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {selectedPost ? (
          /* POST DETAIL SCREEN */
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 md:p-12 border border-[#E4E4E7]/60 shadow-md text-left"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#898B91] hover:text-[#18171C] transition-colors mb-8 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Chronicle
            </button>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-[#898B91] mb-4">
              <span className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5 text-[#263043]" />{" "}
                {selectedPost.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {selectedPost.readTime}
              </span>
              <span>•</span>
              <span>{selectedPost.date}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#18171C] tracking-tight leading-tight mb-8">
              {selectedPost.title}
            </h2>

            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-10 shadow-sm">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 text-[#18171C]/90 font-sans text-sm md:text-base leading-relaxed font-light max-w-3xl">
              {selectedPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="border-t border-[#E4E4E7]/60 mt-12 pt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#263043] flex items-center justify-center text-white font-serif text-sm">
                  g.
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#18171C]">
                    Glimpse Editorial Staff
                  </p>
                  <p className="text-[10px] text-[#898B91]">
                    Published curated event guide
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs font-mono font-semibold uppercase tracking-widest text-[#263043] hover:text-[#898B91] transition-colors"
              >
                Back to Archives
              </button>
            </div>
          </motion.article>
        ) : (
          /* ARCHIVE GRID SCREEN */
          <div className="space-y-10">
            {/* Search Filter Head */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E4E4E7]/60 pb-6">
              <div className="text-left">
                <h3 className="font-serif text-xl font-light text-[#263043]">
                  Featured publications
                </h3>
                <p className="text-xs text-[#898B91]">
                  Explore deep insights from our product design & real-world
                  client stories.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                aria-label="Search articles"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-[#E4E4E7] rounded-xl text-xs font-sans text-[#18171C] bg-white focus:outline-none focus:border-[#263043] max-w-xs w-full"
              />
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#E4E4E7]/60 p-8">
                <BookOpen className="h-8 w-8 text-[#898B91] mx-auto opacity-55 mb-3" />
                <p className="text-sm text-[#898B91] font-light">
                  No articles matched your search query. Please try searching
                  for another topic.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    layoutId={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E4E4E7]/60 hover:border-[#263043] hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer"
                  >
                    <div>
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#263043] text-white text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-[#898B91]">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h4 className="font-serif text-lg leading-snug group-hover:text-[#263043] transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <p className="text-xs text-[#898B91] font-sans font-light line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="border-t border-[#E4E4E7]/60 pt-4 flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-wider text-[#263043]">
                        <span>Read full study</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
