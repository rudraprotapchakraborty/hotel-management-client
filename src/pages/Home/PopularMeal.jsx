import SectionTitle from "../../components/SectionTitle";
import MealItem from "../Shared/MealItem";
import useMeal from "../../hooks/useMeal";

const PopularMeal = () => {

    const [meal] = useMeal();
    const popular = meal.filter(item => item.category === 'popular');

    return (
        <section className="mb-12">
            <SectionTitle
                subHeading="Check it out"
                heading="popular meal"
            />
            <div className="grid grid-cols-2 gap-10">
                {
                    popular.map(item =>
                        <MealItem
                            key={item._id}
                            item={item}>
                        </MealItem>)
                }
            </div>
            <div className="text-center">
                <button className="btn bg-transparent border-b-2 border-0 border-black mt-4">View Full  meal</button>
            </div>
        </section>
    );
};

export default PopularMeal;