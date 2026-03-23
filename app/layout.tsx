import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tutienda.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TuTienda | Tecnología Gaming en Argentina",
    template: "%s | TuTienda",
  },
  description:
    "La mejor tienda online de tecnología gaming en Argentina. Monitores, teclados, mouse, auriculares y sillas gamer con envío a todo el país.",
  keywords: [
    "gaming",
    "tecnología",
    "argentina",
    "monitor",
    "teclado mecánico",
    "mouse gamer",
    "auriculares",
    "silla gamer",
    "tienda online",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "TuTienda",
    title: "TuTienda | Tecnología Gaming en Argentina",
    description:
      "La mejor tienda online de tecnología gaming en Argentina. Envíos a todo el país.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TuTienda Gaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TuTienda | Tecnología Gaming en Argentina",
    description:
      "La mejor tienda online de tecnología gaming en Argentina.",
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
