import { Helmet } from 'react-helmet-async';
import Banner from './Sections/Banner';
import MealsSection from './Sections/MealsSection';
import Features from './Sections/Features';
import Pricing from './Sections/Pricing';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>uniLodge | Home</title>
            </Helmet>
            <Banner></Banner>
            <MealsSection></MealsSection>
            <Features></Features>
            <Pricing></Pricing>
            
        </div>
    );
};

export default Home;