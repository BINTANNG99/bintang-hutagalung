import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import NoiseBackground from "@/components/NoiseBackground";

export const metadata: Metadata = {
  title: "Bintang Hutagalung -- ML Engineer & Data Scientist",
  description:
    "Portfolio of Bintang Hutagalung, Machine Learning Engineer & Data Scientist. 3+ years building and deploying AI models.",
  openGraph: {
    title: "Bintang Hutagalung -- ML Engineer & Data Scientist",
    description: "Portfolio of Bintang Hutagalung, ML Engineer & Data Scientist.",
    images: ["/profil.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <NoiseBackground />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
