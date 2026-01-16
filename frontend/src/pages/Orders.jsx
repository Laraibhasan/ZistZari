import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backend_url, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // --- NEW: Helper function to calculate price by yardage ---
  const calculatePrice = (basePrice, sizeString) => {
    const yards = parseFloat(sizeString.split(' ')[0]) || 1;
    let discount = 0;

    // Apply tiers: 2yd (5%), 4yd (7%), 6yd (10%)
    if (yards >= 5.5) {
      discount = 0.10;
    } else if (yards >= 3.7) {
      discount = 0.07;
    } else if (yards >= 1.8) {
      discount = 0.05;
    }

    const total = (basePrice * yards) * (1 - discount);
    return total.toFixed(2);
  };

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backend_url + "/api/order/userorders", {}, {
        headers: { token }
      });

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse());
      }

    } catch (error) {
      console.error("Error loading order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            /* Use grid for consistent columns on desktop */
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center gap-4'>

              {/* 1. Left Column: Image and Product Info */}
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div className='flex flex-col gap-1'>
                  <p className='sm:text-base font-medium line-clamp-2'>{item.name}</p>
                  <div className='flex items-center gap-3 text-base text-gray-700'>
                    {/* Show calculated total price based on yardage */}
                    <p className='font-semibold'>{currency}{calculatePrice(item.price, item.size)}</p>
                    <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                    <p className='px-2 py-0.5 bg-slate-100 border text-xs'>{item.size}</p>
                  </div>
                  <div className='text-xs text-gray-400'>
                    <p>Placed: {new Date(item.date).toDateString()}</p>
                    <p>Via: {item.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* 2. Middle Column: Status Dot & Text */}
              <div className='flex items-center gap-2 md:justify-center'>
                <p className='min-w-[10px] h-2.5 w-2.5 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base font-medium'>{item.status}</p>
              </div>

              {/* 3. Right Column: Track Button */}
              <div className='flex md:justify-end'>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm bg-white hover:bg-gray-50 transition-colors'>
                  TRACK ORDER
                </button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders