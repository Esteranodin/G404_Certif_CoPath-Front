import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Provider } from "@/context/Provider";
import { Toaster } from "sonner";
import TestCoAPI from "@/components/TestCoAPI";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CoPath",
  subtitle: "Partagez vos scénarios",
  icons: {
    icon: "/icons/favicon.png",
  },
  description: "Application de partage de scénarios de jeux de rôle",
  keywords: "jeux de rôle, partage, scénarios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} ${roboto.variable} antialiased`}>
        <Provider>
          <Header />
          {children}
          <Footer />
             {/* <TestCoAPI /> */}
          <Toaster position="top-center" richColors duration={6000} />
        </Provider>
      </body>
    </html >
  );
}