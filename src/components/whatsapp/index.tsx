import styles from './styles.module.css';
import { FaWhatsapp } from 'react-icons/fa6';

const WhatsAppButton = () => {
    const phoneNumber = '+390736654770';
    const message = 'Bună ziua! Aș dori să vă contactez în legătură cu magazinul dumneavoastră românesc RoMarket';

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className={styles.button}
            aria-label="Contact us on WhatsApp"
        >
            <FaWhatsapp/>
            {/* <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg> */}
        </button>
    );
};

export default WhatsAppButton;