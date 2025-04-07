import { Playfair_Display, Roboto} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "CoPath",
  subtitle: "Partagez vos scénarios",
  description: "Application de partage de scénarios de jeux de rôle",
  keywords: "jeux de rôle, partage, scénarios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
