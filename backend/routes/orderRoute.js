import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderPaypal,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
  verifyPaypal
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//ADMIN FEATURE
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//PAYMENT FEATURE
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/paypal", authUser, placeOrderPaypal);

//USER FEATURE
orderRouter.post("/userorders", authUser, userOrders);

//VERIFY PAYMENT
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyPaypal", authUser, verifyPaypal);

export default orderRouter;
