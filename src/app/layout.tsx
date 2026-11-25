import type { Metadata } from "next";
import { Be_Vietnam_Pro, Phudu } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
      lang="vi"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${beVietnam.variable} ${phudu.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#noi-dung"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-ink"
            >
              Bỏ qua điều hướng
            </a>
            <SiteHeader />
            {children}
            <SiteFooter />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
