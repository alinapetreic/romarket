import AboutUs from "../../components/about-us";
import Contact from "../../components/contact";
import LetsTalk from "../../components/lets-talk";
import Presentation from "../../components/presentation";
import Categories from "../../components/categories";
import FrequentlyAskedQuestions from "../../components/frequently-asked-questions";

const Home = () => {
    return (
        <main>
            <Presentation />
            <AboutUs />
            <Categories />
            <LetsTalk />
            <FrequentlyAskedQuestions />
            <Contact/>
        </main>
    )
}

export default Home;