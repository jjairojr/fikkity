"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        }
        if (cursorDotRef.current) {
          cursorDotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 border border-red-500/50 rounded-full pointer-events-none z-50 mix-blend-difference will-change-transform"
        style={{ transform: "translate3d(-10px, -10px, 0)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-red-500 rounded-full pointer-events-none z-50 will-change-transform"
        style={{ transform: "translate3d(-2px, -2px, 0)" }}
      />
    </>
  );
}
