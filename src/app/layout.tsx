import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Shippori_Mincho_B1, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const shippori = Shippori_Mincho_B1({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-shippori",
  display: "swap",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.megumidesign.net"),
  title: {
    default: "Megumi Design — Furniture & Interior Craftsmanship",
    template: "%s | Megumi Design",
  },
  description:
    "Megumi Design — furniture and cabinetry design crafted for human and pet-friendly living. Batu Pahat, Johor, Malaysia.",
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  openGraph: {
    title: "Megumi Design",
    description:
      "Furniture and cabinetry design crafted for human and pet-friendly living.",
    siteName: "Megumi Design",
    locale: "en_MY",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0908",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${shippori.variable} ${noto.variable}`}
    >
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
