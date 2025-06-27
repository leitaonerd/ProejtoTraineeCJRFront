import type { AppProps } from 'next/app';
import { Inter, Questrial } from "next/font/google";
import '../styles/globals.css';
import { Metadata } from 'next';
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${questrial.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
