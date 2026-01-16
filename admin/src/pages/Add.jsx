import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [image5, setImage5] = useState(false);
  const [image6, setImage6] = useState(false);
  const [image7, setImage7] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [color, setColor] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [available, setAvailable] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("color", color);
      formData.append("fabricType", fabricType);
      formData.append("available", available);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      image5 && formData.append("image5", image5);
      image6 && formData.append("image6", image6);
      image7 && formData.append("image7", image7);

      console.log("Checkbox state:", bestseller)
      
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setImage5(false);
        setImage6(false);
        setImage7(false);
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setColor("");
        setFabricType("");
        setAvailable(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2 ">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>

          <label htmlFor="image5">
            <img
              src={!image5 ? assets.upload_area : URL.createObjectURL(image5)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage5(e.target.files[0])}
              type="file"
              id="image5"
              hidden
            />
          </label>

          <label htmlFor="image6">
            <img
              src={!image6 ? assets.upload_area : URL.createObjectURL(image6)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage6(e.target.files[0])}
              type="file"
              id="image6"
              hidden
            />
          </label>

          <label htmlFor="image7">
            <img
              src={!image7 ? assets.upload_area : URL.createObjectURL(image7)}
              className="w-20"
              alt=""
            />
            <input
              onChange={(e) => setImage7(e.target.files[0])}
              type="file"
              id="image7"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full ">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full ">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("1 Yard") ? p.filter((item) => item !== "1 Yard") : [...p, "1 Yard"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("1 Yard") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              1 Yard
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("2 Yard") ? p.filter((item) => item !== "2 Yard") : [...p, "2 Yard"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("2 Yard") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              2 Yard
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("3 Yard") ? p.filter((item) => item !== "3 Yard") : [...p, "3 Yard"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("3 Yard") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              3 Yard
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((p) =>
                p.includes("6 Yard")
                  ? p.filter((item) => item !== "6 Yard")
                  : [...p, "6 Yard"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("6 Yard") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer `}
            >
              6 Yard
            </p>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <p className="mb-2">Product Color</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
      </div>

      <div className="w-full ">
        <p className="mb-2">Fabric Type</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setFabricType(e.target.value)}
          value={fabricType}
        />
      </div>

      <div className="w-full ">
        <p className="mb-2">Product Availability</p>
        <select
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setAvailable(e.target.value)}
          value={available}
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestseller(e.target.checked)} // More explicit
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        className="w-28 py-3 mt-4 bg-black bg-black text-white"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
