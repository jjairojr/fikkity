import "./globals.css";
import { Inter } from "next/font/google";
import { Background } from "@/components/layout/background";
import { Cursor } from "@/components/layout/cursor";
import { FacebookPixel } from "@/components/seo/FacebookPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | FIKKITY Tattoo",
    default: "FIKKITY - Tatuadora Profissional",
  },
  description:
    "Tatuadora especializada em Blackwork, Fine Line e Oriental em Goiânia, Curitiba e São Paulo. Mais de 200 tatuagens realizadas em ambiente seguro e profissional.",
  keywords: [
    "tatuadora goiania",
    "tatuagem curitiba",
    "tattoo sao paulo",
    "blackwork",
    "fine line",
    "tatuagem oriental",
  ],
  authors: [{ name: "FIKKITY" }],
  creator: "FIKKITY",
  publisher: "FIKKITY",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://fikkitytattoo.com.br",
    siteName: "FIKKITY Tattoo",
    title: "FIKKITY - Tatuadora Profissional",
    description:
      "Especialista em Blackwork, Fine Line e Oriental. Confira meu portfólio e agende sua tatuagem em ambiente seguro.",
    images: [
      {
        url: "https://www.fikkitytattoo.com.br/og-default.png",
        width: 1200,
        height: 630,
        alt: "FIKKITY - Tatuadora especialista em Blackwork, Fine Line e Oriental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIKKITY - Tatuadora Profissional",
    description: "Especialista em Blackwork, Fine Line e Oriental",
    images: ["https://www.fikkitytattoo.com.br/og-default.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Background />
        <Cursor />

        {children}
        <FacebookPixel />
      </body>
    </html>
  );
}
