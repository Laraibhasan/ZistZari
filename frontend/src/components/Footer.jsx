import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40">
        {/* MODIFIED: Added flex flex-col items-center to center content horizontally */}
        <div className="flex flex-col items-center">
          {/* REMOVED: ml-12 class from the image */}
          <img src={assets.Component_12_1} className="mb-16 w-[260px]" alt="" />
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About us</li></Link>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">CONTACT</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Phone: +91 7304738622</li>
            <li>Email: contact@zistzari.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ZistZari.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
