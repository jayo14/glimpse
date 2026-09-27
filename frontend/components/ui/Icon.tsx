import React from "react";
import { cn } from "@/lib/utils";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  fill?: boolean;
}

export function Icon({ name, className, fill = false, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "material-symbols-rounded select-none leading-none inline-flex items-center justify-center shrink-0",
        fill && "fill",
        className
      )}
      {...props}
    >
      {name}
    </span>
  );
}

export default Icon;
