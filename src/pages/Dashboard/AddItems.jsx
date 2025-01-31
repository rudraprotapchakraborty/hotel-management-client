import { useForm } from "react-hook-form";
import SectionTitle from "../../components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const mealItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const mealRes = await axiosSecure.post("/meal", mealItem);
      if (mealRes.data.insertedId) {
        reset();
        Swal.fire({
          title: `${data.name} added!`,
          text: "Item added successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <SectionTitle heading="ADD AN ITEM" subHeading="--- What's new? ---" />

      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-8 transition-all duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-gray-900 dark:text-white">Recipe Name*</span>
            </div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe Name"
              required
              className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </label>

          {/* Category and Price */}
          <div className="flex gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-900 dark:text-white">Category Name*</span>
              </div>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select select-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-gray-900 dark:text-white">Price*</span>
              </div>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </label>
          </div>

          {/* Recipe Details */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-gray-900 dark:text-white">Recipe Details</span>
            </div>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Recipe Details"
            ></textarea>
          </label>

          {/* Image Upload */}
          <div className="form-control w-full">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button className="btn w-full bg-orange-600 text-white hover:bg-orange-700 transition-all duration-300 rounded-lg py-3 flex items-center justify-center">
            Add Item <FaUtensils className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
