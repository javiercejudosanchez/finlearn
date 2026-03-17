import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fredoka } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "FinLearn - Aprende Finanzas",
  description: "Aprende finanzas de forma interactiva, como Duolingo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${jakarta.variable} ${fredoka.variable} font-sans antialiased`}
        style={{ background: "linear-gradient(160deg, #FFF8F0 0%, #FFF3E0 100%)", minHeight: "100vh" }}
      >
        {children}
      </body>
    </html>
  );
}
