import styles from './styles.module.css';
import logoImage from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import {
    FaFacebook,
    FaChevronUp
} from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={styles.section}>
                <div className={styles.socialContainer}>
                    <div className={styles.logoContainer}>
                        <img src={logoImage} alt="RoMarket" />
                        <span>RoMarket</span>
                    </div>
                    <p>
                        RoMarket este magazinul românesc din Ascoli unde se retrăiește tradiția românească.
                    </p>
                    <div className={styles.iconsContainer}>
                        <a href="https://www.facebook.com/p/ROMarket-magazin-rom%C3%A2nesc-100049265558768/">
                            <FaFacebook />
                        </a>
                    </div>
                    <span className={styles.copyright}>
                        Copyright 2025 © RoMarket. All rights reserved.
                    </span>
                </div>
                <div className={styles.newsletterContainer}>
                    <p>Abonează-te la newsletter</p>
                    <form>
                        <input type="email" placeholder="Introdu adresa ta de email" />
                    </form>
                    <span>
                        Prin abonarea la newsletter, ești de acord cu <Link to='/privacy-policy' className={styles.privacyPolicyLink}>Politica de confidențialitate</Link>
                    </span>
                    <button>Abonare</button>
                </div>
                <div className={styles.contactUsContainer}>
                    <p className={styles.contactUsText}>Contact</p>
                    <div className={styles.contactContainer}>
                        <p>RoMarket</p>
                        <p>Ascoli Piceno</p>
                        <p>Provincia Ascoli Piceno, Italia, 63100</p>
                        <p>
                            <a href="tel:+39 0736 654770" className={styles.phoneLink}>+39 0736 654770</a>
                        </p>
                        <p>
                            <a href="mailto:contact@ziberline.ro" className={styles.emailLink}>
                                contact@romarket.ro
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            <a href="#categories" className={styles.scrollUpButton}>
                <div />
                <FaChevronUp />
                <span>Ce oferim?</span>
            </a>
        </footer>
    )
}

export default Footer;