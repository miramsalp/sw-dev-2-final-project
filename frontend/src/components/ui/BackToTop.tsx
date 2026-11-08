"use client";

import { useEffect, useState } from "react";

/** Grey round button (bottom-right) that appears after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollUp}
      className={`fixed right-6 bottom-12 flex size-18 cursor-pointer items-center justify-center rounded-full bg-[#d9d9d9] text-3xl text-black transition-opacity hover:bg-[#c8c8c8] ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
