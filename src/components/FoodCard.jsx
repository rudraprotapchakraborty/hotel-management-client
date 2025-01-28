import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";

const FoodCard = ({ item }) => {

    const { image, price, name, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                mealId: _id,
                email: user.email,
                name,
                price,
                image,
            };
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    Swal.fire({
                        title: "Success!",
                        text: `${name} added to cart.`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                })
                .catch(err => {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        }
        else {
            Swal.fire({
                title: "Please login first!",
                text: "You need to be logged in to add items to cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="card bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <figure className="relative">
                <img
                    src={image}
                    className="w-full h-60 object-cover rounded-lg transition-transform duration-500 transform hover:scale-110"
                    alt={name}
                />
                <p className="bg-[#BB8506] text-white absolute top-3 right-3 rounded-lg px-4 py-2 font-semibold text-xl">${price}</p>
            </figure>
            <div className="card-body p-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{recipe}</p>
                <div onClick={handleAddToCart} className="card-actions justify-center">
                    <button className="btn bg-[#BB8506] text-white border-none rounded-full w-full py-2 transition-transform duration-300 transform hover:scale-105">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        recipe: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};

export default FoodCard;
