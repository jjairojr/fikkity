"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const portfolioImageDetails = [
  {
    src: "/portfolio-1.png",
    alt: "Tatuagem blackwork dragão fechamento de costas - FIKKITY tattoo Goiânia",
    style: "Blackwork",
  },
  {
    src: "/portfolio-2.png",
    alt: "Tatuagem blackwork fulldog fechamento peito - FIKKITY Curitiba",
    style: "Fine Line",
  },
  {
    src: "/portfolio-3.png",
    alt: "Tatuagem blackwork fineline medusa fechamento braço - FIKKITY São Paulo",
    style: "Oriental",
  },
  {
    src: "/portfolio-4.png",
    alt: "Tatuagem blackwork oriental na perna - FIKKITY tattoo",
    style: "Blackwork",
  },
  {
    src: "/portfolio-5.png",
    alt: "Tatuagem fine line blackwork dragão fechamento - FIKKITY especialista",
    style: "Fine Line",
  },
  {
    src: "/portfolio-6.png",
    alt: "Tatuagem oriental dragão oriental fechamento braço - FIKKITY tattoo artist",
    style: "Oriental",
  },
  {
    src: "/portfolio-7.png",
    alt: "Tatuagem blackwork oriental detalhada - FIKKITY Goiânia",
    style: "Blackwork",
  },
];

export function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioImageDetails.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioImageDetails.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? portfolioImageDetails.length - 1 : prev - 1,
    );
  };

  return (
    <section className="py-20 px-8" aria-label="Portfólio de tatuagens FIKKITY">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            TRABALHOS RECENTES
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-mono text-sm tracking-[1px]">
            Confira alguns dos trabalhos mais recentes em Blackwork, Fine Line e
            Oriental
          </p>
        </header>

        <div className="relative aspect-[4/5] md:aspect-[21/9] overflow-hidden">
          {portfolioImageDetails.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          ))}

          <button
            onClick={prevSlide}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-gray-700 hover:border-red-500 bg-black/80 backdrop-blur-sm hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center group"
          >
            <span className="text-gray-400 group-hover:text-red-500 font-mono text-lg transition-colors duration-300">
              ‹
            </span>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Próxima imagem"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 border border-gray-700 hover:border-red-500 bg-black/80 backdrop-blur-sm hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center group"
          >
            <span className="text-gray-400 group-hover:text-red-500 font-mono text-lg transition-colors duration-300">
              ›
            </span>
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
            {portfolioImageDetails.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Ver imagem ${index + 1}`}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-red-500 scale-125"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <span className="text-gray-500 font-mono text-xs tracking-[2px]">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(portfolioImageDetails.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
