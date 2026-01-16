import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"
import paypal from '@paypal/checkout-server-sdk';

//GET WAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

//GLOBAL VARIABLES
const currency = "usd";
const deliveryCharges = 10;

// PLACING ORDERS USING COD
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// PLACING ORDERS USING STRIPE
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//VERIFY STRIPE
export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const placeOrderPaypal = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // STEP 1: DO NOT save to orderModel here yet.
    // Just prepare the PayPal payment.

    const purchase_units = [{
      amount: {
        currency_code: 'USD',
        value: amount.toFixed(2),
        breakdown: {
          item_total: {
            currency_code: 'USD',
            value: (amount - deliveryCharges).toFixed(2)
          },
          shipping: {
            currency_code: 'USD',
            value: deliveryCharges.toFixed(2)
          }
        }
      },
      items: items.map((item) => {
        const yards = parseFloat(item.size.split(' ')[0]) || 1;
        let discount = 0;
        if (yards >= 5.5) discount = 0.10;
        else if (yards >= 3.7) discount = 0.07;
        else if (yards >= 1.8) discount = 0.05;

        const unitPriceAfterDiscount = (item.price * yards * (1 - discount)).toFixed(2);

        return {
          name: item.name,
          unit_amount: {
            currency_code: 'USD',
            value: unitPriceAfterDiscount
          },
          quantity: item.quantity.toString()
        };
      })
    }];

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units,
      application_context: {
        // We no longer pass an orderId because it hasn't been created yet
        return_url: `${origin}/verify?success=true&method=paypal`,
        cancel_url: `${origin}/verify?success=false&method=paypal`
      }
    });

    const response = await client.execute(request);
    const approval_url = response.result.links.find(link => link.rel === 'approve').href;

    // We send success true and the url, but database is still empty.
    res.json({ success: true, session_url: approval_url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// VERIFY PAYPAL PAYMENT
export const verifyPaypal = async (req, res) => {
  // Receive the full order details from the frontend verification call
  const { userId, items, address, amount, success, paypalOrderId } = req.body;

  try {
    if (success === "true") {
      // 1. Capture the payment first
      const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
      request.requestBody({});
      const capture = await client.execute(request);

      if (capture.result.status === "COMPLETED") {
        
        // 2. ONLY NOW create and save the order to the database
        const orderData = {
          userId,
          items,
          address,
          amount,
          paymentMethod: "PayPal",
          payment: true, // Marked as paid immediately
          date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // 3. Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        
        res.json({ success: true, message: "Payment successful and order placed" });
      } else {
        res.json({ success: false, message: "Payment not completed" });
      }
    } else {
      // If the user cancelled, we do nothing. No order was ever saved!
      res.json({ success: false, message: "Payment cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//ALL ORDERS DATA FOR ADMIN PANEL
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//USER ORDERS DATA FOR FRONTEND
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//UPDATE ORDER STATUS FROM ADMIN PANEL
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
