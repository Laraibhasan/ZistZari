import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState('');

  // --- NEW DISCOUNT LOGIC HELPER ---
  const getDynamicPrice = (basePrice, selectedSize) => {
    if (!selectedSize) return basePrice;

    // Extract numerical value from string (e.g., "6 Yard" -> 6)
    const yards = parseFloat(selectedSize.split(' ')[0]);
    
    // Apply discount tiers from your image
    let discount = 0;
    if (yards >= 6) {
      discount = 0.10; // 10% off
    } else if (yards >= 3.7 || selectedSize.includes("4 Yard")) {
      discount = 0.07; // 7% off
    } else if (yards >= 1.8 || selectedSize.includes("2 Yard")) {
      discount = 0.05; // 5% off
    }

    const total = (basePrice * yards) * (1 - discount);
    return total.toFixed(2);
  };

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} alt="" key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border hover:border-black" />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto rounded-lg" alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-3xl mt-2 text-gray-800">{productData.name}</h1>
          
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2 text-gray-400 text-sm">(Customer Rating)</p>
          </div>

          {/* --- DYNAMIC PRICE DISPLAY --- */}
          <p className="mt-5 text-3xl font-medium text-black">
            {currency}{getDynamicPrice(productData.price, size)} {currency === '$' ? 'USD' : ''}
            {size && parseFloat(size.split(' ')[0]) > 1 && (
              <span className="text-sm text-green-600 ml-3 font-normal">
                {/* Visual indicator of the discount applied */}
                {parseFloat(size.split(' ')[0]) >= 6 ? '10% Off' : 
                 parseFloat(size.split(' ')[0]) >= 3.7 ? '7% Off' : '5% Off'}
              </span>
            )}
            <span className="text-xs bg-gray-100 px-2 py-1 ml-2 rounded text-gray-500">Sale</span>
          </p>
          
          <p className="mt-5 text-gray-500 md:w-4/5 leading-relaxed">{productData.description}</p>

          {/* Yard Selection Section */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-sm font-medium text-gray-700">Length Options (Select for Savings)</p>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => setSize(item)} 
                  className={`px-6 py-2 border rounded-full text-sm transition-all duration-300 ${item === size ? 'bg-black text-white border-black' : 'bg-gray-100 text-gray-700 hover:border-gray-400'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ... Rest of your code (Color, Add to Cart, Description) ... */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-sm font-medium text-gray-700">Color</p>
            <div className="flex gap-3">
              <button className="px-6 py-2 border rounded-full bg-white text-black text-sm cursor-default">
                {productData.color}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:w-80">
            <button 
              onClick={() => addToCart(productData._id, size)} 
              className="bg-black text-white border border-black px-8 py-3 text-sm rounded-full font-medium active:bg-gray-200 transition-all"
            >
              ADD TO CART
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Hand-crafted luxury fabric.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      
      {/* Description and Related Products */}
      <div className="mt-20">
        <div className="flex">
          <b className="border-b-2 border-black px-5 py-3 text-sm text-black">Description</b>
        </div>
        <div className="flex flex-col gap-4 border-t px-6 py-6 text-sm text-gray-500 leading-relaxed">
          <p>Discover the dedication that goes into each piece we create...</p>
        </div>
      </div>
      <RelatedProducts fabricType={productData.fabricType} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;