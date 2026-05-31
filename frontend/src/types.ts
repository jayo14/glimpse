/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  uploaderName: string;
  timestamp: string;
  reactions: {
    heart: number;
    fire: number;
    sparkle: number;
    thumbsup: number;
  };
  hasReacted?: {
    heart?: boolean;
    fire?: boolean;
    sparkle?: boolean;
    thumbsup?: boolean;
  };
}

export interface EventTheme {
  id: string;
  label: string;
  icon: string;
  primaryColor: string; // Tailwind color class e.g., 'indigo'
  accentColor: string; // Tailwind color class e.g., 'pink'
  gradientFrom: string;
  gradientTo: string;
  tagline: string;
  samplePhotos: Photo[];
}

export const PRELOADED_THEMES: EventTheme[] = [
  {
    id: "wedding",
    label: "Elegant Wedding",
    icon: "Heart",
    primaryColor: "rose",
    accentColor: "amber",
    gradientFrom: "from-rose-500/20",
    gradientTo: "to-amber-500/10",
    tagline: "Love in full frame, gathered from every table.",
    samplePhotos: [
      {
        id: "w1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        caption: "The beautiful ceremony entrance! Simply breathless.",
        uploaderName: "Sarah (Maid of Honor)",
        timestamp: "3:45 PM",
        reactions: { heart: 28, fire: 4, sparkle: 15, thumbsup: 12 }
      },
      {
        id: "w2",
        url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80",
        caption: "A toast to the lifetime of love and laughter!",
        uploaderName: "Mr. Henderson",
        timestamp: "6:12 PM",
        reactions: { heart: 14, fire: 2, sparkle: 8, thumbsup: 19 }
      },
      {
        id: "w3",
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
        caption: "Dance floor is absolutely electric tonight 💃✨",
        uploaderName: "Groom's Cousin Mike",
        timestamp: "9:30 PM",
        reactions: { heart: 9, fire: 24, sparkle: 18, thumbsup: 8 }
      },
      {
        id: "w4",
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
        caption: "Sneaking away for sunset shots 🌅 Perfect pair.",
        uploaderName: "Jessica P.",
        timestamp: "7:40 PM",
        reactions: { heart: 35, fire: 5, sparkle: 21, thumbsup: 11 }
      }
    ]
  },
  {
    id: "conference",
    label: "Tech Conference",
    icon: "Cpu",
    primaryColor: "blue",
    accentColor: "cyan",
    gradientFrom: "from-blue-600/20",
    gradientTo: "to-cyan-500/10",
    tagline: "Connecting builders, tech insights, and backstage secrets.",
    samplePhotos: [
      {
        id: "c1",
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
        caption: "Full house for the Opening Keynote on Generative AI!",
        uploaderName: "David @ TechBuild",
        timestamp: "9:05 AM",
        reactions: { heart: 3, fire: 18, sparkle: 12, thumbsup: 32 }
      },
      {
        id: "c2",
        url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        caption: "Backstage speaker prep and warm coffee. Let's go!",
        uploaderName: "Elena (Stage Manager)",
        timestamp: "8:30 AM",
        reactions: { heart: 8, fire: 5, sparkle: 9, thumbsup: 15 }
      },
      {
        id: "c3",
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
        caption: "Met some awesome developers during the hands-on lab",
        uploaderName: "Marcus_Dev",
        timestamp: "1:15 PM",
        reactions: { heart: 5, fire: 12, sparkle: 14, thumbsup: 22 }
      },
      {
        id: "c4",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        caption: "Bento box lunch and hackathon ideas hatching 🚀",
        uploaderName: "Alex Zhao",
        timestamp: "12:35 PM",
        reactions: { heart: 1, fire: 8, sparkle: 5, thumbsup: 41 }
      }
    ]
  },
  {
    id: "festival",
    label: "Music Festival",
    icon: "Music",
    primaryColor: "purple",
    accentColor: "fuchsia",
    gradientFrom: "from-purple-600/20",
    gradientTo: "to-fuchsia-500/10",
    tagline: "Dust, lasers, and shared visual frequencies.",
    samplePhotos: [
      {
        id: "f1",
        url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
        caption: "Main stage laser show is absolutely ridiculous right now!",
        uploaderName: "RaveSparks",
        timestamp: "11:12 PM",
        reactions: { heart: 15, fire: 42, sparkle: 27, thumbsup: 9 }
      },
      {
        id: "f2",
        url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
        caption: "Look at this crowd! Energy is infinite ⚡🔥",
        uploaderName: "FestFanatic",
        timestamp: "9:50 PM",
        reactions: { heart: 11, fire: 35, sparkle: 16, thumbsup: 13 }
      },
      {
        id: "f3",
        url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
        caption: "Caught the guitar solo of the decade up close 🎸🎸",
        uploaderName: "Chloe Bloom",
        timestamp: "8:15 PM",
        reactions: { heart: 24, fire: 50, sparkle: 35, thumbsup: 7 }
      },
      {
        id: "f4",
        url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
        caption: "Sunset setting over the camp grounds. Pure bliss.",
        uploaderName: "NomadSam",
        timestamp: "7:02 PM",
        reactions: { heart: 19, fire: 4, sparkle: 15, thumbsup: 18 }
      }
    ]
  },
  {
    id: "birthday",
    label: "30th Birthday",
    icon: "Cake",
    primaryColor: "emerald",
    accentColor: "teal",
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-teal-500/10",
    tagline: "Milestone laughter, surprise moments, and warm memories.",
    samplePhotos: [
      {
        id: "b1",
        url: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80",
        caption: "The legendary group family dinner group picture!",
        uploaderName: "Aunt Sophia",
        timestamp: "7:15 PM",
        reactions: { heart: 21, fire: 1, sparkle: 6, thumbsup: 16 }
      },
      {
        id: "b2",
        url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
        caption: "Champagne pops exactly at midnight! 🥂🎉",
        uploaderName: "Bestie Clara",
        timestamp: "12:01 AM",
        reactions: { heart: 18, fire: 19, sparkle: 21, thumbsup: 11 }
      },
      {
        id: "b3",
        url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        caption: "Make a wish! Blow out those 30 sparkler candles! 🎂",
        uploaderName: "Bro Leo",
        timestamp: "9:45 PM",
        reactions: { heart: 25, fire: 13, sparkle: 30, thumbsup: 10 }
      }
    ]
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Do guests need to download an app or log in?",
    answer: "Absolutely not. This is Glimpse's core superpower. Guests simply scan your event's unique QR code or click your link to instantly open a beautifully branded web page on their phone's native browser. They select their photos, write a quick name or caption, and hit publish."
  },
  {
    question: "How do I download all the pictures after the event?",
    answer: "As the host, you have full dashboard controls. You can instantly download a single compressed ZIP file containing all photos uploaded by your guests in high quality, or export them directly to your Google Drive or Dropbox."
  },
  {
    question: "Can guests see each other's uploaded photos?",
    answer: "Yes! By default, Glimpse creates a beautiful shared feed view where guests can view, heart, or download photos taken by other friends. If you prefer high privacy, you can switch your event settings to 'Host Only', which lets guests upload directly but hides the public feed."
  },
  {
    question: "How does the Live Slideshow mode work?",
    answer: "Glimpse provides a 'Live TV Cast' view. Open this URL on any laptop, tablet, or web-connected smart TV and project it onto a wall at your venue. As guests upload photos, they immediately pop up with lovely transitions, turning your crowd into a live-updating interactive entertainment wall."
  },
  {
    question: "How do we handle poor internet signals or remote venues?",
    answer: "Our web portal is fully robust. If a guest loses cell signal at your venue, our offline caching system queues their photos in memory. The moment they walk near high-speed Wi-Fi or regain a solid cellular connection, Glimpse automatically beams their queued photos safely in the background."
  },
  {
    question: "Is there moderation to delete unwanted or inappropriate photos?",
    answer: "Yes, you have absolute control. Your host command panel allows you to view uploaded photos in real time. If a guest uploads something blurry, off-topic, or inappropriate, you can permanently delete or hide it with a single tap so it disappears from the stream and slides instantly."
  },
  {
    question: "Can I customize the QR placards and look of Glimpse?",
    answer: "Completely. Spotlight Pro lets you customize event headers, choosing colors, typography, and personalized cover images. You can print high-resolution SVG or PDF table cards that perfectly coordinate with your existing signage and tablescapes."
  },
  {
    question: "Are there any file upload limits or attendee caps?",
    answer: "Not under our Pro plan. You can have 10 or 10,000 attendees upload an unlimited number of high-resolution photos. We never charge by the image, nor do we throttle guest speed during peak event moments."
  }
];
