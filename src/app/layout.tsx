"use client";

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/myComponents/Navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session;
}>) {
  const pathname = usePathname();

  const hideNavbar = /^\/(login|register)$/.test(pathname);
  const hideNavbarOnMobile = /^\/(group\/.*|messages\/.*)$/.test(pathname);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            {!hideNavbar && (
              <div className={hideNavbarOnMobile ? "hidden sm:flex" : ""}>
                <Navbar />
              </div>
            )}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
