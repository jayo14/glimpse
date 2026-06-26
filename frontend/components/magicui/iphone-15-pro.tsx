import { cn } from "@/lib/utils";

interface Iphone15ProProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  src?: string;
  videoSrc?: string;
  children?: React.ReactNode;
}

export function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  children,
  className,
  ...props
}: Iphone15ProProps) {
  return (
    <div
      className={cn("relative inline-block overflow-hidden", className)}
      style={{
        width: width,
        height: height,
      }}
      {...props}
    >
      {/* iPhone 15 Pro Frame SVG */}
      <svg
        viewBox="0 0 433 882"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none z-50 w-full h-full"
      >
        <path
          d="M432.5 131.5C432.5 61.3533 371.147 0.5 301 0.5H132C61.8533 0.5 0.5 61.8533 0.5 132V750C0.5 820.147 61.8533 881.5 132 881.5H301C371.147 881.5 432.5 820.147 432.5 750V131.5Z"
          fill="#1F1F21"
          stroke="#404040"
        />
        <rect
          x="12"
          y="12"
          width="409"
          height="858"
          rx="58"
          fill="black"
        />
        {/* Dynamic Island */}
        <rect
          x="151.5"
          y="32"
          width="130"
          height="36"
          rx="18"
          fill="black"
        />
      </svg>

      {/* Screen Content */}
      <div
        className="absolute inset-0 z-10"
        style={{
          padding: "16px",
          borderRadius: "66px",
        }}
      >
        <div className="w-full h-full relative overflow-hidden rounded-[53px] bg-black">
          {src && (
            <img
              src={src}
              alt="iPhone Screen Content"
              className="w-full h-full object-cover"
            />
          )}
          {videoSrc && (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
