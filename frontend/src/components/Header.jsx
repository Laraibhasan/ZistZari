import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom"; // Step 1: Import Link

const Header = () => {
  return (
    <div className="relative w-full h-[60vh] sm:h-[80vh] border border-gray-400 overflow-hidden flex items-center">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          src={assets.hero_img} 
          alt="Hero Background" 
        />
      </div>

      {/* Header Content (Text Card) */}
      <div className="relative z-10 w-full md:w-auto md:max-w-2xl mx-6 sm:mx-12 md:mx-20 bg-[#F3E5D0] p-8 md:p-12 rounded-2xl shadow-lg">
        <div className="text-[#3E2723]">
          <div className="flex items-center gap-2 mb-4">
            <p className="w-8 md:w-11 h-[2px] bg-[#3E2723]"></p>
            <p className="font-medium text-sm md:text-base">OUR BEST SELLERS</p>
          </div>
          
          <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl leading-snug mb-6">
            Personalized Fabrics & Designs Created to Reflect Your Unique Style and Vision
          </h1>
          
          {/* Step 2: Wrap the Shop Now section in a Link */}
          <Link to='/collection' className="flex items-center gap-2 group cursor-pointer w-fit">
            <p className="font-semibold text-sm md:text-base group-hover:underline">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#3E2723]"></p>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Header;