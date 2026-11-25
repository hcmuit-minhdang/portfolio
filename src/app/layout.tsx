import type { Metadata } from "next";
import { Be_Vietnam_Pro, Phudu } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkyBackground } from "@/components/sky-background";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";
import "./motion.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
});

const phudu = Phudu({
  variable: "--font-phudu",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${beVietnam.variable} ${phudu.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <ThemeProvider>
          <LanguageProvider>
            <MotionProvider>
              <SkyBackground />
              <SiteHeader />
              <div className="relative z-10 flex flex-1 flex-col">
                {children}
                <SiteFooter />
              </div>
            </MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
