import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/logo/copath.png";


export default function Footer() {
  return (
    <footer className="border-t bg-logo">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-evenly space-x-10 md:space-x-4 lg:space-x-8 md:order-2">
          <Link href="/about" className="text-xs md:text-sm text-center md:px-1">
            À propos
          </Link>
          <Link href="/privacy" className="text-xs md:text-sm text-center md:px-1">
            Politique de confidentialité
          </Link>
          <Link href="/terms" className="text-xs md:text-sm text-center md:px-1">
            Conditions d&apos;utilisation
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0 flex flex-col items-center md:items-start">
          <div className="flex justify-center w-full md:justify-start">
            <Image src={logo} alt="Logo de Copath" width={100}/>
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CoPath. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}