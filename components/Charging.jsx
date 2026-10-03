"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BatteryExperience() {
  const section = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // ==========================================
      // MOBILE
      // Lightweight animations only
      // ==========================================
      if (isMobile) {
        // -----------------------------
        // TITLE
        // -----------------------------
        gsap.from(".battery-title", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section.current,
            start: "top 90%",
            once: true,
          },
        });

        // -----------------------------
        // BATTERY CELLS
        // Only transform + opacity
        // -----------------------------
        gsap.from(".battery-cell", {
          y: 12,
          opacity: 0,
          duration: 0.35,
          stagger: 0.015,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".battery-grid",
            start: "top 90%",
            once: true,
          },
        });

        // -----------------------------
        // ENERGY FLOW
        // -----------------------------
        gsap.fromTo(
          ".energy-flow",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.7,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: ".battery-grid",
              start: "top 90%",
              once: true,
            },
          }
        );

        return;
      }

      // ==========================================
      // DESKTOP
      // Full cinematic animation
      // ==========================================

      // -----------------------------
      // TITLE
      // -----------------------------
      gsap.from(".battery-title", {
        scrollTrigger: {
          trigger: section.current,
          start: "top 85%",
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // -----------------------------
      // BATTERY CELLS
      // -----------------------------
      gsap.from(".battery-cell", {
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          end: "center 40%",
          scrub: 1,
        },

        y: (index) => (index % 2 === 0 ? -60 : 60),

        x: (index) => (index - 5) * 12,

        rotate: (index) => (index - 5) * 3,

        opacity: 0,

        stagger: 0.03,
      });

      // -----------------------------
      // ENERGY FLOW
      // -----------------------------
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
      className="
        relative
        overflow-hidden
        bg-[#080808]
        px-5
        py-20
        text-white
        md:px-10
        md:py-10
      "
    >
      {/* ==========================================
          BACKGROUND TEXTURE
          Disabled on mobile to reduce rendering
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          hidden
          bg-center
          bg-no-repeat
          opacity-[0.07]
          md:block
        "
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/474x/57/44/96/574496770fd4202b80212674b8731d15.jpg)",
          backgroundSize: "280px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ==========================================
          LARGE BACKGROUND GLOW
          Desktop only
      ========================================== */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[55%]
          hidden
          h-[320px]
          w-[320px]
          -translate-x-1/2
          rounded-full
          bg-[#baff35]/5
          blur-[100px]
          md:block
        "
      />

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}
      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          items-center
          gap-12
          md:min-h-[75vh]
          md:grid-cols-2
          md:gap-16
        "
      >
        {/* ==========================================
            CONTENT
        ========================================== */}
        <div className="relative z-10">
          {/* Small Label */}
          <p
            className="
              mb-5
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-[#baff35]
            "
          >
            01 / Energy Core
          </p>

          {/* Title */}
          <h2
            className="
              battery-title
              text-[clamp(4rem,17vw,7rem)]
              font-black
              leading-[0.78]
              tracking-[-0.09em]
              md:text-9xl
            "
          >
            POWER
            <br />
            <span className="text-white/20">INSIDE.</span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-7
              max-w-md
              text-sm
              leading-6
              text-white/40
              md:mt-8
              md:leading-7
            "
          >
            Every journey starts inside the battery. Intelligent cells,
            thermal control and smart management work as one system.
          </p>
        </div>

        {/* ==========================================
            BATTERY
        ========================================== */}
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[360px]
            sm:max-w-[450px]
            md:max-w-xl
          "
        >
          <div
            className="
              relative
              h-[350px]
              sm:h-[390px]
              md:h-[430px]
            "
          >
            {/* ======================================
                ENERGY FLOW
            ====================================== */}
            <div
              className="
                absolute
                left-[5%]
                right-[5%]
                top-1/2
                z-0
              "
            >
              <div className="h-px w-full bg-white/10">
                <div
                  className="
                    energy-flow
                    h-full
                    w-full
                    origin-left
                    scale-x-0
                    bg-[#baff35]
                    shadow-[0_0_20px_#baff35]
                  "
                />
              </div>
            </div>

            {/* ======================================
                BATTERY GRID
            ====================================== */}
            <div
              className="
                battery-grid
                absolute
                inset-0
                grid
                grid-cols-3
                place-items-center
                gap-y-4
                px-1
                py-5
                sm:grid-cols-4
                sm:gap-3
                md:grid-cols-5
                md:gap-3
                md:p-5
              "
            >
              {Array.from({ length: 20 }).map((_, index) => {
                const isPositive = index < 10;

                return (
                  <div
                    key={index}
                    className={`
                      battery-cell
                      relative
                      flex
                      h-[64px]
                      w-[64px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      bg-zinc-950
                      shadow-none

                      sm:h-[72px]
                      sm:w-[72px]

                      md:h-20
                      md:w-20
                      md:bg-gradient-to-br
                      md:from-zinc-600
                      md:to-zinc-950
                      md:shadow-[inset_0_0_18px_rgba(255,255,255,.08)]

                      ${
                        isPositive
                          ? "border-[#baff35]/30"
                          : "border-blue-400/30"
                      }
                    `}
                  >
                    {/* ==================================
                        CELL GLOW
                        Mobile: completely removed
                        Desktop: enabled
                    ================================== */}
                    <span
                      className={`
                        absolute
                        hidden
                        h-5
                        w-5
                        rounded-full
                        blur-xl
                        md:block

                        ${
                          isPositive
                            ? "bg-[#baff35]/15"
                            : "bg-blue-400/15"
                        }
                      `}
                    />

                    {/* ==================================
                        CHARGE SYMBOL
                    ================================== */}
                    <span
                      className={`
                        relative
                        z-10
                        text-xl
                        font-bold
                        md:text-2xl

                        ${
                          isPositive
                            ? "text-[#baff35]"
                            : "text-blue-400"
                        }
                      `}
                    >
                      {isPositive ? "+" : "−"}
                    </span>

                    {/* ==================================
                        INNER RING
                    ================================== */}
                    <span
                      className={`
                        absolute
                        inset-[8px]
                        rounded-full
                        border
                        opacity-40

                        ${
                          isPositive
                            ? "border-[#baff35]"
                            : "border-blue-400"
                        }
                      `}
                    />

                    {/* ==================================
                        HIGHLIGHT
                    ================================== */}
                    <span
                      className="
                        absolute
                        left-[27%]
                        top-[20%]
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-white/25
                      "
                    />
                  </div>
                );
              })}
            </div>

            {/* ======================================
                LABELS
            ====================================== */}
            <div
              className="
                absolute
                bottom-0
                left-1/2
                flex
                -translate-x-1/2
                items-center
                gap-5
                whitespace-nowrap
                text-[8px]
                uppercase
                tracking-[0.2em]
              "
            >
              {/* Positive */}
              <span
                className="
                  flex
                  items-center
                  gap-2
                  text-[#baff35]/60
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#baff35]
                  "
                />

                Positive
              </span>

              {/* Negative */}
              <span
                className="
                  flex
                  items-center
                  gap-2
                  text-blue-400/60
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-blue-400
                  "
                />

                Negative
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}