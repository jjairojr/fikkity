import { BUSINESS_INFO } from "@/lib/seo-config";

const SPECIALTIES_DATA = [
  {
    name: "Blackwork",
    description:
      "Tatuagens em preto sólido com contrastes marcantes e designs geométricos.",
    keywords: ["blackwork", "tatuagem preta", "aesthetic", "cyber tribal"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="12" cy="12" r="6" fill="currentColor" />
        <circle cx="12" cy="12" r="2" fill="black" />
      </svg>
    ),
  },
  {
    name: "Fine Line",
    description:
      "Traços delicados e precisos para tatuagens minimalistas e elegantes. Perfeito para designs sutis e femininos.",
    keywords: ["fine line", "tatuagem delicada", "minimalista", "feminina"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.5" fill="none">
          <path d="M4 8h16M6 12h12M8 16h8" />
          <circle cx="20" cy="8" r="1" fill="currentColor" />
          <circle cx="18" cy="12" r="1" fill="currentColor" />
          <circle cx="16" cy="16" r="1" fill="currentColor" />
        </g>
      </svg>
    ),
  },
  {
    name: "Oriental",
    description:
      "Arte tradicional oriental com elementos culturais autênticos. Dragões, carpas, flores de cerejeira e símbolos orientais.",
    keywords: ["tatuagem oriental", "dragao", "carpa", "flor cerejeira"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" aria-hidden="true">
        <path
          d="M12 3L6 9h12l-6-6zM12 21l6-6H6l6 6z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="2"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
];

export function Specialties() {
  const specialtiesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tattoo Services",
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_INFO.fullName,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Especialidades em Tatuagem",
      itemListElement: SPECIALTIES_DATA.map((specialty, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Tatuagem ${specialty.name}`,
          description: specialty.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <section
      className="py-20 px-8 border-t border-gray-900"
      aria-label={`Especialidades da tatuadora ${BUSINESS_INFO.name}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(specialtiesSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            ESPECIALIDADES
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto"></div>
          <p className="text-gray-400 text-sm mt-4 max-w-2xl mx-auto">
            Conheça os estilos de tatuagem em que a {BUSINESS_INFO.name} é
            especialista
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIALTIES_DATA.map((specialty, index) => (
            <article
              key={specialty.name}
              className="text-center group"
              style={{ animationDelay: `${index * 0.2}s` }}
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="w-20 h-20 mx-auto mb-4 border border-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-black/20 backdrop-blur-sm text-gray-400 group-hover:text-red-500">
                {specialty.icon}
              </div>

              <h3
                className="text-sm tracking-[2px] uppercase font-mono text-gray-400 group-hover:text-red-500 transition-colors mb-2"
                itemProp="name"
              >
                {specialty.name}
              </h3>

              <p
                className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto"
                itemProp="description"
              >
                {specialty.description}
              </p>

              <div className="sr-only">{specialty.keywords.join(", ")}</div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: SPECIALTIES_DATA.map((specialty) => ({
                  "@type": "Question",
                  name: `O que é tatuagem ${specialty.name}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: specialty.description,
                  },
                })),
              }),
            }}
          />
        </div>
      </div>
    </section>
  );
}
