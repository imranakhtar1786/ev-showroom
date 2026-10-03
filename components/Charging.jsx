"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    name: "Electroride",
    image:
      "https://electroride.in/cdn/shop/files/400_x_200_Small_d42cc9df-54ed-479c-ba24-bfb5a23f7ec1.gif?v=1776409886&width=625",
  },
  {
    name: "Mantra",
    image:
      "https://electroride.in/cdn/shop/files/1_4b390d55-42c1-4c22-9bfe-8cd1151572e4.png?v=1770797818&width=625",
  },
  {
    name: "Victory",
    image:
      "https://electroride.in/cdn/shop/files/2_7d05d496-dec4-4e58-96ee-b9d3429937ae.png?v=1770797818&width=625",
  },
  {
    name: "Hero Lectro",
    image:
      "https://electroride.in/cdn/shop/files/3_4d644e5f-bfeb-49b7-904a-2a276c830d01.png?v=1770797818&width=625",
  },
  {
    name: "Mayuri",
    image:
      "https://electroride.in/cdn/shop/files/4_62e00f0a-2fa1-4ce4-963d-61170f4db10f.png?v=1770797818&width=625",
  },
  {
    name: "ADM Technologies",
    image:
      "https://electroride.in/cdn/shop/files/Untitled_design_-_2026-02-27T123233.821.png?v=1772175836&width=1125",
  },
  {
    name: "OSM",
    image:
      "https://electroride.in/cdn/shop/files/6_edd542f8-a47e-4e99-a449-9debdd13255c.png?v=1770797817&width=625",
  },
  {
    name: "Bounce Infinity",
    image:
      "https://electroride.in/cdn/shop/files/7_56b0c85e-64d6-4d5f-a984-a67d54e3f48e.png?v=1770797817&width=625",
  },
  {
    name: "Zero 21",
    image:
      "https://electroride.in/cdn/shop/files/8_463653d7-6a55-4eac-a3c5-0603a3c330bc.png?v=1770797818&width=625",
  },
  {
    name: "VEGH",
    image:
      "https://electroride.in/cdn/shop/files/Untitled_design_-_2026-03-18T130409.119.png?v=1773819370&width=919",
  },
];

export default function Charging() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /* HEADER */

      gsap.from(".brands-eyebrow", {
        opacity: 0,
        x: -25,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".brands-title-line", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".brands-intro", {
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      /* CARDS */

      gsap.from(".brand-card", {
        opacity: 0,
        y: 55,
        scale: 0.95,
        duration: 0.75,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".brands-grid",
          start: "top 82%",
          once: true,
        },
      });

      /* BACKGROUND */

      gsap.to(".brands-orb", {
        x: 45,
        y: -25,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* =========================================
     MOUSE MOVE
  ========================================= */

  const handleMouseMove = (event, index) => {
    const card = cardsRef.current[index];

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    gsap.to(card, {
      rotateX: py * -7,
      rotateY: px * 9,
      scale: 1.02,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });

    const image = card.querySelector(".brand-image");

    if (image) {
      gsap.to(image, {
        x: px * 10,
        y: py * 7,
        scale: 1.05,
        duration: 0.45,
        ease: "power2.out",
      });
    }

    const glow = card.querySelector(".brand-glow");

    if (glow) {
      gsap.to(glow, {
        x: px * 80,
        y: py * 60,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  /* =========================================
     MOUSE LEAVE
  ========================================= */

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];

    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.65,
      ease: "elastic.out(1, 0.45)",
    });

    const image = card.querySelector(".brand-image");

    if (image) {
      gsap.to(image, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    const glow = card.querySelector(".brand-glow");

    if (glow) {
      gsap.to(glow, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <section
      id="charging"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f6f6f2] px-5 py-22 text-black sm:px-8 md:px-12 md:py-22 lg:px-16"
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.7) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        <div className="brands-orb absolute right-[-10%] top-[5%] h-[420px] w-[420px] rounded-full bg-[#baff35]/20 blur-[140px]" />

        <div className="absolute bottom-[-10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-black/[0.025] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px]">
        {/* =====================================
            HEADER
        ====================================== */}

        <div className="max-w-5xl">
          <div className="brands-eyebrow flex items-center gap-3">
            <span className="h-[2px] w-8 bg-black" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/50">
              04 / Brand Network
            </span>
          </div>

          {/* FIXED HEADING */}

          <div className="mt-7 max-w-full overflow-hidden">
            <h2 className="max-w-full text-[clamp(4rem,9vw,9rem)] font-black leading-[0.78] tracking-[-0.085em]">
              <span className="brands-title-line whitespace-nowrap">
                BRANDS {" "}
              </span>

              <span className="brands-title-line  whitespace-nowrap text-black/11">
                 WE SELL.
              </span>
            </h2>
          </div>

          <div className="brands-intro mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-sm font-medium leading-6 text-black/55 md:text-base">
              Explore our range of electric mobility brands,
              bringing multiple vehicle technologies and
              mobility solutions together.
            </p>

            <div className="flex shrink-0 items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a4d600] shadow-[0_0_12px_rgba(164,214,0,.8)]" />

              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/40">
                {brands.length} Brands
              </span>
            </div>
          </div>
        </div>

        {/* =====================================
            BRAND GRID
        ====================================== */}

        <div
          className="brands-grid mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5"
          style={{
            perspective: "1200px",
          }}
        >
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              onMouseMove={(event) =>
                handleMouseMove(event, index)
              }
              onMouseLeave={() =>
                handleMouseLeave(index)
              }
              className="brand-card group relative h-[365px] min-w-0 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* OUTER BORDER */}

              <div className="absolute inset-0 overflow-hidden rounded-[36px_14px_36px_14px] bg-black p-[1px]">
                {/* Animated border */}

                <div className="pointer-events-none absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#baff35_330deg,transparent_360deg)] opacity-0 transition-opacity duration-500 group-hover:animate-[spin_2.5s_linear_infinite] group-hover:opacity-100" />

                {/* CARD */}

                <div className="relative h-full w-full overflow-hidden rounded-[35px_13px_35px_13px] bg-[#fafaf6]">
                  {/* GRID */}

                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,0,0,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.8) 1px, transparent 1px)",
                      backgroundSize: "22px 22px",
                    }}
                  />

                  {/* GLOW */}

                  <div className="brand-glow pointer-events-none absolute left-1/2 top-1/2 z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#baff35]/25 opacity-0 blur-[60px]" />

                  {/* NUMBER */}

                  <span className="absolute -right-2 -top-6 z-10 select-none text-[100px] font-black leading-none tracking-[-0.12em] text-black/[0.04] transition-colors duration-500 group-hover:text-[#baff35]/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* TOP LABEL */}

                  <div className="absolute left-5 right-5 top-5 z-30 flex min-w-0 items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-black transition-all duration-300 group-hover:bg-[#baff35] group-hover:shadow-[0_0_10px_#baff35]" />

                      <span className="truncate font-mono text-[7px] font-bold uppercase tracking-[0.16em] text-black/40">
                        Electric Network
                      </span>
                    </div>

                    <span className="ml-2 shrink-0 font-mono text-[7px] text-black/25">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* IMAGE */}

                  <div className="absolute left-4 right-4 top-[64px] h-[175px] overflow-hidden rounded-[23px_9px_23px_9px] border border-black/10 bg-white">
                    {/* Glow */}

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(186,255,53,.10),transparent_65%)]" />

                    {/* Image */}

                    <div className="absolute inset-0 flex items-center justify-center px-3 py-5">
                      <img
                        src={brand.image}
                        alt={`${brand.name} electric mobility`}
                        loading="lazy"
                        className="brand-image block max-h-full max-w-full object-contain object-center will-change-transform"
                      />
                    </div>

                    {/* Overlay */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/[0.05]" />

                    {/* Shine */}

                    <div className="pointer-events-none absolute inset-y-0 left-[-100%] w-[40%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[150%] group-hover:opacity-100" />

                    {/* Scan */}

                    <div className="absolute bottom-0 left-3 top-0 w-px bg-black/10">
                      <div className="absolute -top-14 h-14 w-full bg-[#baff35] shadow-[0_0_10px_#baff35] transition-transform duration-1000 group-hover:translate-y-[245px]" />
                    </div>

                    {/* Corners */}

                    <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-black/15 transition-all duration-500 group-hover:h-10 group-hover:w-10 group-hover:border-[#baff35]" />

                    <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-black/15 transition-all duration-500 group-hover:h-10 group-hover:w-10 group-hover:border-[#baff35]" />
                  </div>

                  {/* META */}

                  <div className="absolute left-5 top-[250px] z-20 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#a4d600]" />

                    <span className="font-mono text-[7px] font-bold uppercase tracking-[0.15em] text-black/35">
                      Mobility / 2026
                    </span>
                  </div>

                  {/* BRAND */}

                  <div className="absolute bottom-[61px] left-5 right-5 z-30 min-w-0">
                    <h3 className="truncate text-[21px] font-black leading-none tracking-[-0.05em]">
                      {brand.name}
                    </h3>

                    <div className="mt-2 flex min-w-0 items-center gap-2">
                      <span className="h-px w-7 shrink-0 bg-black transition-all duration-500 group-hover:w-12 group-hover:bg-[#baff35]" />

                      <span className="truncate text-[7px] font-bold uppercase tracking-[0.15em] text-black/35">
                        Electric Mobility
                      </span>
                    </div>
                  </div>

                  {/* ACTION */}

                  <div className="absolute bottom-0 left-0 right-0 z-30 flex h-12 items-center justify-between border-t border-black/10 bg-white/80 px-5 backdrop-blur-md">
                    <span className="font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-black/35 transition-colors duration-300 group-hover:text-black">
                      Discover
                    </span>

                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-black group-hover:bg-[#baff35]">
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* BOTTOM LINE */}

                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black/5">
                    <div className="h-full w-0 bg-[#baff35] shadow-[0_0_10px_#baff35] transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>
              </div>

              {/* SHADOW */}

              <div className="pointer-events-none absolute -bottom-4 left-[15%] right-[15%] h-7 rounded-full bg-black/10 blur-xl transition-all duration-700 group-hover:scale-125 group-hover:bg-[#baff35]/20" />
            </div>
          ))}
        </div>

        {/* =====================================
            FOOTER
        ====================================== */}
      </div>

      {/* ACCENT */}

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#baff35] to-transparent" />
    </section>
  );
}