import { Helmet } from 'react-helmet-async';
import Banner from './Sections/Banner';
import MealsSection from './Sections/MealsSection';
import Features from './Sections/Features';
import Pricing from './Sections/Pricing';
import { useRef } from 'react';

const Home = () => {
    const pricing = useRef(null);
    const scrollToSection = (elementRef) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth",
        })
    }
    return (
        <div>
            <Helmet>
                <title>uniLodge | Home</title>
            </Helmet>
            <Banner scrollToSection={scrollToSection} pricing={pricing}></Banner>
            <MealsSection></MealsSection>
            <Features></Features>
            <div ref={pricing}>
                <Pricing></Pricing>

            </div>


        </div>
    );
};

export default Home;