"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => {
    const formatted = current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return prefix + formatted + suffix;
  });

  const [text, setText] = useState(prefix + (0).toFixed(decimals) + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.on("change", (v) => setText(v));
  }, [display]);

  return <span ref={ref}>{text}</span>;
};

const Stats = () => {
  const stats = [
    { label: "Seconds to your first photo", value: 10, suffix: "" },
    { label: "Selfies to see them all", value: 1, suffix: "" },
    { label: "Apps to download", value: 0, suffix: "" },
    { label: "Guests finding themselves at once", value: 5000, suffix: "+" },
  ];

  return (
    <section className="py-16 px-6 lg:px-10 border-y border-[#1c1b19]/[.06] bg-white">
      <div className="shell flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {stats.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="text-center max-w-[12rem]"
            >
              <p className="font-fh text-4xl font-normal tracking-tight text-[#1c1b19]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[12px] text-[#57534e] mt-2 tracking-wide uppercase font-semibold leading-snug">
                {stat.label}
              </p>
            </motion.div>
            {idx < stats.length - 1 && (
              <div className="w-px h-10 bg-[#1c1b19]/[.1] hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Stats;
