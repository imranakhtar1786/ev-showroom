"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    let lenis;
    let raf;

    // ==========================================
    // MOBILE
    // ==========================================
    if (isMobile) {
      // Let the browser handle touch scrolling.
      // This is generally smoother and more battery efficient.
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      });

      // Refresh after images/layout have settled.
      const refresh = () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      };

      window.addEventListener("load", refresh);

      const timeout = setTimeout(refresh, 500);

      return () => {
        window.removeEventListener("load", refresh);
        clearTimeout(timeout);
      };
    }

    // ==========================================
    // DESKTOP LENIS
    // ==========================================
    lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      syncTouch: false,
      autoRaf: false,
    });

    // Keep ScrollTrigger synchronized with Lenis.
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Prevent large frame jumps.
    gsap.ticker.lagSmoothing(1000, 16);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);

      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return null;
}