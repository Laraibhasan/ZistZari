import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Filter States
  const [availability, setAvailability] = useState([]);
  const [fabricType, setFabricType] = useState([]);
  const [priceRange, setPriceRange] = useState(499);
  const [colorFilter, setColorFilter] = useState([]);

  const colorOptions = [
    { name: 'Beige', hex: '#EED9B5' }, { name: 'Blue', hex: '#0057E7' },
    { name: 'Gold', hex: '#D4AF37' }, { name: 'Gray', hex: '#808080' },
    { name: 'Green', hex: '#00AD43' }, { name: 'Multicolor', hex: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' },
    { name: 'Orange', hex: '#FF8C00' }, { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Purple', hex: '#A020F0' }, { name: 'Red', hex: '#FF0000' },
    { name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }
  ];

  const toggleFilter = (value, state, setState) => {
    setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (fabricType.length > 0) {
      productsCopy = productsCopy.filter(item => fabricType.includes(item.fabricType));
    }

    if (colorFilter.length > 0) {
      productsCopy = productsCopy.filter(item => colorFilter.includes(item.color));
    }

    if (availability.length > 0) {
      productsCopy = productsCopy.filter(item => {
        if (availability.includes("In stock") && item.available) return true;
        if (availability.includes("Out of stock") && !item.available) return true;
        return false;
      });
    }

    productsCopy = productsCopy.filter(item => item.price <= priceRange);
    
    // Sort logic
    if (sortType === 'low-high') productsCopy.sort((a,b)=>a.price - b.price);
    else if (sortType === 'high-low') productsCopy.sort((a,b)=>b.price - a.price);

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [search, showSearch, availability, colorFilter, priceRange, fabricType, products, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* VERTICAL SIDEBAR (Left Side) */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2 font-medium">
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Availability Block */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Availability</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer"><input type="checkbox" checked={availability.includes("In stock")} onChange={() => toggleFilter("In stock", availability, setAvailability)} /> In stock</label>
            <label className="flex gap-2 cursor-pointer"><input type="checkbox" checked={availability.includes("Out of stock")} onChange={() => toggleFilter("Out of stock", availability, setAvailability)} /> Out of stock</label>
          </div>
        </div>

        {/* Fabric Type Block (Your 4 options) */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Fabric Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Bugle Beads", "Pearl hand-beaded", "Rhinestone Tulle", "Zist Zari Specials"].map(item => (
              <label key={item} className="flex gap-2 cursor-pointer">
                <input type="checkbox" value={item} checked={fabricType.includes(item)} onChange={() => toggleFilter(item, fabricType, setFabricType)} /> {item}
              </label>
            ))}
          </div>
        </div>

        {/* Price Block */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Price (Max: ${priceRange})</p>
          <input type="range" min="0" max="499" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-11/12 accent-black" />
        </div>

        {/* Color Block */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 mb-10 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Color</p>
          <div className="flex flex-col gap-3 h-64 overflow-y-auto no-scrollbar">
            {colorOptions.map((item) => (
              <div key={item.name} onClick={() => toggleFilter(item.name, colorFilter, setColorFilter)} className="flex items-center gap-3 cursor-pointer">
                <div style={{ background: item.hex, border: item.name === 'White' ? '1px solid #ddd' : 'none' }} className={`w-5 h-5 rounded-full ${colorFilter.includes(item.name) ? 'ring-2 ring-black ring-offset-1' : ''}`}></div>
                <span className={`text-sm ${colorFilter.includes(item.name) ? 'font-medium underline' : 'font-light text-gray-700'}`}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID (Right Side) */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select onChange={(e) => setSortType(e.target.value)} className="border border-gray-300 text-sm px-2 outline-none">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;