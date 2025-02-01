import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const LetsTalk = () => {
    return (
        <div id="lets-talk" className={styles.sectionWrapper}>
            <section className={styles.section}>
                <h2>Află mai multe</h2>
                <p>
                    Dacă ai întrebări sau dorești să afli mai multe despre serviciile noastre, nu ezita să ne contactezi.
                </p>
                <Link to="/contact" className={styles.contactLink}>Contactează-ne</Link>
            </section>
        </div>
    );
}

export default LetsTalk;