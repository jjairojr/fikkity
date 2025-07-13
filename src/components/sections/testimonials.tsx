"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "Arte pura na pele! Profissionalismo incrível",
    author: "Marina S.",
  },
  {
    text: "Melhor tatuadora que já conheci, resultado perfeito",
    author: "Carlos R.",
  },
  {
    text: "Cada traço é uma obra de arte, recomendo demais!",
    author: "Ana L.",
  },
];

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 px-8 border-t border-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            DEPOIMENTOS
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto"></div>
        </div>

        <div className="relative h-32 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 flex flex-col justify-center ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <blockquote className="text-lg text-gray-300 mb-4 font-light italic">
                {`"${testimonial.text}"`}
              </blockquote>
              <cite className="text-sm text-red-500 font-mono tracking-[2px] uppercase">
                — {testimonial.author}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
