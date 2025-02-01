import styles from './styles.module.css';
import banner from '../../assets/images/banner.jpg';

const AboutUs = () => {
    return (
        <div id='about-us' className={styles.sectionWrapper}>
            <section className={styles.section}>
                <h2>Despre noi</h2>
                <p>RoMarket este magazinul românesc din Ascoli unde se retrăiește tradiția românească de preparare a cărnii și de unde pleci cu coșul plin de bunătăți românești. Magazinul s-a deschis în X, întâmpinând românii din Ascoli și din împrejurimi cu preparate proaspete și de calitate de la măcelăria proprie, precum și cu o gamă largă de produse alimentare românești, legume românești, precum și bere și vinuri românești.</p>
                <img src={banner} alt='RoMarket banner' />
            </section>
        </div>
    )
}

export default AboutUs;