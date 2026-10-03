"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import SmoothScroll from "./SmoothScroll";

const menuItems = [
  {
    name: "Products",
    href: "#products",
  },
  {
    name: "Technology",
    href: "#technology",
  },
  {
    name: "Charging",
    href: "#charging",
  },
  {
    name: "Impact",
    href: "#impact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SmoothScroll />

      {/* NAVBAR */}
      <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/50 px-5 py-3 backdrop-blur-xl">

          {/* LOGO */}
          <a
            href="#"
            onClick={closeMenu}
            className="relative z-[70] text-xl font-black tracking-[-0.07em]"
          >
            VOLT<span className="text-[#baff35]">URA</span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.25em] text-white/50 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* DESKTOP BUTTON */}
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{color:"black"}}
              className="hidden items-center gap-2 rounded-full bg-[#baff35] px-5 py-2.5 text-[10px] font-bold text-black md:flex"
            >
              EXPLORE
              <ArrowUpRight size={14} />
            </motion.a>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="relative z-[70] grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#baff35] hover:text-[#baff35] md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />

            {/* SIDEBAR */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col border-l border-white/10 bg-[#080808] px-7 pb-8 pt-28 shadow-2xl md:hidden"
            >
              {/* GREEN GLOW */}
              <div className="pointer-events-none absolute right-[-100px] top-[20%] h-72 w-72 rounded-full bg-[#baff35]/10 blur-[100px]" />

              {/* MENU LABEL */}
              <div className="relative mb-10">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#baff35]">
                  Navigation
                </p>

                <div className="mt-3 h-px w-full bg-white/10" />
              </div>

              {/* LINKS */}
              <div className="relative flex flex-col">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    initial={{
                      x: 40,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.08 * index,
                    }}
                    className="group flex items-center justify-between border-b border-white/10 py-6"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-mono text-[9px] text-white/20">
                        0{index + 1}
                      </span>

                      <span className="text-2xl font-bold tracking-[-0.04em] text-white transition group-hover:text-[#baff35]">
                        {item.name}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={18}
                      className="text-white/30 transition group-hover:rotate-45 group-hover:text-[#baff35]"
                    />
                  </motion.a>
                ))}
              </div>

              {/* BOTTOM CTA */}
              <div className="relative mt-auto">
                <a
                  href="#products"
                  onClick={closeMenu}
                  style={{color:"black"}}
                  className="flex w-full items-center justify-between rounded-full bg-[#baff35] px-6 py-4 text-xs font-bold text-black"
                >
                  EXPLORE VEHICLES

                  <ArrowUpRight size={17} />
                </a>

                <p className="mt-5 text-center text-[8px] uppercase tracking-[0.3em] text-white/25">
                  Electric Mobility / Energy Systems
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}