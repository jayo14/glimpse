"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
    { label: "Events Processed", value: 10000, suffix: "+" },
    { label: "Photos Matched", value: 2400000, suffix: "+" },
    { label: "Face Accuracy", value: 99.2, suffix: "%", decimals: 1 },
    { label: "Match Time", value: 3, prefix: "<", suffix: "s" },
  ];

  return (
    <section className="py-16 px-6 lg:px-10 border-y border-black/5 bg-white">
      <div className="max-w-[82rem] mx-auto flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {stats.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="text-center"
            >
              <p className="font-fh text-3xl font-normal tracking-tight">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-[12px] text-[#a09890] mt-1 tracking-wide uppercase font-medium">
                {stat.label}
              </p>
            </motion.div>
            {idx < stats.length - 1 && (
              <div className="w-px h-8 bg-black/8 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Stats;
