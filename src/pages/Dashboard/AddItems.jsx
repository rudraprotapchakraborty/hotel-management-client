import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]};
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data.data.url);
    };

    return (
        <div>
            <SectionTitle heading="ADD AN ITEM" subHeading="---What's new?---"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name*</span>
                        </div>
                        <input {...register("name", {required: true})} type="text" placeholder="Recipe Name" required className="input input-bordered w-full" />
                    </label>

                    <div className="flex gap-6">
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category Name*</span>
                            </div>
                            <select defaultValue="default" {...register("category", {required: true})} className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Desserts</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input {...register("price", {required: true})} type="number" placeholder="Price" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea {...register("recipe", {required: true})} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>
                    </label>

                    <div className="form-control w-full my-6">
                        <input {...register("image", {required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;