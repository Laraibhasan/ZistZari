import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Exchange policy</p>
        <p className="text-gray-400">Easy exchanges for hassle-free shopping policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold"> Returns</p>
        <p className="text-gray-400">Simple returns for stress-free refunds</p>
      </div>
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Customer Support</p>
        <p className="text-gray-400">Here to help, anytime, anywhere</p>
      </div>
    </div>
  );
};

export default OurPolicy;
