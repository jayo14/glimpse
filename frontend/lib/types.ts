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
    question: "Do I get all the photos after the event?",
    answer: "Yes. You get every upload in full quality, and you can download the whole event in one shot when the party is over."
  },
  {
    question: "Can guests see everyone else's photos?",
    answer: "They can, if you want them to. Leave the shared feed on for more energy, or turn it off and keep everything host-only."
  },
  {
    question: "How does the live screen part work?",
    answer: "Open the display on a laptop, tablet, or TV, and the newest photos appear almost instantly. Guests see their picture on the big screen before they even sit back down."
  },
  {
    question: "What if the venue Wi-Fi is bad?",
    answer: "Uploads are designed to recover cleanly when the connection comes back. Guests can keep moving, and you do not have to babysit the network."
  },
  {
    question: "Can I remove blurry or unwanted photos?",
    answer: "Yes. You can hide or delete anything that does not belong, so the gallery stays clean and on-brand."
  },
  {
    question: "Can I match the QR page to my event?",
    answer: "Absolutely. You can customize colors, headers, and the look of the upload page so it feels like part of the event, not a random tool."
  },
  {
    question: "Are there any upload limits?",
    answer: "The full plan is built for real parties, not tiny test cases. Guests can keep uploading without you counting every image."
  }
];
