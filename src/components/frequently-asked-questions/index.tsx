import styles from './styles.module.css';
import Article from './article';

const faq = [
    {
        "question": "Care este programul magazinului?",
        "answer": "Magazinul este deschis de luni până sâmbătă între orele 9:00-20:00, iar duminica între 10:00-18:00."
    },
    {
        "question": "Unde este situat magazinul RoMarket în Ascoli?",
        "answer": "Magazinul nostru este situat pe strada Via Napoli 118B, într-o zonă ușor accesibilă cu transportul public și cu locuri de parcare disponibile."
    },
    {
        "question": "Acceptați plata cu cardul?",
        "answer": "Da, acceptăm toate tipurile de plăți: cash, card bancar și contactless. Pentru comenzi mai mari, oferim și posibilitatea de plată prin transfer bancar."
    },
    {
        "question": "Livrați produse la domiciliu?",
        "answer": "Da, oferim servicii de livrare în Ascoli și împrejurimi pentru comenzi de minimum 50€. Pentru detalii și programări, ne puteți contacta telefonic sau prin WhatsApp."
    },
    {
        "question": "Cât de des primiți produse proaspete din România?",
        "answer": "Primim transporturi săptămânale din România cu produse proaspete, mezeluri și alte specialități. Vă recomandăm să ne urmăriți pe Facebook pentru anunțuri despre noile produse sosite."
    }
];

const FrequentlyAskedQuestions = () => {
    return (
        <div id="faq" className={styles.sectionWrapper}>
            <section className={styles.section}>
                <h2>Întrebări frecvente</h2>
                <div className={styles.articlesContainer}>
                    {faq.map((item, index) => (
                        <Article key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FrequentlyAskedQuestions;