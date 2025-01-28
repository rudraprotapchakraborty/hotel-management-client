import PropTypes from 'prop-types';
import Cover from "../Shared/Cover";
import MealItem from "../Shared/MealItem";

const MealsCategory = ({ items, title, img }) => {
  return (
    <div className="py-8 bg-white dark:bg-gray-800 transition-all duration-500">
      {title && (
        <Cover
          img={img}
          title={title}
          className="rounded-xl shadow-lg"
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-16 px-6 sm:px-12 lg:px-24">
        {items.map(item => (
          <MealItem key={item._id} item={item} />
        ))}
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
