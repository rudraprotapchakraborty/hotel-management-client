import { Link } from "react-router-dom";
import Cover from "../Shared/Cover";
import MenuItem from "../Shared/MenuItem";

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="py-8">
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid grid-cols-2 gap-10 my-16">
                {
                    items.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                }
            </div>
            <div className="text-center">
                <Link to={`/order/${title}`}>
                    <button className="btn bg-[#E8E8E8] border-0 border-b-4 border-black">ORDER YOUR FAVORITE FOOD</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;