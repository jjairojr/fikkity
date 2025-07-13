"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const portfolioImageDetails = [
  {
    src: "/portfolio-1.png",
    alt: "Trabalho 1",
  },
  {
    src: "/portfolio-2.png",
    alt: "Trabalho 2",
  },
  {
    src: "/portfolio-3.png",
    alt: "Trabalho 3",
  },
  {
    src: "/portfolio-4.png",
    alt: "Trabalho 4",
  },
  {
    src: "/portfolio-5.png",
    alt: "Trabalho 5",
  },
  {
    src: "/portfolio-6.png",
    alt: "Trabalho 6",
  },
  {
    src: "/portfolio-7.png",
    alt: "Trabalho 7",
  },
];

export function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioImageDetails.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            TRABALHOS RECENTES
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto"></div>
        </div>

        <div className="relative aspect-[4/5] md:aspect-[21/9] overflow-hiddden">
          {portfolioImageDetails.map((pid, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={pid.src}
                alt={pid.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {portfolioImageDetails.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-red-500" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
