import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          const updatedMeal = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url,
          };

          const mealRes = await axiosSecure.patch(`/meal/${_id}`, updatedMeal);
          if (mealRes.data.modifiedCount > 0) {
            reset();
            Swal.fire({
              title: "Updated!",
              text: `${data.name} has been updated successfully.`,
              icon: "success",
              confirmButtonText: "Close",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to upload the image. Try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300 p-6">
      <SectionTitle heading="UPDATE AN ITEM" subHeading="--- What's cooking? ---" />

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Name */}
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Recipe Name*</label>
            <input
              {...register("name", { required: true })}
              type="text"
              defaultValue={name}
              placeholder="Enter Recipe Name"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-white mb-2">Category*</label>
              <select
                {...register("category", { required: true })}
                defaultValue={category}
                className="select select-bordered w-full dark:bg-gray-700 dark:text-white"
              >
                <option disabled value="default">Select a category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-white mb-2">Price*</label>
              <input
                {...register("price", { required: true })}
                type="number"
                defaultValue={price}
                placeholder="Enter Price"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Recipe Details */}
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Recipe Details*</label>
            <textarea
              {...register("recipe", { required: true })}
              defaultValue={recipe}
              placeholder="Enter Recipe Details"
              className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white"
              rows="4"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Upload Image*</label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-orange-500 text-white hover:bg-orange-600 rounded-lg py-2 px-4 transition-all duration-300 flex items-center gap-2"
          >
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
