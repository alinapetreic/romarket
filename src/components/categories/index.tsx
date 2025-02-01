import styles from './styles.module.css';
import { TouchEvent, useEffect, useState } from 'react';

const getItemsPerRow = (width: number) => {
    if (width <= 768) return 1;
    if (width <= 992) return 2;
    return 3;
};

const Categories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow(window.innerWidth));
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const categories = [
        {
            title: "Produse alimentare românești",
            description: "Găsiți la noi o gamă completă de produse alimentare românești de cea mai bună calitate. De la conserve, mezeluri și brânzeturi până la legume și fructe proaspete aduse direct din România. Oferim toate ingredientele necesare pentru a găti mâncărurile tradiționale românești."
        },
        {
            title: "Băuturi românești",
            description: "Vă oferim o selecție bogată de băuturi românești pentru toate gusturile. Avem o colecție variată de vinuri românești din cele mai renumite podgorii, bere românească de toate tipurile, sucuri naturale și băuturi tradiționale precum afinata și vișinata."
        },
        {
            title: "Dulciuri românești",
            description: "Pentru iubitorii de dulce, aducem direct din România cele mai îndrăgite dulciuri românești. De la ciocolată ROM și eugenii, până la cozonac proaspăt și prăjituri tradiționale. Găsiți la noi toate dulciurile copilăriei care vă amintesc de casă."
        },
        {
            title: "Pentru Comunitate",
            description: "Suntem mai mult decât un magazin - suntem un colț de România în inima Romei. Întâmpinăm cu căldură românii din Ascoli și din împrejurimi, aducându-le aproape gusturile și aromele de acasă prin produse autentice și proaspete de calitate."
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            setItemsPerRow(getItemsPerRow(window.innerWidth));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsPerRow >= categories.length ? 0 : prevIndex + itemsPerRow
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex - itemsPerRow < 0) {
                const remainder = categories.length % itemsPerRow;
                const lastGroupStart = remainder === 0
                    ? categories.length - itemsPerRow
                    : categories.length - remainder;
                return lastGroupStart;
            }
            return prevIndex - itemsPerRow;
        });
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index * itemsPerRow);
    };

    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    const totalDots = Math.ceil(categories.length / itemsPerRow);
    const currentDot = Math.floor(currentIndex / itemsPerRow);

    return (
        <div id="categories" className={styles.sectionWrapper}>
            <section className={styles.section}>
                <h2 className={styles.title}>Oferim o gamă largă de produse</h2>

                <div className={styles.carouselContainer}>
                    <button
                        onClick={prevSlide}
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        aria-label="Previous slides"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        aria-label="Next slides"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div
                        className={styles.cardsContainer}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        {categories
                            .slice(currentIndex, currentIndex + itemsPerRow)
                            .map(({ title, description }, index) => (
                                <div key={currentIndex + index} className={styles.card}>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            ))}
                    </div>

                    <div className={styles.dotsContainer}>
                        {[...Array(totalDots)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`${styles.dot} ${currentDot === index ? styles.dotActive : ''}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Categories;