import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

// Stand-in for GT Sectra (not available on Google Fonts). Swap for the
// licensed GT Sectra font files when available.
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://substratestudio.com"), // placeholder — Diego will update
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    // Placeholder — Diego will supply the final Open Graph image.
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="overflow-x-hidden bg-background text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
