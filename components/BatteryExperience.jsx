"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BatteryExperience() {
  const section = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".battery-title", {
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(".battery-cell", {
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          end: "center 40%",
          scrub: 1,
        },
        y: (index) => (index % 2 === 0 ? -70 : 70),
        x: (index) => (index - 5) * 18,
        rotate: (index) => (index - 5) * 4,
        opacity: 0,
        stagger: 0.04,
      });

      gsap.to(".energy-flow", {
        scrollTrigger: {
          trigger: section.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
        scaleX: 1,
        transformOrigin: "left center",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative overflow-hidden bg-[#080808] px-5 py-20 text-white sm:px-6 md:px-10 md:py-10"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.07]"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/474x/57/44/96/574496770fd4202b80212674b8731d15.jpg)",
          backgroundSize: "280px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-[50%] top-[55%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#baff35]/5 blur-[100px] md:h-[500px] md:w-[500px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 md:min-h-[75vh] md:grid-cols-2 md:gap-16">
        {/* =================================
            CONTENT
        ================================= */}

        <div className="relative z-10">
          <p className="mb-5 text-[9px] uppercase tracking-[0.35em] text-[#baff35] sm:text-[10px] md:mb-6">
            01 / Energy Core
          </p>

          <h2 className="battery-title text-[clamp(4rem,17vw,7rem)] font-black leading-[0.78] tracking-[-0.09em] md:text-9xl">
            POWER
            <br />
            <span className="text-white/20">INSIDE.</span>
          </h2>

          <p className="mt-7 max-w-md text-sm leading-6 text-white/40 md:mt-8 md:leading-7">
            Every journey starts inside the battery. Intelligent cells,
            thermal control and smart management work as one system.
          </p>

          {/* Small mobile stats */}
          <div className="mt-8 flex gap-8 border-t border-white/10 pt-5 md:hidden">
            <div>
              <p className="text-xl font-bold text-white">20</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                Cells
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-[#baff35]">+</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                Active
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-blue-400">−</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                Return
              </p>
            </div>
          </div>
        </div>

        {/* =================================
            BATTERY VISUAL
        ================================= */}

        <div className="relative mx-auto h-[330px] w-full max-w-[390px] sm:h-[370px] sm:max-w-[460px] md:h-[430px] md:max-w-xl">
          {/* Energy line */}
          <div className="absolute left-[5%] right-[5%] top-1/2 z-0">
            <div className="h-px w-full bg-white/10">
              <div className="energy-flow h-full w-full origin-left scale-x-0 bg-[#baff35] shadow-[0_0_20px_#baff35]" />
            </div>
          </div>

          {/* Battery cells */}
          <div className="absolute inset-0 grid grid-cols-4 place-items-center gap-2 px-2 py-6 sm:grid-cols-5 sm:gap-3 sm:p-5">
            {Array.from({ length: 20 }).map((_, index) => {
              const isPositive = index < 10;

              return (
                <div
                  key={index}
                  className={`battery-cell relative flex h-[62px] w-[62px] items-center justify-center rounded-full border bg-gradient-to-br from-zinc-600 to-zinc-950 shadow-[inset_0_0_18px_rgba(255,255,255,.08)] sm:h-[70px] sm:w-[70px] md:h-20 md:w-20 ${
                    isPositive
                      ? "border-[#baff35]/30"
                      : "border-blue-400/30"
                  }`}
                >
                  {/* Glow */}
                  <span
                    className={`absolute h-5 w-5 rounded-full blur-xl ${
                      isPositive
                        ? "bg-[#baff35]/20"
                        : "bg-blue-400/20"
                    }`}
                  />

                  {/* Charge */}
                  <span
                    className={`relative z-10 text-xl font-bold sm:text-2xl ${
                      isPositive
                        ? "text-[#baff35]"
                        : "text-blue-400"
                    }`}
                  >
                    {isPositive ? "+" : "−"}
                  </span>

                  {/* Inner ring */}
                  <span
                    className={`absolute inset-2 rounded-full border opacity-40 ${
                      isPositive
                        ? "border-[#baff35]"
                        : "border-blue-400"
                    }`}
                  />

                  {/* Small highlight */}
                  <span className="absolute left-[28%] top-[20%] h-1.5 w-1.5 rounded-full bg-white/30 blur-[1px]" />
                </div>
              );
            })}
          </div>

          {/* Labels */}
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-5 whitespace-nowrap text-[8px] uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 text-[#baff35]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#baff35]" />
              Positive
            </span>

            <span className="flex items-center gap-2 text-blue-400/60">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Negative
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}