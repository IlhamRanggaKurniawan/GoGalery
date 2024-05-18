"use client"

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/myComponents/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname()

  const hideNavbar = pathname === "/login" || pathname === "/register"

  return (
    <html lang="en">
      <body className={inter.className}>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            {!hideNavbar && <Navbar />}
          </ThemeProvider>

      </body>
    </html>
  );
}
