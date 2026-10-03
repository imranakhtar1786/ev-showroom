"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let frame;

    const update = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}