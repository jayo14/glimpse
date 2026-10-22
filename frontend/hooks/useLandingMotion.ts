"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hits = [2, 9, 13, 20, 26];

export function useLandingMotion(rootRef: { current: HTMLDivElement | null }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;

    root.classList.add("g");
    html.style.scrollBehavior = "auto";
    ScrollTrigger.config({ ignoreMobileResize: true });

    let matchTimer: any;
    let stopped = false;
    let glowRaf: number | null = null;
    let glowObs: IntersectionObserver | null = null;

    /* --- A. Core behaviours --- */
    const tiles = [...root.querySelectorAll<HTMLElement>(".t")];
    const cnt = root.querySelector<HTMLBRElement>("#cnt");
    const freeze = () => {
      if (stopped) return;
      stopped = true;
      hits.forEach((i) => tiles[i].classList.add("hit2"));
      if (cnt) cnt.textContent = "5";
    };
    function run() {
      if (stopped) return;
      tiles.forEach((t) => t.classList.remove("hit"));
      if (cnt) cnt.textContent = "0";
      hits.forEach((h, k) => {
        setTimeout(() => {
          if (stopped) return;
          tiles[h].classList.add("hit");
          if (cnt) cnt.textContent = String(k + 1);
        }, 900 + k * 700);
      });
      matchTimer = setTimeout(run, 900 + hits.length * 700 + 3500);
    }
    run();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) x.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll<HTMLElement>(".rv").forEach((el) => io.observe(el));

    let ctx: ReturnType<typeof gsap.context> | null = null;

    if (!reduced) {
      ctx = gsap.context(() => {
        const sh = root.querySelector<HTMLElement>(".sheet");
        if (!sh) return;
        sh.classList.add("stage2");
        root.querySelectorAll<HTMLElement>(".t").forEach((t) => t.classList.add("fly"));

        const hitT = hits
          .map((i) => tiles[i])
          .filter((t) => !!t && t.offsetParent);
        const N = hitT.length;

        const gal = root.querySelector<HTMLElement>("#gal2")!;
        const als = gal ? [...gal.children] : [];

        const cntEl = root.querySelector<HTMLElement>("#cnt");

        const Dw = () => Math.min(180, innerWidth * 0.34);
        const rel = (t: HTMLElement) => {
          const a = t.getBoundingClientRect();
          const b = sh.getBoundingClientRect();
          const X = gsap.getProperty(t, "x") as number;
          const Y = gsap.getProperty(t, "y") as number;
          return {
            x: a.left - b.left + a.width / 2 - X,
            y: a.top - b.top + a.height / 2 - Y,
            w: a.width / (gsap.getProperty(t, "scaleX") as number),
          };
        };
        const fan = (j: number) => ({
          x: ((j - (N - 1) / 2) * Dw() * 0.19),
          y: Math.abs(j - (N - 1) / 2) * 8,
          r: (j - (N - 1) / 2) * 8,
        });
        const slot = () => {
          const m = innerWidth <= 700;
          const c = m ? 2 : 3;
          const g = m ? 16 : 28;
          const W = Math.min(1040, innerWidth * 0.92);
          const cw = (W - g * (c - 1)) / c;
          return {
            x: sh.clientWidth / 2 - W / 2 + cw / 2,
            y: innerHeight * 0.24 + cw / 2 + cw * 0.02,
            cw,
          };
        };
        const slotJ = (j: number) => {
          const s = slot();
          const k = j - (N - 1) / 2;
          return {
            x: s.x + k * 0.14 * 0.6 * s.cw * (5 / N > 1 ? 1 : 1),
            y: s.y,
            sc: 0.6 * s.cw,
          };
        };

        gsap.set(hitT, { zIndex: (j) => 20 + j });
        gsap.set(".fx", { yPercent: -50, filter: "blur(24px)" });
        gsap.set(als, { opacity: 0, y: 60 });
        gsap.set(".gh,.atitle,.atxt", { opacity: 0, y: 20 });

        let frozen = false;
        const freezeStory = () => {
          if (frozen) return;
          frozen = true;
          hits.forEach((i) => tiles[i].classList.add("hit2"));
          if (cntEl) cntEl.textContent = "5";
        };

        const intro = gsap.timeline({
          defaults: { ease: "expo.out", duration: 1.4 },
        });
        intro
          .from(".hero h1", { yPercent: 30, opacity: 0 })
          .from(
            ".hero p,.cta",
            { y: 30, opacity: 0, stagger: 0.12, duration: 1 },
            "-=1"
          )
          .from(
            tiles,
            {
              y: 60,
              opacity: 0,
              scale: 0.85,
              stagger: { each: 0.02, from: "center", grid: [4, 8] },
              duration: 1,
              clearProps: "transform,opacity",
            },
            "-=.9"
          )
          .from(".pillm", { opacity: 0, duration: 0.8 }, "-=.4");

        const rest = tiles.filter((t) => !hitT.includes(t));
        const L = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: sh,
            start: "top top",
            end: () => "+=" + innerHeight * 8,
            pin: true,
            anticipatePin: 1,
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (s: any) => s.progress > 0 && freezeStory(),
          },
        });
        L.to(".tiles", { backgroundColor: "rgba(10,10,10,0)", duration: 1 })
          .to(
            rest,
            {
              opacity: 0,
              scale: 0.8,
              duration: 1,
              stagger: { each: 0.02, from: "random" },
            },
            "<"
          )
          .to(".pillm", { opacity: 0, duration: 0.6 }, "<.2")
          .to(
            hitT,
            {
              x: (j: number, t: HTMLElement) =>
                sh.clientWidth / 2 - rel(t).x + fan(j).x,
              y: (j: number, t: HTMLElement) =>
                innerHeight / 2 - 30 - rel(t).y + fan(j).y,
              rotation: (j: number) => fan(j).r,
              scale: (j: number, t: HTMLElement) => Dw() / rel(t).w,
              duration: 1.8,
              stagger: 0.06,
              ease: "power3.inOut",
            },
            ">- .4"
          )
          .to(".atxt", { opacity: 1, y: 0, duration: 0.8 }, "<.7")
          .to(".atitle", { opacity: 1, y: 0, duration: 0.8 }, ">- .2")
          .to({}, { duration: 0.5 })
          .to(".atxt,.atitle", { opacity: 0, duration: 0.6 })
          .to(
            hitT,
            {
              x: (j: number, t: HTMLElement) => slotJ(j).x - rel(t).x,
              y: (j: number, t: HTMLElement) => slotJ(j).y - rel(t).y,
              scale: (j: number, t: HTMLElement) => slotJ(j).sc / rel(t).w,
              duration: 1.8,
              stagger: 0.04,
              ease: "power3.inOut",
            },
            "<"
          )
          .to(".gh", { opacity: 1, y: 0, duration: 0.8 }, "-=.6")
          .to(
            als.slice(1),
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
            "-=.8"
          )
          .set(als[0], { opacity: 1, y: 0 })
          .set(hitT, { opacity: 0 })
          .to(
            gal,
            { y: () => -(gal.scrollHeight - innerHeight * 0.75), duration: 4, ease: "none" },
            "+=.3"
          )
          .to(gal, { filter: "blur(18px)", opacity: 0, scale: 0.92, duration: 1.2 })
          .to(".gh", { opacity: 0, filter: "blur(10px)", duration: 0.8 }, "<")
          .to(sh, { backgroundColor: "#0a0a0a", duration: 1.2 }, "<")
          .to(".fx", { opacity: 1, filter: "blur(0px)", duration: 1.2 }, "-=.5")
          .to({}, { duration: 0.8 });

        /* 2. STATEMENT */
        const w = root.querySelectorAll<HTMLElement>(".state span");
        gsap.set(w, { opacity: 0.14 });
        gsap.to(w, {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".state",
            start: "top top",
            end: "+=130%",
            pin: true,
            anticipatePin: 1,
            scrub: 0.6,
          },
        });

        /* 3. STEPS + FEATURES */
        gsap.from(".step", {
          y: 140,
          rotate: 2.5,
          opacity: 0,
          stagger: 0.18,
          duration: 1.3,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".steps", start: "top 80%" },
        });
        root.querySelectorAll<HTMLElement>(".row").forEach((r) =>
          gsap.from(r, {
            x: -80,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: r, start: "top 90%" },
          })
        );

        /* 4. SCREENS (desktop pinned horizontal) */
        gsap.matchMedia().add("(min-width:861px)", () => {
          const rail = root.querySelector<HTMLElement>(".rail");
          if (!rail) return undefined;
          const sec = rail.parentElement as HTMLElement;
          const d = () => Math.max(0, rail.scrollWidth - innerWidth + 80);
          rail.style.overflow = "visible";
          rail.style.scrollSnapType = "none";
          gsap.to(rail, {
            x: () => -d(),
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top 8%",
              end: () => "+=" + d(),
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          return () => {
            rail.style.overflow = "";
            rail.style.scrollSnapType = "";
          };
        });

        /* 5. STATS, PRICING, QUOTES, FINALE */
        root.querySelectorAll<HTMLElement>(".sg b").forEach((b) => {
          const t = b.textContent;
          const n = parseInt(t, 10);
          const suf = t.replace(String(n), "");
          const o = { v: 0 };
          ScrollTrigger.create({
            trigger: b,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(o, {
                v: n,
                duration: 2.2,
                ease: "power3.out",
                onUpdate: () => {
                  b.textContent = Math.round(o.v) + suf;
                },
              }),
          });
        });
        gsap.from(".pc", {
          y: 100,
          opacity: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".price", start: "top 82%" },
        });
        root.querySelectorAll<HTMLElement>(".q p").forEach((p) =>
          gsap.from(p, {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: p, start: "top 88%" },
          })
        );
        gsap.from(".fin h2", {
          y: 80,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".fin", start: "top 70%" },
        });

        /* top progress bar */
        const pg = document.createElement("div");
        pg.style.cssText =
          "position:fixed;top:0;left:0;height:3px;width:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0);z-index:60";
        document.body.appendChild(pg);
        gsap.to(pg, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { scrub: 0.3, start: 0, end: "max" },
        });

        /* nav auto-hide */
        ScrollTrigger.create({
          start: 100,
          onUpdate: (s: any) =>
            gsap.to("nav", {
              yPercent: s.direction === 1 ? -130 : 0,
              duration: 0.45,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      }, root);

      /* --- footer glow (library-free rAF), outside GSAP context --- */
      const big = root.querySelector<HTMLElement>(".big");
      const glEl = root.querySelector<SVGElement>("#gl");
      const sv = root.querySelector<SVGSVGElement>("#gsvg");
      if (big && glEl && sv && !reduced) {
        const T0 = sv.querySelector("text");
        let bb: DOMRect | null = null;
        let ran = false;
        const fit = () => {
          if (!T0) return;
          bb = T0.getBBox();
          sv.setAttribute(
            "viewBox",
            `${bb.x - 10} ${bb.y} ${bb.width + 20} ${bb.height}`
          );
        };
        fit();
        (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
        const play = () => {
          if (glowRaf !== null) cancelAnimationFrame(glowRaf);
          if (!bb) return;
          const w = bb.width;
          const band = w * 0.32;
          const t0 = performance.now();
          const D = 3000;
          const f = (n: number) => {
            const b = bb;
            if (!b) return;
            let p = Math.min(1, (n - t0) / D);
            p = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
            const x = b.x - band + p * (w + band * 1.4);
            glEl.setAttribute("x1", String(x));
            glEl.setAttribute("x2", String(x + band));
            if (p < 1) {
              glowRaf = requestAnimationFrame(f);
            } else {
              glEl.setAttribute("x1", "-9999");
              glEl.setAttribute("x2", "-9000");
            }
          };
          glowRaf = requestAnimationFrame(f);
        };
        glowObs = new IntersectionObserver(
          (entries) => {
            entries.forEach((x) => {
              if (x.isIntersecting) {
                if (glowObs && !ran) {
                  ran = true;
                  play();
                }
              } else {
                ran = false;
              }
            });
          },
          { threshold: 0.35 }
        );
        glowObs.observe(big);
      }
    }

    return () => {
      stopped = true;
      clearTimeout(matchTimer);
      io.disconnect();
      if (glowRaf !== null) cancelAnimationFrame(glowRaf);
      if (glowObs) glowObs.disconnect();
      if (ctx) ctx.revert();
      html.style.scrollBehavior = prevScrollBehavior;
      root.classList.remove("g");
    };
  }, [rootRef]);
}
