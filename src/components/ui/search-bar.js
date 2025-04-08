import Image from "next/image";

export default function SearchBar() {

    return (

        <form className="flex gap-2 w-[80%] items-center justify-center mx-auto my-6">
            <input
                type="text"
                placeholder="Entrez un nom de JdR, un thème"
                className="flex-1 ps-4 py-2 bg-lavender rounded-full focus-green "
            />
            <Image 
            src="/icons/search.svg"
            alt="Icone de loupe"
            width={20}
            height={20}
            className="ml-2 cursor-pointer"
            />
        </form>

    );
}
