import PropTypes from 'prop-types';
import Cover from "../Shared/Cover";
import MealItem from "../Shared/MealItem";

const MealsCategory = ({ items, title, img }) => {
    return (
        <div className="py-8">
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid grid-cols-2 gap-10 my-16">
                {
                    items.map(item =>
                        <MealItem
                            key={item._id}
                            item={item}>
                        </MealItem>)
                }
            </div>
        </div>
    );
};

MealsCategory.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    img: PropTypes.string,
};

export default MealsCategory;
