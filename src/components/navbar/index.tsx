import styles from './styles.module.css';
import logoImage from '../../assets/images/logo.png';
import {
    FaBars,
    FaTimes
} from 'react-icons/fa';
import {
    useState,
    useEffect
} from 'react';
import {
    Link,
    useLocation,
    useNavigate
} from 'react-router-dom';

const links = [
    { name: "Prezentare", url: "#presentation" },
    { name: "Despre noi", url: "#about-us" },
    { name: "Categorii", url: "#categories" },
    { name: "Întrebari frecvente", url: "#faq" }
];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const handleLinkButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, url: string) => {
        e.preventDefault();

        setIsOpen(false);

        const isHome = location.pathname === "/";

        if (!isHome) {
            navigate('/');
            setTimeout(() => {
                const element = document.querySelector(url);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        else {
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    const handleContactButtonClick = () => {
        setIsOpen(false);
    }

    const handleHambugerButtonClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <Link to='/' className={styles.logoLink}>
                    <img src={logoImage} alt="RoMarket" />
                    <span>RoMarket</span>
                </Link>
                <ul className={`${styles.linksContainer} ${isOpen ? styles.active : ''}`}>
                    {links.map((link, index) => (
                        <li key={index}>
                            <button
                                onClick={(e) => handleLinkButtonClick(e, link.url)}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={`${styles.actionsContainer} ${isOpen ? styles.active : ''}`}>
                    <Link
                        to='/contact'
                        className={styles.contactLink}
                        onClick={handleContactButtonClick}
                    >
                        Contactează-ne
                    </Link>
                </div>
                <button
                    className={styles.hamburger}
                    onClick={handleHambugerButtonClick}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </nav>
        </header >
    );
};

export default Navbar;