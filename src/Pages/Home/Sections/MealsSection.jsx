import { useQuery } from "@tanstack/react-query";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import MealsCard from "../../../Components/Shared/MealsCard";
import 'react-tabs/style/react-tabs.css';

const MealsSection = () => {
    const axiosPublic = useAxiosPublic();
    const { data: meals = [] } = useQuery({
        queryKey: ['meal-cards'],
        queryFn: async () => {
            const res = await axiosPublic.get('/mealCard');
            return res.data
        }
    })
    const breakfast = meals.filter(meal => meal.category === 'breakfast')
    const lunch = meals.filter(meal => meal.category === 'lunch')
    const dinner = meals.filter(meal => meal.category === 'dinner')
    return (
        <div className="max-w-7xl mx-auto">
            <div className="items-center mt-10">
                <Tabs>
                    <TabList >
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 mb-10">
                            {
                                breakfast.slice(0,4).map(meal => <MealsCard key={meal._id} meal={meal}></MealsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-3 mt-4 mb-10">
                            {
                                lunch.slice(0,4).map(meal=> <MealsCard key={meal._id} meal={meal}></MealsCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-3 mt-4 mb-10">
                           {
                            dinner.slice(0,4).map(meal=><MealsCard key={meal._id} meal={meal}></MealsCard>)
                           }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default MealsSection;