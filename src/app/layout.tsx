import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Aadith C V — Developer & Builder",
  description:
    "Independent developer crafting high-performance mobile applications, modern web platforms, and automated digital tools with Flutter, Next.js, and TypeScript.",
  keywords: [
    "Aadith C V",
    "Portfolio",
    "Mobile Developer",
    "Flutter Developer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Software Engineer",
  ],
  authors: [{ name: "Aadith C V" }],
  creator: "Aadith C V",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aadithcv.dev",
    title: "Aadith C V — Developer & Builder",
    description:
      "Crafting high-performance mobile applications, modern web platforms, and automated digital tools.",
    siteName: "Aadith C V Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadith C V — Developer & Builder",
    description:
      "Independent developer crafting mobile applications, web platforms, and digital tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased bg-[#FFFFFF] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
