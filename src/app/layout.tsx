"use client";

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/newDesign/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = /^\/(login|register|otp|otp\/password|explore\/search)$/.test(pathname);
  const hideNavbarOnMobile = /^\/(messages\/.*|group\/.*|ai\/.*|comments\/.*)$/.test(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className={hideNavbar ? "" : "mb-16 sm:pl-14 md:pl-16 lg:pl-56 sm:mb-0"}>
            {children}
          </div>
          {!hideNavbar && (
            <div className={hideNavbarOnMobile ? "hidden sm:flex" : ""}>
              <Navbar />
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
