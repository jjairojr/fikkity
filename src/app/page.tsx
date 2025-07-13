import { Metadata } from "next";
import { Loading } from "@/components/layout/loading";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Specialties } from "@/components/sections/specialties";
import { Location } from "@/components/sections/location";
import { HeroSection } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "Home | FIKKITY",
  description:
    "Confira o portfólio da tatuadora FIKKITY e agende sua sessão. Especialista em Blackwork, Fine Line e Oriental com mais de 200 tatuagens realizadas.",
  keywords: [
    "tatuadora goiania",
    "tatuagem curitiba",
    "tattoo sao paulo",
    "blackwork",
    "fine line",
    "tatuagem oriental",
    "estudio tatuagem",
    "fikkity tattoo",
  ],
  openGraph: {
    title: "FIKKITY - Arte que marca sua alma",
    description:
      "Especialista em Blackwork, Fine Line e Oriental. Confira meu portfólio e agende sua tatuagem em ambiente seguro e profissional.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Portfólio de tatuagens FIKKITY - Blackwork, Fine Line e Oriental",
      },
    ],
  },
  other: {
    "geo.region": "BR-GO, BR-PR, BR-SP",
    "geo.placename": "Goiânia, Curitiba, São Paulo",
  },
};

const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FIKKITY - Tatuadora",
  description:
    "Tatuadora especializada em Blackwork, Fine Line e Oriental em Goiânia, Curitiba e São Paulo",
  url: "https://fikkity.com.br",
  telephone: "+5562999999999",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Liv Art Studio",
      addressLocality: "Goiânia",
      addressRegion: "GO",
      postalCode: "74000-000",
      addressCountry: "BR",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Liv Art Studio",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      postalCode: "80000-000",
      addressCountry: "BR",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Liv Art Studio",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01000-000",
      addressCountry: "BR",
    },
  ],
  sameAs: ["https://instagram.com/fikkity.tattoo"],
  openingHours: "Mo-Sa 09:00-18:00",
  priceRange: "$$",
};

export default function HomePage() {
  return (
    <>
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BUSINESS_SCHEMA),
        }}
      />

      <Loading />

      <div className="relative z-10 min-h-screen">
        <HeroSection />
        <Portfolio />
        <Specialties />
        <Testimonials />
        <Location />
      </div>
    </>
  );
}
