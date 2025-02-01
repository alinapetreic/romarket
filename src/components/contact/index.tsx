import styles from "./styles.module.css";
import { FaArrowDown } from "react-icons/fa6";
import {
    Map,
    Marker
} from "@vis.gl/react-google-maps";

const Contact = () => {
    const lat = 42.8505544;
    const lng = 13.5963255;

    return (
        <div id="contact" className={styles.sectionWrapper}>
            <section className={styles.section}>
                <h2>Ne găsești la locația</h2>
                <p className={styles.locationText}>
                    63100 Ascoli Piceno, Provincia Ascoli Piceno, Italia
                </p>
                <div className={styles.infoContainer}>
                    <p>
                        <a href="tel:+39 0736 654770" className={styles.phoneLink}>+39 0736 654770</a>
                    </p>
                    {'|'}
                    <p>
                        <a href="mailto:contact@ziberline.ro" className={styles.emailLink}>
                            contact@romarket.ro
                        </a>
                    </p>
                </div>
                <FaArrowDown />
                <div className={styles.mapWrapper}>
                    <Map
                        style={{ width: '100%', height: '100%' }}
                        defaultCenter={{ lat, lng }}
                        defaultZoom={13}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                        <Marker
                            position={{ lat, lng }}
                        />
                    </Map>
                </div>
            </section>
        </div>
    );
}

export default Contact;