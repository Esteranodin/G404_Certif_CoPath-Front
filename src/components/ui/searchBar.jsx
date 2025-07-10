"use client"

import Image from "next/image";
import { cn } from "@/lib/utils/utils";

export default function SearchBar({ 
  className, 
  placeholder = "Entrez un nom de JdR, un thème",
  onSearch = () => {},
  buttonPosition = "right",
}) {
  
    return (
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                const searchValue = e.target.search.value;
                onSearch(searchValue);
            }}
            className={cn("flex gap-2 items-center justify-center mx-auto mt-10", 
                className ?? "w-[80%] lg:w-[50%]"
            )}
        >
            <input
                name="search"
                type="text"
                placeholder={placeholder}
                className="flex-1 ms-8 ps-4 py-2 bg-lavender rounded-full focus-green text-black font-normal"
            />
            {buttonPosition === "right" && (
                <button type="submit" aria-label="Rechercher">
                    <Image 
                        src="/icons/search.svg"
                        alt="Icone de loupe"
                        width={20}
                        height={20}
                        className="ml-2 cursor-pointer hover:scale-110 transition-transform"
                    />
                </button>
            )}
        </form>
    );
}
