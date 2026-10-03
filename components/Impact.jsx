"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Quote, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Rahul Sharma",
    location: "Delhi",
    model: "Electroride E-Scooter",
    review:
      "The buying experience was smooth and the scooter feels extremely comfortable for everyday city travel.",
  },
  {
    name: "Amit Kumar",
    location: "Noida",
    model: "Hero Lectro",
    review:
      "I was looking for a practical electric vehicle for my daily commute. The showroom experience made the decision much easier.",
  },
  {
    name: "Priya Verma",
    location: "Gurugram",
    model: "Bounce Infinity",
    review:
      "Clean design, simple experience and a very comfortable ride. The team explained everything clearly.",
  },
  {
    name: "Vikas Singh",
    location: "Ghaziabad",
    model: "Mantra Electric",
    review:
      "The vehicle has been a great fit for my daily travel. The overall purchasing experience was straightforward.",
  },
];

export default function Impact() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --------------------------------
         HERO / HEADING REVEAL
      -------------------------------- */

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      introTl
        .from(".review-eyebrow", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        })
        .from(
          ".review-title-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .from(
          ".review-intro",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.45"
        );

      /* --------------------------------
         CARDS ENTRANCE
      -------------------------------- */

      gsap.from(".review-card", {
        y: 100,
        opacity: 0,
        rotateX: 14,
        scale: 0.92,
        duration: 1,
        stagger: 0.13,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".reviews-grid",
          start: "top 82%",
          once: true,
        },
      });

      /* --------------------------------
         BACKGROUND PARALLAX
      -------------------------------- */

      gsap.to(".review-orb-main", {
        yPercent: -25,
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".review-orb-small", {
        yPercent: 40,
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* --------------------------------
         GRID PARALLAX
      -------------------------------- */

      gsap.to(".review-grid", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* --------------------------------
         CONTINUOUS CARD FLOAT
      -------------------------------- */

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.to(card, {
          y: index % 2 === 0 ? -6 : 6,
          duration: 2.8 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });

      /* --------------------------------
         MOVING LINE
      -------------------------------- */

      gsap.to(".reviews-line", {
        xPercent: 100,
        duration: 3,
        repeat: -1,
        ease: "none",
      });

      /* --------------------------------
         QUOTE FLOAT
      -------------------------------- */

      gsap.to(".quote-icon", {
        y: -8,
        rotate: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* --------------------------------
     MOUSE TILT
  -------------------------------- */

  const handleMove = (e, index) => {
    const card = cardsRef.current[index];

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    gsap.to(card, {
      rotateX: py * -8,
      rotateY: px * 10,
      scale: 1.035,
      y: -12,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });

    const glow = card.querySelector(".review-glow");

    if (glow) {
      gsap.to(glow, {
        x: px * 100,
        y: py * 80,
        opacity: 0.9,
        scale: 1.2,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    const quote = card.querySelector(".quote-icon");

    if (quote) {
      gsap.to(quote, {
        x: px * 15,
        y: py * 15,
        rotate: px * 8,
        scale: 1.15,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  /* --------------------------------
     MOUSE LEAVE
  -------------------------------- */

  const handleLeave = (index) => {
    const card = cardsRef.current[index];

    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    const glow = card.querySelector(".review-glow");

    if (glow) {
      gsap.to(glow, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 1,
        duration: 0.5,
      });
    }

    const quote = card.querySelector(".quote-icon");

    if (quote) {
      gsap.to(quote, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.5,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative overflow-hidden bg-[#f3f3ee] px-5 py-22 text-black md:px-10 md:py-20"
    >
      {/* =====================================
          AMBIENT BACKGROUND
      ====================================== */}

      <div className="review-orb-main pointer-events-none absolute left-[45%] top-[20%] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#baff35]/20 blur-[150px]" />

      <div className="review-orb-small pointer-events-none absolute -right-40 bottom-[5%] h-[350px] w-[350px] rounded-full bg-[#baff35]/10 blur-[120px]" />

      {/* Technical Grid */}
      <div
        className="review-grid pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="relative mx-auto max-w-7xl">
        {/* Eyebrow */}
        <div className="review-eyebrow flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-black">
          <span className="relative h-px w-10 overflow-hidden bg-black/20">
            <span className="reviews-line absolute left-0 top-0 h-full w-full -translate-x-full bg-[#baff35]" />
          </span>

          05 / Showroom Voices
        </div>

        {/* Heading */}
        <div className="mt-12">
          <div className="overflow-hidden">
            <div className="review-title-line">
              <h2 className="text-[clamp(3.8rem,8vw,8.5rem)] font-black leading-[0.8] tracking-[-0.08em]">
                HEARD
              </h2>
            </div>
          </div>

          <div className="mt-1 overflow-hidden">
            <div className="review-title-line">
              <h2 className="text-[clamp(3.8rem,8vw,8.5rem)] font-black leading-[0.8] tracking-[-0.08em] text-black/10">
                FROM THE ROAD.
              </h2>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="review-intro mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-lg text-sm leading-7 text-black/50 md:text-base">
            Real experiences from customers who chose electric mobility for
            their everyday journeys.
          </p>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-black/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#baff35] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#baff35]" />
            </span>

            Customer experiences
          </div>
        </div>

        {/* =====================================
            REVIEW CARDS
        ====================================== */}

        <div className="reviews-grid mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseMove={(e) => handleMove(e, index)}
              onMouseLeave={() => handleLeave(index)}
              className="review-card group relative min-h-[390px] overflow-hidden rounded-[32px] border border-black/10 bg-[#090909] p-7 text-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card Glow */}
              <div className="review-glow pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-[#baff35]/20 opacity-0 blur-[70px]" />

              {/* Animated border */}
              <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-transparent transition duration-500 group-hover:border-[#baff35]/40" />

              {/* Top */}
              <div className="relative flex items-start justify-between">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="transition duration-300 group-hover:scale-125"
                      style={{
                        transitionDelay: `${i * 50}ms`,
                      }}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Floating quote */}
                <Quote
                  size={30}
                  className="quote-icon text-white/10 transition-colors duration-500 group-hover:text-[#baff35]/50"
                />
              </div>

              {/* Review */}
              <p className="relative mt-12 text-lg font-medium leading-8 text-white/80 transition duration-500 group-hover:text-white">
                “{review.review}”
              </p>

              {/* Bottom */}
              <div className="absolute bottom-7 left-7 right-7 border-t border-white/10 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/35">
                      {review.location}
                    </p>

                    <p className="mt-3 truncate text-[10px] uppercase tracking-[0.15em] text-[#baff35]">
                      {review.model}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#baff35] group-hover:bg-[#baff35] group-hover:text-black">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>

              {/* Scan Line */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-[#baff35] to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />

              {/* Bottom Scan */}
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[#baff35] transition-all duration-700 group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* =====================================
            BOTTOM CTA
        ====================================== */}

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/30">
            Your journey could be next
          </p>

          <a
            href="#products"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-black"
          >
            Explore the fleet

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-[#baff35] group-hover:bg-[#baff35]">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}