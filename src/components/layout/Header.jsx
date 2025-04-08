import logo from '@/../public/img/copath.png';
import user from '@/../public/icons/user.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import SearchBar from '../ui/search-bar';


const Header = () => {
    return (
        <section>
            <nav className='bg-logo flex justify-between p-4 items-start'>
                <Link href="/" className='self-center'>
                    <Image src={logo} alt="Logo de Copath" width={150} />
                </Link>
                <div className='flex gap-6 items-center self-center'>
                    <Button variant={"home"} size={"default"} className='button-home'>
                        <Link href="/register">S'inscrire</Link>
                    </Button>

                    <Link href="/login">
                        <Image src={user} alt="icone utilisateur" width={35} />
                    </Link>
                </div>
            </nav>

            <SearchBar />
        </section>
    );
}

export default Header;