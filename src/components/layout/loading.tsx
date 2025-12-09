"use client";

import { useEffect, useState } from "react";

export function Loading() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-all duration-500 ${isLoaded ? "opacity-0 invisible" : "opacity-100 visible"}`}
    >
      <div className="font-mono text-sm tracking-[3px] text-red-500 animate-pulse">
        INICIALIZANDO...
      </div>
    </div>
  );
}
