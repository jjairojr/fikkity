import { MapPinned, Clock, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/seo-config";

const LOCATIONS_DATA = [
  {
    city: "Goiânia",
    state: "GO",
    region: "Centro-Oeste",
    studio: "Liv Art Studio - Goiânia",
    address: "Av. Transbrasiliana, Quadra 200 - Lote 27 - Setor Pedro Ludovico",
    postalCode: "74000-000",
    phone: "(62) 99637-1308",
    coordinates: { lat: "-16.6869", lng: "-49.2648" },
    neighborhoods: ["Centro", "Setor Bueno", "Setor Oeste"],
  },
  {
    city: "Curitiba",
    state: "PR",
    region: "Sul",
    studio: "Liv Art Studio - Curitiba",
    address: "R. Brg. Franco, 419 - Mercês",
    postalCode: "80000-000",
    phone: "(41) 98531-7771",
    coordinates: { lat: "-25.4284", lng: "-49.2733" },
    neighborhoods: ["Centro", "Batel", "Água Verde"],
  },
  {
    city: "São Paulo",
    state: "SP",
    region: "Sudeste",
    studio: "Liv Art Studio - São Paulo",
    address:
      "Edifício E Office Berrini – Av. Eng. Luis Carlos Berrini, 1748 Sala 808 – Brooklin",
    postalCode: "01000-000",
    phone: "(62) 99637-1308",
    coordinates: { lat: "-23.5505", lng: "-46.6333" },
    neighborhoods: ["Brooklin", "Pinheiros", "Itaim Bibi"],
  },
];

export function Location() {
  const locationsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.fullName,
    url: "https://fikkity.com.br",
    logo: "https://fikkity.com.br/logo.png",
    contactPoint: LOCATIONS_DATA.map((location) => ({
      "@type": "ContactPoint",
      telephone: location.phone,
      contactType: "customer service",
      areaServed: `${location.city}, ${location.state}`,
      availableLanguage: "Portuguese",
    })),
    location: LOCATIONS_DATA.map((location) => ({
      "@type": "Place",
      name: location.studio,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.address,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.postalCode,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      },
      telephone: location.phone,
    })),
  };

  return (
    <section
      className="py-20 px-8 border-t border-gray-900"
      aria-label={`Localização dos atendimentos da ${BUSINESS_INFO.name}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-thin tracking-[6px] font-mono mb-4 text-white">
            LOCALIZAÇÃO
          </h2>
          <div className="w-20 h-px bg-red-500 mx-auto mb-8"></div>
          <p className="text-gray-400 text-sm">
            Atendimento em três cidades com ambiente seguro e profissional
          </p>
        </header>

        {/* Grid de localizações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {LOCATIONS_DATA.map((location) => (
            <article
              key={location.city}
              className="text-center group border border-gray-800 rounded-lg p-6 hover:border-red-500 transition-all duration-300"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <div className="w-16 h-16 mx-auto mb-4 border border-gray-700 rounded-full flex items-center justify-center group-hover:border-red-500 transition-colors">
                <MapPinned size={24} className="text-red-500" />
              </div>

              <h3
                className="text-lg font-mono tracking-wider text-white mb-2"
                itemProp="name"
              >
                {location.city}
              </h3>

              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <p className="text-sm text-gray-400 mb-1" itemProp="name">
                  {location.studio}
                </p>
                <p className="text-xs text-gray-500" itemProp="streetAddress">
                  {location.address}
                </p>
                <span className="sr-only" itemProp="addressLocality">
                  {location.city}
                </span>
                <span className="sr-only" itemProp="addressRegion">
                  {location.state}
                </span>
                <span className="sr-only" itemProp="postalCode">
                  {location.postalCode}
                </span>
                <span className="sr-only" itemProp="addressCountry">
                  BR
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Phone size={14} className="mr-2" />
                  <span itemProp="telephone">{location.phone}</span>
                </div>

                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Clock size={14} className="mr-2" />
                  <span>Seg-Sáb: 10h-18h</span>
                </div>
              </div>

              {/* Bairros atendidos (SEO local) */}
              <div className="mt-4">
                <p className="text-xs text-gray-600 mb-1">Atendemos:</p>
                <p className="text-xs text-gray-500">
                  {location.neighborhoods.join(" • ")}
                </p>
              </div>

              {/* Coordenadas para SEO */}
              <div
                className="sr-only"
                itemProp="geo"
                itemScope
                itemType="https://schema.org/GeoCoordinates"
              >
                <span itemProp="latitude">{location.coordinates.lat}</span>
                <span itemProp="longitude">{location.coordinates.lng}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Informações gerais */}
        <div className="text-center space-y-4 text-gray-400">
          <p className="text-sm font-mono tracking-wider">
            <MapPinned size={16} className="inline mr-2 text-red-500" />
            Ambiente Seguro e Profissional
          </p>

          <p className="text-xs text-gray-500">
            Atendimento com agendamento prévio • Equipamentos esterilizados •
            Materiais descartáveis
          </p>

          {/* Keywords para SEO local */}
          <div className="sr-only">
            tatuadora goiania, tatuagem curitiba, tattoo sao paulo, estudio
            tatuagem goias, tatuadora parana, tatuagem sp, blackwork goiania,
            fine line curitiba, oriental sao paulo
          </div>
        </div>
      </div>
    </section>
  );
}
