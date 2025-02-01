import styles from "./styles.module.css";
import {
    useState,
    useEffect
} from "react";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.container}>
            <h3>Acest site web folosește cookie-uri</h3>
            <p>
                Acest site web folosește cookie-uri pentru a îmbunătăți experiența utilizatorului.
                Prin utilizarea site-ului nostru web, sunteți de acord cu toate cookie-urile în conformitate cu Politica noastră privind cookie-urile.
                <a href="/privacy-policy">Află mai multe</a>
            </p>
            <div className={styles.buttonsContainer}>
                <button onClick={handleAccept}>Acceptă toate</button>
                <button onClick={handleDecline}>Refuză toate</button>
            </div>
        </div >
    );
};

export default CookieConsent;
