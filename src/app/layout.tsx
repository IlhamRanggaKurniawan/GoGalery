"use client";

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/components/newDesign/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = /^\/(login|register|explore\/search)$/.test(pathname);
  const hideNavbarOnMobile = /^\/(messages\/.*|ai\/.*|content\/.*|notifications)$/.test(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-4">
              {children}
            </div>
            {!hideNavbar && (
              <div className={hideNavbarOnMobile ? "hidden sm:flex" : ""}>
                <Navbar />
              </div>
            )}
          </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
