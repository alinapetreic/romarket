import styles from './styles.module.css';
import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';

interface ArticleProps {
    question: string;
    answer: string;
}

const Article = (props: ArticleProps) => {
    const { question, answer } = props;

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <article className={styles.article}>
            <div className={styles.container}>
                <p className={styles.question}>
                    {question}
                </p>
                <button className={styles.iconButton} onClick={toggleOpen}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
            {
                isOpen &&
                <p className={styles.answer}>
                    {answer}
                </p>
            }
        </article>
    );
}

export default Article;