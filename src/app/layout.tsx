import type { Metadata } from "next";
import { Inter, Questrial } from "next/font/google";
import "@/styles/globals.css";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const questrial = Questrial({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-questrial',
});
export const metadata: Metadata = {
  title: "Avaliação de Professores",
  description: "Avaliação de professores da Universidade de Brasília",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${questrial.variable}`}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>{children}</body>
    </html>
  );
}