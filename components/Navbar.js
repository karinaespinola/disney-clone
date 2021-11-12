import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/disney-logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link href="/" passHref>
                <Image 
                    src={logo}
                    alt="Disney logo"
                    width={300}
                    height={96}
                />
            </Link>
        </div>
    )
}

export default Navbar;