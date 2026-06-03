import type { Metadata } from "next";
import { Moul, Kantumruy_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

const moul = Moul({
  weight: "400",
  subsets: ["khmer"],
  variable: "--font-moul",
  display: "swap",
});

const kantumruy = Kantumruy_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["khmer"],
  variable: "--font-kantumruy",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "សិរីសួស្ដីអាពាហ៍ពិពាហ៍ - ពិធីមង្គលការ",
  description: "សំបុត្រអញ្ជើញអាពាហ៍ពិពាហ៍ អបអរសាទរគូស្វាមីភរិយាថ្មី សុខ វឌ្ឍនា & ចាន់ ស្រីនាថ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="km"
      className={`${kantumruy.variable} ${moul.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
