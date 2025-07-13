"use client";

import { useEffect, useState } from "react";
import { BUSINESS_INFO } from "@/lib/seo-config";

const testimonials = [
  {
    text: `Arte pura na pele! Profissionalismo incrível da ${BUSINESS_INFO.name}`,
    author: "Marina S.",
    rating: 5,
    location: "Goiânia",
  },
  {
    text: "Melhor tatuadora que já conheci, resultado perfeito no blackwork",
    author: "Carlos R.",
    rating: 5,
    location: "Curitiba",
  },
  {
    text: `Cada traço é uma obra de arte, recomendo demais a ${BUSINESS_INFO.name}!`,
    author: "Ana L.",
    rating: 5,
    location: "São Paulo",
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

  // Schema JSON-LD para reviews
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_INFO.fullName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonials.length.toString(),
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
      },
      author: {
        "@type": "Person",
        name: testimonial.author,
      },
      reviewBody: testimonial.text,
    })),
  };

  return (
    <section
      className="py-20 px-8 border-t border-gray-900"
      aria-label={`Depoimentos de clientes da ${BUSINESS_INFO.name}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <div className="max-w-2xl mx-auto text-center">
        <header className="mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            DEPOIMENTOS
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto"></div>
          <p className="text-gray-400 text-sm mt-4">
            O que nossos clientes falam sobre o trabalho da {BUSINESS_INFO.name}
          </p>
        </header>

        <div className="relative h-40 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 flex flex-col justify-center ${
                index === currentTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex justify-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-red-500 text-lg">
                    ★
                  </span>
                ))}
              </div>

              <blockquote className="text-lg text-gray-300 mb-4 font-light italic">
                {`"${testimonial.text}"`}
              </blockquote>

              <cite className="text-sm text-red-500 font-mono tracking-[2px] uppercase">
                — {testimonial.author}
                <span className="text-gray-500 text-xs block mt-1">
                  {testimonial.location}
                </span>
              </cite>
            </article>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? "bg-red-500" : "bg-gray-600"
              }`}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
