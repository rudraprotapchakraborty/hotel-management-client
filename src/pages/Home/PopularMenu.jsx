import SectionTitle from "../../components/SectionTitle";
import MenuItem from "../Shared/MenuItem";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-12">
            <SectionTitle
                subHeading="Check it out"
                heading="popular menu"
            />
            <div className="grid grid-cols-2 gap-10">
                {
                    popular.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}>
                        </MenuItem>)
                }
            </div>
            <div className="text-center">
                <button className="btn bg-transparent border-b-2 border-0 border-black mt-4">View Full  Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;