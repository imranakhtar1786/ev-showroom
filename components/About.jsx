"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  BatteryCharging,
  Leaf,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: "01",
    title: "PEOPLE",
    text: "Mobility should fit naturally into everyday life.",
  },
  {
    number: "02",
    title: "TECHNOLOGY",
    text: "Smarter electric systems built for real-world movement.",
  },
  {
    number: "03",
    title: "FREEDOM",
    text: "More efficient ways to move, work and explore.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* -----------------------------
         HEADING
      ----------------------------- */

      gsap.from(".about-kicker", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".about-title-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
          once: true,
        },
      });

      /* -----------------------------
         IMAGE REVEAL
      ----------------------------- */

      gsap.from(".about-image-wrap", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".about-image-wrap",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".about-image", {
        scale: 1.25,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image-wrap",
          start: "top 78%",
          once: true,
        },
      });

      /* -----------------------------
         DESCRIPTION
      ----------------------------- */

      gsap.from(".about-copy", {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 82%",
          once: true,
        },
      });

      /* -----------------------------
         PRINCIPLES
      ----------------------------- */

      gsap.from(".principle", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".principles",
          start: "top 80%",
          once: true,
        },
      });

      /* -----------------------------
         IMAGE PARALLAX
      ----------------------------- */

      gsap.to(".about-image", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-image-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* -----------------------------
         FLOATING CARD
      ----------------------------- */

      gsap.to(".about-floating-card", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* -----------------------------
         LIME DOT
      ----------------------------- */

      gsap.to(".about-lime-dot", {
        scale: 1.8,
        opacity: 0.35,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* -----------------------------
         MARQUEE
      ----------------------------- */

      gsap.to(".about-marquee-track", {
        xPercent: -50,
        duration: 25,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* -----------------------------
     MOUSE IMAGE MOVEMENT
  ----------------------------- */

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(".about-image", {
      x: x * 12,
      y: y * 8,
      scale: 1.04,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".about-image", {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#f4f4ef] px-5 py-20 text-black md:px-10 md:py-20"
    >
      {/* =================================
          BACKGROUND GRID
      ================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =================================
            HEADER
        ================================= */}

        <div className="about-kicker flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.3em] text-black/45">
          <span className="h-[2px] w-10 bg-[#baff35]" />
          02 / About Us
        </div>

        {/* =================================
            TITLE
        ================================= */}

        <div className="about-title mt-10">
          <div className="overflow-hidden">
            <h2 className="about-title-line text-[clamp(4.5rem,11vw,11rem)] font-black leading-[0.76] tracking-[-0.09em]">
              BUILT
            </h2>
          </div>

          <div className="flex items-end gap-4 overflow-hidden md:gap-8">
            <div className="overflow-hidden">
              <h2 className="about-title-line text-[clamp(4.5rem,11vw,11rem)] font-black leading-[0.76] tracking-[-0.09em]">
                AROUND
              </h2>
            </div>

            <div className="mb-2 hidden h-4 w-4 rounded-full bg-[#baff35] md:mb-5 md:block" />
          </div>

          <div className="overflow-hidden">
            <h2 className="about-title-line text-[clamp(4.5rem,11vw,11rem)] font-black leading-[0.76] tracking-[-0.09em] text-black/15">
              MOVEMENT.
            </h2>
          </div>
        </div>

        {/* =================================
            MAIN IMAGE + COPY
        ================================= */}

        <div className="mt-20 grid items-end gap-10 lg:grid-cols-[1.45fr_0.55fr]">
          {/* IMAGE */}
          <div
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="about-image-wrap relative h-[55vh] min-h-[430px] overflow-hidden rounded-[34px_12px_34px_12px] bg-black md:h-[650px]"
          >
            {/* Replace this URL with your actual vehicle image */}
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1800&q=85"
              alt="Electric mobility"
              className="about-image h-full w-full object-cover"
            />

            {/* Image dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

            {/* Image label */}
            <div className="absolute left-6 top-6 flex items-center gap-3 md:left-8 md:top-8">
              <span className="about-lime-dot h-2 w-2 rounded-full bg-[#baff35]" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-white/70">
                Electric / Everyday / Future
              </span>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-7 left-6 right-6 flex items-end justify-between md:bottom-9 md:left-9 md:right-9">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/50">
                  Our philosophy
                </p>

                <p className="mt-2 max-w-lg text-2xl font-medium leading-tight tracking-[-0.04em] text-white md:text-4xl">
                  Move better.
                  <br />
                  Live lighter.
                </p>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-full bg-[#baff35] text-black md:flex">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>

          {/* COPY */}
          <div className="about-copy">
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/35">
              What drives us
            </p>

            <p className="mt-6 text-2xl font-semibold leading-[1.15] tracking-[-0.04em] md:text-3xl">
              Electric mobility should feel exciting, not complicated.
            </p>

            <p className="mt-6 text-sm leading-7 text-black/50">
              We bring together electric vehicles, modern technology and
              practical mobility solutions to make the transition to electric
              movement easier.
            </p>

            <p className="mt-5 text-sm leading-7 text-black/50">
              From everyday commuters to commercial mobility, we focus on
              products that make sense in the real world.
            </p>

            {/* Floating mini card */}
            <div className="about-floating-card mt-9 flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-[#baff35]">
                <BatteryCharging size={20} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-black/35">
                  Our direction
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Cleaner. Smarter. Electric.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================
            PRINCIPLES
        ================================= */}

        <div className="principles mt-24 border-t border-black/10">
          {principles.map((item) => (
            <div
              key={item.number}
              className="principle group grid gap-5 border-b border-black/10 py-7 md:grid-cols-[100px_0.8fr_1fr] md:items-center md:py-9"
            >
              <span className="text-[10px] tracking-[0.25em] text-black/30">
                {item.number}
              </span>

              <h3 className="flex items-center gap-3 text-3xl font-black tracking-[-0.06em] transition-transform duration-500 group-hover:translate-x-3 md:text-5xl">
                {item.title}

                <ArrowUpRight
                  size={20}
                  className="opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100"
                />
              </h3>

              <p className="max-w-md text-sm leading-6 text-black/45">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* =================================
            MARQUEE
        ================================= */}

        <div className="mt-20 overflow-hidden border-y border-black/10 py-6">
          <div className="about-marquee-track flex w-max items-center">
            {[
              "PEOPLE",
              "TECHNOLOGY",
              "MOBILITY",
              "FUTURE",
              "PEOPLE",
              "TECHNOLOGY",
              "MOBILITY",
              "FUTURE",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center whitespace-nowrap"
              >
                <span className="px-7 text-4xl font-black tracking-[-0.06em] md:px-12 md:text-6xl">
                  {item}
                </span>

                <Zap
                  size={24}
                  className="text-[#baff35]"
                  fill="#baff35"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}