import styles from './styles.module.css';
import presentation from '../../assets/images/presentation.jpg';
import { FaChevronDown } from 'react-icons/fa6';

const Presentation = () => {
    return (
        <div id="presentation" className={styles.sectionWrapper}>
            <section className={styles.section}>
                <img src={presentation} alt='RoMarket' />
            </section>
            <a href="#key-advantages" className={styles.scrollDownButton}>
                <span>Contact</span>
                <FaChevronDown />
                <div />
            </a>
        </div>
    );
}

export default Presentation;
