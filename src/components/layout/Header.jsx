import logo from '@/../public/img/copath.png';
import user from '@/../public/icons/user.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';


const Header = () => {
    return (
        <section>
            <nav className='bg-header flex justify-between items-center p-4'>
                <Link href="/">
                    <Image src={logo} alt="Logo" width={150} />
                </Link>

                <Button variant={"default"} size={"sm"} className='button-register'>
                    <Link href="/register">S'inscrire</Link>
                </Button>

                <Link href="/login">
                    <Image src={user} alt="icone utilisateur" width={35} />
                </Link>
            </nav>
        </section>
    );
}

export default Header;