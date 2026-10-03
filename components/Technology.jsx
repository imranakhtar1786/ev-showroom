"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  Battery,
  Cpu,
  Thermometer,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const technology = [
  {
    no: "01",
    title: "SMART BMS",
    label: "Battery Management",
    description:
      "Every cell is continuously monitored for voltage, temperature, current and state of charge.",
    value: "99.8%",
    unit: "CONTROL",
    icon: Cpu,
  },
  {
    no: "02",
    title: "THERMAL CONTROL",
    label: "Thermal Intelligence",
    description:
      "Intelligent thermal management keeps the battery within its optimal operating temperature.",
    value: "24/7",
    unit: "MONITORING",
    icon: Thermometer,
  },
  {
    no: "03",
    title: "FAST CHARGING",
    label: "Energy Recovery",
    description:
      "Optimized charging architecture is designed to deliver efficient energy transfer with less downtime.",
    value: "80%",
    unit: "RAPID CHARGE",
    icon: Zap,
  },
  {
    no: "04",
    title: "LONG CYCLE LIFE",
    label: "Battery Durability",
    description:
      "Advanced cell architecture is engineered for repeated charging cycles and demanding mobility applications.",
    value: "3000+",
    unit: "CYCLES",
    icon: Activity,
  },
];

export default function Technology() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const batteryRef = useRef(null);
  const energyRef = useRef(null);
  const cellsRef = useRef([]);

  const [active, setActive] = useState(0);

  const activeTechnology = technology[active];

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* --------------------------------
         INITIAL STATES
      -------------------------------- */

      gsap.set(".technology-eyebrow", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".technology-heading", {
        opacity: 0,
        y: 60,
      });

      gsap.set(".technology-intro", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".technology-visual", {
        opacity: 0,
        scale: 0.92,
        y: 50,
      });

      gsap.set(".technology-row", {
        opacity: 0,
        x: 60,
      });

      gsap.set(".battery-cell", {
        opacity: 0.18,
        scale: 0.85,
      });

      /* --------------------------------
         TEXT INTRO
      -------------------------------- */

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      intro
        .to(".technology-eyebrow", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .to(
          ".technology-heading",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .to(
          ".technology-intro",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        );

      /* --------------------------------
         BATTERY VISUAL INTRO
      -------------------------------- */

      const visualIntro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          once: true,
        },
      });

      visualIntro
        .to(".technology-visual", {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "expo.out",
        })
        .to(
          ".battery-cell",
          {
            opacity: 0.65,
            scale: 1,
            duration: 0.5,
            stagger: {
              each: 0.025,
              from: "center",
            },
            ease: "power2.out",
          },
          "-=0.65"
        );

      /* --------------------------------
         TECHNOLOGY ROWS
      -------------------------------- */

      gsap.to(".technology-row", {
        opacity: 1,
        x: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".technology-list",
          start: "top 78%",
          once: true,
        },
      });

      /* --------------------------------
         BATTERY FLOAT
      -------------------------------- */

      gsap.to(batteryRef.current, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* --------------------------------
         ENERGY FLOW
      -------------------------------- */

      if (energyRef.current) {
        gsap.fromTo(
          energyRef.current,
          {
            strokeDashoffset: 700,
          },
          {
            strokeDashoffset: 0,
            duration: 3,
            repeat: -1,
            ease: "none",
          }
        );
      }

      /* --------------------------------
         BATTERY CELL PULSE
      -------------------------------- */

      gsap.to(".battery-cell", {
        opacity: 0.95,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.07,
          from: "random",
        },
        ease: "sine.inOut",
      });

      /* --------------------------------
         SCROLL PARALLAX
      -------------------------------- */

      gsap.to(visualRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /* --------------------------------
     CHANGE TECHNOLOGY
  -------------------------------- */

  const changeTechnology = (index) => {
    if (index === active) return;

    setActive(index);

    const cells = cellsRef.current.filter(Boolean);

    gsap.fromTo(
      cells,
      {
        scale: 0.85,
        opacity: 0.2,
      },
      {
        scale: 1,
        opacity: 0.75,
        duration: 0.45,
        stagger: {
          each: 0.015,
          from: index % 2 === 0 ? "start" : "end",
        },
        ease: "power2.out",
      }
    );
  };

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] px-5 py-10 text-white sm:px-8 md:px-12 md:py-20 lg:px-16"
    >
      {/* ==================================================
          REPEATED BACKGROUND IMAGE
      ================================================== */}

      <div
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/474x/57/44/96/574496770fd4202b80212674b8731d15.jpg)",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ==================================================
          DARK OVERLAY
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[#080808]/60" />

      {/* ==================================================
          TECHNICAL GRID
      ================================================== */}

     

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="relative z-10 mx-auto max-w-[1450px]">
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="max-w-4xl">
          <div className="technology-eyebrow flex items-center gap-4">
            <span className="h-px w-8 bg-[#baff35]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#baff35]">
              03 / Technology
            </span>
          </div>

          <h2 className="technology-heading mt-7 text-[15vw] font-black leading-[0.75] tracking-[-0.11em] sm:text-[11vw] md:text-[8rem] lg:text-[9.5rem]">
            ENERGY
            <br />

            <span className="text-white/15">
              REDEFINED.
            </span>
          </h2>

          <div className="technology-intro mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-lg text-sm leading-7 text-white/40 md:text-base">
              Intelligent battery architecture designed
              around performance, control and longevity.
              Every layer works together as one energy
              system.
            </p>

            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#baff35]" />

              EV ENERGY PLATFORM / 01
            </div>
          </div>
        </div>

        {/* ==================================================
            MAIN TECHNOLOGY AREA
        ================================================== */}

        <div className="mt-20 grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          {/* ==================================================
              LEFT BATTERY VISUAL
          ================================================== */}

          <div
            ref={visualRef}
            className="relative lg:sticky lg:top-24 lg:h-[650px]"
          >
            <div className="technology-visual relative h-full min-h-[500px]">
              {/* Outer frame */}

              <div className="absolute inset-0 rounded-[2rem] border border-white/[0.08] bg-white/[0.015] backdrop-blur-[1px]" />

              {/* Technical corners */}

              <span className="absolute left-5 top-5 h-7 w-7 border-l border-t border-[#baff35]/40" />

              <span className="absolute right-5 top-5 h-7 w-7 border-r border-t border-[#baff35]/40" />

              <span className="absolute bottom-5 left-5 h-7 w-7 border-b border-l border-[#baff35]/40" />

              <span className="absolute bottom-5 right-5 h-7 w-7 border-b border-r border-[#baff35]/40" />

              {/* Top information */}

              <div className="absolute left-8 right-8 top-8 flex items-start justify-between">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Battery Architecture
                  </p>

                  <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/60">
                    {activeTechnology.label}
                  </p>
                </div>

                <Battery
                  size={18}
                  strokeWidth={1}
                  className="text-[#baff35]"
                />
              </div>

              {/* ==================================================
                  BATTERY
              ================================================== */}

              <div
                ref={batteryRef}
                className="absolute left-1/2 top-1/2 w-[68%] max-w-[370px] -translate-x-1/2 -translate-y-1/2"
              >
                {/* Ground shadow */}

                <div className="absolute left-1/2 top-[100%] h-10 w-[70%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />

                {/* Battery casing */}

                <div className="relative aspect-[0.7] rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-zinc-700 via-zinc-950 to-black p-3 shadow-[0_30px_100px_rgba(0,0,0,.7)]">
                  <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#baff35]/15 bg-black">
                    {/* Battery glow */}

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(186,255,53,.10),transparent_50%)]" />

                    {/* Battery cells */}

                    <div className="absolute inset-[13%] grid grid-cols-4 gap-2 sm:gap-3">
                      {Array.from({ length: 32 }).map(
                        (_, index) => (
                          <span
                            key={index}
                            ref={(el) => {
                              cellsRef.current[index] =
                                el;
                            }}
                            className="battery-cell rounded-[5px] border border-[#baff35]/10 bg-gradient-to-b from-[#baff35]/20 to-white/[0.02] shadow-[inset_0_0_10px_rgba(186,255,53,.06)]"
                          />
                        )
                      )}
                    </div>

                    {/* Core */}

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="grid h-14 w-14 place-items-center rounded-full border border-[#baff35]/25 bg-[#baff35]/[0.06]">
                        <Battery
                          size={22}
                          strokeWidth={1}
                          className="text-[#baff35]"
                        />
                      </div>

                      <span className="mt-5 font-mono text-[8px] uppercase tracking-[0.25em] text-white/25">
                        Energy Core
                      </span>

                      <span className="mt-2 text-3xl font-black tracking-[-0.06em]">
                        800V
                      </span>
                    </div>

                    {/* Energy flow */}

                    <svg
                      className="pointer-events-none absolute inset-0 h-full w-full"
                      viewBox="0 0 100 140"
                      fill="none"
                    >
                      <path
                        d="M50 0 V140"
                        stroke="rgba(186,255,53,.10)"
                        strokeWidth="0.6"
                      />

                      <path
                        ref={energyRef}
                        d="M50 140 V0"
                        stroke="#baff35"
                        strokeWidth="0.8"
                        strokeDasharray="8 92"
                        strokeDashoffset="700"
                        opacity="0.7"
                      />
                    </svg>
                  </div>

                  {/* Battery terminal */}

                  <div className="absolute left-1/2 top-[-10px] h-5 w-20 -translate-x-1/2 rounded-t-lg border border-white/10 bg-zinc-700" />
                </div>
              </div>

              {/* ==================================================
                  BOTTOM INFORMATION
              ================================================== */}

              <div className="absolute bottom-7 left-8 right-8 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                    Active System
                  </p>

                  <p className="mt-2 font-mono text-[10px] font-bold text-[#baff35]">
                    {activeTechnology.no} /{" "}
                    {activeTechnology.title}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                    Status
                  </p>

                  <div className="mt-2 flex items-center justify-end gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#baff35] shadow-[0_0_10px_#baff35]" />

                    <span className="font-mono text-[9px] text-white/50">
                      OPTIMAL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================================
              TECHNOLOGY LIST
          ================================================== */}

          <div className="technology-list border-t border-white/10">
            {technology.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;

              return (
                <button
                  key={item.no}
                  type="button"
                  onMouseEnter={() =>
                    changeTechnology(index)
                  }
                  onFocus={() =>
                    changeTechnology(index)
                  }
                  onClick={() =>
                    changeTechnology(index)
                  }
                  className={`technology-row group relative w-full border-b border-white/10 py-8 text-left transition-all duration-500 md:py-10 ${
                    isActive
                      ? "bg-white/[0.025]"
                      : ""
                  }`}
                >
                  {/* Active indicator */}

                  <span
                    className={`absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-[#baff35] transition-transform duration-500 ${
                      isActive
                        ? "scale-y-100"
                        : "scale-y-0"
                    }`}
                  />

                  <div className="flex items-start gap-5 pl-5 md:gap-7 md:pl-7">
                    {/* Number */}

                    <span
                      className={`pt-1 font-mono text-[10px] transition-colors duration-300 ${
                        isActive
                          ? "text-[#baff35]"
                          : "text-white/20"
                      }`}
                    >
                      {item.no}
                    </span>

                    <div className="min-w-0 flex-1">
                      {/* Main row */}

                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                          {/* Icon */}

                          <div
                            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                              isActive
                                ? "border-[#baff35]/40 bg-[#baff35]/10 text-[#baff35]"
                                : "border-white/10 text-white/20"
                            }`}
                          >
                            <Icon
                              size={16}
                              strokeWidth={1.4}
                            />
                          </div>

                          <div>
                            {/* Label */}

                            <p
                              className={`text-[9px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                                isActive
                                  ? "text-[#baff35]"
                                  : "text-white/20"
                              }`}
                            >
                              {item.label}
                            </p>

                            {/* Title */}

                            <h3
                              className={`mt-1 text-xl font-black tracking-[-0.04em] transition-colors duration-300 sm:text-2xl md:text-3xl ${
                                isActive
                                  ? "text-white"
                                  : "text-white/45"
                              }`}
                            >
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Metric */}

                        <div className="hidden text-right sm:block">
                          <div
                            className={`font-mono text-lg font-bold transition-colors duration-300 ${
                              isActive
                                ? "text-[#baff35]"
                                : "text-white/20"
                            }`}
                          >
                            {item.value}
                          </div>

                          <div className="mt-1 text-[7px] font-bold uppercase tracking-[0.15em] text-white/20">
                            {item.unit}
                          </div>
                        </div>
                      </div>

                      {/* Expandable content */}

                      <div
                        className={`grid transition-[grid-template-rows] duration-500 ${
                          isActive
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="mt-5 max-w-lg text-sm leading-6 text-white/40">
                            {item.description}
                          </p>

                          <div className="mt-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-[#baff35]/40" />

                            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                              Intelligent Energy System
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            FOOTER INFORMATION
        ================================================== */}

        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-xs leading-6 text-white/25">
            One intelligent energy platform. Multiple
            layers of control. Designed to make electric
            mobility more efficient, predictable and
            durable.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
              Engineering
            </span>

            <span className="h-px w-12 bg-[#baff35]/40" />

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#baff35]">
              03 / 04
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM ACCENT
      ================================================== */}

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#baff35]/40 to-transparent" />
    </section>
  );
}