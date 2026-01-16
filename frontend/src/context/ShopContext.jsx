import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee=10;
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        const product = products.find(p => p._id === itemId);
    
        if (product && !product.available) {
            toast.error('This fabric is currently Out of Stock');
            return;
        }

        if (!size) {
            toast.error('Please select the Yardage');
            return;
        }
        
        let cartData = structuredClone(cartItems);
    
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment the quantity for the specific size
            } else {
                cartData[itemId][size] = 1; // Add the size with a quantity of 1
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Add the item with the size and quantity of 1
        }
    
        setCartItems(cartData);
        
        if (token) {
            // User is logged in, proceed with adding to cart
            try {
                await axios.post(backend_url + "/api/cart/add", {
                    itemId,
                    size,
                }, {
                    headers: {token}
                });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            // User is logged in, proceed with updating the cart
            try {
                await axios.post(backend_url + "/api/cart/update", {
                    itemId,
                    size,
                    quantity
                }, {
                    headers: {token}
                });
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
        let itemInfo = products.find((product) => product._id === items);
        
        // Safety check to ensure product data is loaded
        if (!itemInfo) continue;

        for (const size in cartItems[items]) {
            try {
                const quantity = cartItems[items][size];

                if (quantity > 0) {
                    // 1. Extract the number of yards (e.g., "6 Yard" becomes 6)
                    const yards = parseFloat(size.split(' ')[0]); 
                    
                    // 2. Define Discount Logic based on your Length Options image
                    let discount = 0;
                    if (yards >= 6) {
                        discount = 0.10; // 10% off for 6 yards
                    } else if (yards >= 3.7 || size.includes("4 yard")) { 
                        discount = 0.07; // 7% off for 4 yards
                    } else if (yards >= 1.8 || size.includes("2 yard")) {
                        discount = 0.05; // 5% off for 2 yards
                    }

                    // 3. Calculation Logic:
                    // (Base Price * Number of Yards) * (1 - Discount Percentage)
                    const subtotalPerBundle = (itemInfo.price * yards) * (1 - discount);

                    // 4. Add to total based on how many bundles are in the cart
                    totalAmount += subtotalPerBundle * quantity;
                }
            } catch (error) {
                console.error("Error calculating amount for size:", size, error);
            }
        }
    }
    return totalAmount;
};

    const getProductsData = async () => {
        try {
            const response = await axios.get(backend_url + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getUserCart = async (token) => {
        if (token) {
            try {
                const response = await axios.post(backend_url + "/api/cart/get", {},{
                    headers: {token}
                });
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, []);

    const value = {
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,getCartCount,updateQuantity,getCartAmount,navigate, backend_url,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;