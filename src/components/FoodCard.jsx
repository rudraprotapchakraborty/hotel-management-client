import Swal from "sweetalert2";
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
            }
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    console.log(res.data);
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
                    console.log(err);
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
                    navigate("/login", { state: { from: location} });
                }
            });
        }
    };

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        className="bg-cover bg-center w-full h-60"
                        alt="" />
                </figure>
                <p className="bg-[#111827] text-white absolute rounded-lg px-2 py-1 right-3 top-3">${price}</p>
                <div className="card-body flex flex-col justify-center items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div onClick={handleAddToCart} className="card-actions justify-center">
                        <button className="btn bg-[#E8E8E8] text-[#BB8506] border-0 border-b-4 border-[#BB8506]">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;