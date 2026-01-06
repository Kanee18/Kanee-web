import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";
import { LoadingProvider } from "@/components/providers/LoadingProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Endfield Inspired Portfolio",
  description: "A futuristic portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground`}>
        <LoadingProvider>
          <Preloader />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
