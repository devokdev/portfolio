import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import InteractiveGrid from "@/components/InteractiveGrid";
import LiquidyCursor from "@/components/LiquidyCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kartavya Dev | Product Engineer & AI Builder",
  description: "Portfolio of Kartavya Dev - B.Tech Data Science & AI. Custom-crafted, premium editorial portfolio highlighting AI systems, agricultural co-pilots, and codebase intelligence engines.",
  keywords: ["Kartavya Dev", "AI Engineer", "Product Engineer", "Full Stack Developer", "Machine Learning", "FastAPI", "React", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden selection:bg-zinc-800 selection:text-white dark:selection:bg-zinc-200 dark:selection:text-black">
        <ThemeProvider>
          <SmoothScroll>
            {/* Seamless architectural interactive grid lines, custom cursor & film grain noise */}
            <InteractiveGrid />
            <LiquidyCursor />
            <div className="bg-noise-overlay" />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
