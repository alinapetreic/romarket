import styles from './styles.module.css';
import { TouchEvent, useEffect, useState, useRef } from 'react';

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
    const [isAnimating, setIsAnimating] = useState(false);
    const cardsContainerRef = useRef<HTMLDivElement>(null);

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

    const animateSlide = (direction: 'next' | 'prev') => {
        if (isAnimating || !cardsContainerRef.current) {
            //console.log('🚫 Animation blocked: already animating or no container ref');
            return;
        }

        //console.log(`🎬 Starting ${direction} slide animation`);
        setIsAnimating(true);
        const container = cardsContainerRef.current;
        const slideDirection = direction === 'next' ? -100 : 100;

        //console.log(`➡️ Phase 1: Sliding out to ${slideDirection}%`);
        container.style.transform = `translateX(${slideDirection}%)`;
        container.style.opacity = '0';

        setTimeout(() => {
            //console.log('📦 Updating data and preparing for slide in');
            if (direction === 'next') {
                nextSlide();
            } else {
                prevSlide();
            }

            //console.log('🔄 Resetting position without animation');
            container.style.transition = 'none';
            container.style.transform = `translateX(${-slideDirection}%)`;
            container.style.opacity = '0';

            // Force reflow
            container.offsetHeight;

            //console.log('⬅️ Phase 2: Sliding back to center');
            container.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
            container.style.transform = 'translateX(0)';
            container.style.opacity = '1';

            setTimeout(() => {
                //console.log('✅ Animation completed, unlocking');
                setIsAnimating(false);
            }, 400);
        }, 400);
    };

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
        const targetIndex = index * itemsPerRow;
        //console.log(`🎯 Attempting to go to dot ${index} (slide ${targetIndex})`);

        if (targetIndex === currentIndex) {
            //console.log('🚫 Already at target index');
            return;
        }

        if (isAnimating) {
            //console.log('🚫 Cannot go to slide - animation in progress');
            return;
        }

        if (!cardsContainerRef.current) {
            //console.log('🚫 Cannot go to slide - no container ref');
            return;
        }

        setIsAnimating(true);
        const container = cardsContainerRef.current;
        const direction = targetIndex > currentIndex ? 'next' : 'prev';
        const slideDirection = direction === 'next' ? -100 : 100;

        //console.log(`🎬 Starting dot navigation animation: ${direction} direction`);
        container.style.transform = `translateX(${slideDirection}%)`;
        container.style.opacity = '0';

        setTimeout(() => {
            //console.log('📦 Updating to target index:', targetIndex);
            container.style.transition = 'none';
            container.style.transform = `translateX(${-slideDirection}%)`;
            container.style.opacity = '0';
            setCurrentIndex(targetIndex);

            // Force reflow
            container.offsetHeight;

            //console.log('⬅️ Animating to final position');
            container.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
            container.style.transform = 'translateX(0)';
            container.style.opacity = '1';

            setTimeout(() => {
                //console.log('✅ Dot navigation completed');
                setIsAnimating(false);
            }, 400);
        }, 400);
    };

    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        //console.log('👆 Touch started');
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (!touchStart || isAnimating) {
            //console.log('🚫 Touch move blocked:', !touchStart ? 'no touch start' : 'animating');
            return;
        }

        const currentTouch = e.targetTouches[0].clientX;
        setTouchEnd(currentTouch);

        if (cardsContainerRef.current) {
            const deltaX = currentTouch - touchStart;
            const percentMove = (deltaX / window.innerWidth) * 100;
            //console.log(`🔄 Moving: ${Math.round(percentMove)}% (${Math.round(deltaX)}px)`);
            cardsContainerRef.current.style.transform = `translateX(${percentMove}%)`;
            cardsContainerRef.current.style.opacity = `${1 - Math.abs(percentMove) / 100}`;
        }
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || isAnimating) {
            //console.log('🚫 Touch end blocked:', !touchStart ? 'no touch start' : !touchEnd ? 'no touch end' : 'animating');
            return;
        }

        const distance = touchStart - touchEnd;
        //console.log(`📏 Swipe distance: ${Math.round(distance)}px (minimum: ${minSwipeDistance}px)`);

        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (cardsContainerRef.current) {
            cardsContainerRef.current.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        }

        if (isLeftSwipe) {
            //console.log('👈 Left swipe detected - going next');
            animateSlide('next');
        } else if (isRightSwipe) {
            //console.log('👉 Right swipe detected - going prev');
            animateSlide('prev');
        } else {
            console.log('↩️ Swipe not far enough - resetting position');
            if (cardsContainerRef.current) {
                cardsContainerRef.current.style.transform = 'translateX(0)';
                cardsContainerRef.current.style.opacity = '1';
            }
        }
    };

    const totalDots = Math.ceil(categories.length / itemsPerRow);
    const currentDot = Math.floor(currentIndex / itemsPerRow);

    return (
        <div id="categories" className={styles.sectionWrapper}>
            <section className={styles.section}>
                <h2 className={styles.title}>Oferim o gamă largă de produse</h2>

                <div className={styles.carouselWrapper}>
                    <button
                        onClick={() => animateSlide('prev')}
                        className={`${styles.navigationButton} ${styles.prevButton}`}
                        aria-label="Previous slides"
                        disabled={isAnimating}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => animateSlide('next')}
                        className={`${styles.navigationButton} ${styles.nextButton}`}
                        aria-label="Next slides"
                        disabled={isAnimating}
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className={styles.carouselContainer}>
                        <div
                            ref={cardsContainerRef}
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
                                    disabled={isAnimating}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Categories;