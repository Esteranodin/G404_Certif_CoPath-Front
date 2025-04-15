"use client";

import { usePathname } from 'next/navigation';
import SearchBar from '../ui/searchBar';
import { NavBar } from './NavBar';


const Header = () => {

    const pathname = usePathname();
    const hideSearchBar = ["/login", "/register", "/dashboard"];
    const shouldShowSearchBar = !hideSearchBar.some(path => pathname === path || pathname.startsWith(path));

    return (
        <header>
            <NavBar />
            {shouldShowSearchBar && (
                <SearchBar />
            )}
        </header>   
    );
}

export default Header;