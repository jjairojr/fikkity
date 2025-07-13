import Link from "next/link";
import Image from "next/image";
import { InkDrip } from "../ui/inkdrip";
import { InstagramIcon } from "../ui/icons/Instagram";
import { WhatsAppIcon } from "../ui/icons/WhatsApp";
import { BUSINESS_INFO } from "@/lib/seo-config";

export function HeroSection() {
  const whatsappMessage = encodeURIComponent(
    "Olá! Vi seu site e gostaria de agendar uma sessão de tatuagem. Podemos conversar?",
  );

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-8"
      aria-label={`Apresentação da tatuadora ${BUSINESS_INFO.name}`}
    >
      <header className="text-center max-w-md mx-auto">
        <div className="w-32 h-32 mx-auto mb-12 relative animate-float">
          <InkDrip delay={0} />
          <InkDrip delay={1} />
          <InkDrip delay={2} />

          <div className="absolute inset-0 border border-red-500/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border border-red-500/20 rounded-full animate-spin-reverse" />

          <div className="w-full h-full relative z-10 flex items-center justify-center">
            <Image
              src="/sm-logo.png"
              alt={`${BUSINESS_INFO.name} - Logo da tatuadora especialista em ${BUSINESS_INFO.specialties.join(", ")}`}
              width={120}
              height={120}
              className="object-contain filter drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              priority
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-thin tracking-[8px] md:tracking-[12px] mb-4 font-mono relative opacity-0 animate-slide-in-delayed">
          <span className="relative">
            {BUSINESS_INFO.name}
            <div className="absolute -left-6 top-1/2 w-4 h-px bg-red-500 animate-line-grow" />
            <div className="absolute -right-6 top-1/2 w-4 h-px bg-red-500 animate-line-grow-delayed" />
          </span>
        </h1>

        <p className="text-xs tracking-[3px] text-gray-500 uppercase mb-4 relative opacity-0 animate-fade-in-delayed">
          Tatuadora Profissional
        </p>

        <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed opacity-0 animate-fade-in-delayed font-light">
          Arte que marca sua pele,
          <br />
          histórias que marcam
          <span className="text-red-500/80 text-md underline font-semibold ml-1">
            sua alma
          </span>
        </p>

        <div className="flex justify-center gap-8 mb-16 opacity-0 animate-fade-in-delayed-2">
          <div className="text-center">
            <div className="text-2xl font-mono text-red-500 mb-1">
              {BUSINESS_INFO.stats.tattoos}
            </div>
            <div className="text-xs text-gray-500 tracking-wider uppercase">
              Tatuagens
            </div>
          </div>
          <div className="w-px h-12 bg-gray-800"></div>
          <div className="text-center">
            <div className="text-2xl font-mono text-red-500 mb-1">
              {BUSINESS_INFO.stats.years}
            </div>
            <div className="text-xs text-gray-500 tracking-wider uppercase">
              Anos
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-12 mb-16 opacity-0 animate-fade-in-delayed-2">
          <Link
            href={BUSINESS_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
            aria-label={`Ver portfólio no Instagram da ${BUSINESS_INFO.name}`}
          >
            <div className="group w-16 h-16 border border-gray-800 rounded-full flex items-center justify-center mb-2 relative overflow-hidden bg-black/20 backdrop-blur-sm transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:-translate-y-1">
              <div className="absolute inset-0 bg-conic-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" />
              <span className="relative z-10 text-sm font-light group-hover:text-red-500 transition-colors">
                <InstagramIcon
                  size={24}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </span>
            </div>
            <span className="text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
              Instagram
            </span>
          </Link>

          <Link
            href={`${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
            aria-label={`Entrar em contato via WhatsApp com a tatuadora ${BUSINESS_INFO.name}`}
          >
            <div className="w-16 h-16 border border-gray-800 rounded-full flex items-center justify-center mb-2 relative overflow-hidden bg-black/20 backdrop-blur-sm transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:-translate-y-1">
              <div className="group absolute inset-0 bg-conic-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" />
              <span className="relative z-10 text-sm font-light group-hover:text-red-500 transition-colors">
                <WhatsAppIcon
                  size={24}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </span>
            </div>
            <span className="text-xs tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
              WhatsApp
            </span>
          </Link>
        </div>

        <nav
          className="flex flex-col gap-6 opacity-0 animate-fade-in-delayed-3"
          aria-label="Navegação principal"
        >
          <Link
            href="/schedule"
            className="group relative px-12 py-4 border border-red-500 bg-black/20 backdrop-blur-sm text-red-500 text-xs tracking-[2px] uppercase font-mono transition-all duration-300 hover:bg-red-500/10 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:-translate-y-1 overflow-hidden"
            aria-label={`Agendar sessão de tatuagem com ${BUSINESS_INFO.name}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Agendar Sessão</span>
          </Link>

          <Link
            href="#portfolio"
            className="group relative px-12 py-4 border border-gray-800 bg-black/20 backdrop-blur-sm text-white text-xs tracking-[2px] uppercase font-mono transition-all duration-300 hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:-translate-y-1 overflow-hidden"
            aria-label={`Ver portfólio de tatuagens da ${BUSINESS_INFO.name}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Ver Portfólio</span>
          </Link>
        </nav>
      </header>
    </section>
  );
}
