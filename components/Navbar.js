import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/disney-logo.png';

const Navbar = ({account}) => {
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
            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url} alt="Avatar" />
            </div>
        </div>
    )
}

export default Navbar;