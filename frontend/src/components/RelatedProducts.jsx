import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from '../components/ProductItem';

const RelatedProducts = ({ fabricType }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && fabricType) {
      let productsCopy = products.slice();

      // Filter by the new fabricType field
      productsCopy = productsCopy.filter((item) => item.fabricType === fabricType);

      // Limit to 5 related products
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, fabricType]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-8">
        <Title text1="RELATED" text2="FABRICS" />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.length > 0 ? (
          related.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 italic">No similar fabrics found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;