# Zist Zari - Luxury Fabric E-Commerce

**Zist Zari** is a professional e-commerce platform designed for the luxury textile industry. It features a robust order management system, secure multi-gateway payment processing, and a dedicated administrative interface for real-world business operations.

---

## 🚀 Features

### **Client-Side Experience**
* **Secure Checkout**: Users can safely provide delivery information and select from multiple payment methods including Stripe, PayPal, and Cash on Delivery.
* **Real-Time Order Tracking**: A dedicated "My Orders" page allows customers to monitor their purchase history with high-precision column alignment for status and payment details.
* **Responsive Design**: The platform is fully optimized for mobile and desktop, ensuring a premium shopping experience on any device.
* **Instant Notifications**: Integrated toast notifications provide immediate feedback for newsletter subscriptions and successful payment processing.

### **Admin & Order Management**
* **Centralized Dashboard**: Administrators can view and manage all orders placed through the platform, including payment status and customer details.
* **Dynamic Status Updates**: Admins have the ability to update order progress (e.g., from "Order Placed" to "Shipped"), which reflects instantly on the client’s tracking page.
* **Verified Payment Flow**: The system uses a "Redirect -> Verify" architecture, ensuring orders are only finalized in the database after the payment gateway confirms successful fund capture.
* **Inventory & Data Integrity**: Backend logic prevents "zombie" or unpaid orders from cluttering the database by deferring order creation until payment confirmation.

### **Real-Life Application**
* **Production Ready**: Built with industry-standard security practices, including JWT authentication and environment variable protection for sensitive API keys.
* **Scalable Architecture**: The MERN stack (MongoDB, Express, React, Node) foundation allows the project to scale as the product catalog and customer base grow.
* **International Ready**: Configured to handle international transactions via PayPal and Stripe with support for multiple currencies.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Payments** | Stripe API, @paypal/checkout-server-sdk |
| **State/UI** | Context API, React-Toastify |

---

## ⚙️ Installation (Backend)

Follow these steps to set up the server-side environment:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/zist-zari.git](https://github.com/your-username/zist-zari.git)
   cd zist-zari/backend


2. Install dependencies:

  Bash
  npm install

3. Configure Environment Variables: Create a .env file in the backend directory and add the following:

  Code snippet
  
  PORT=4000
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  STRIPE_API_KEY=your_stripe_secret_key
  PAYPAL_CLIENT_ID=your_paypal_client_id
  PAYPAL_SECRET=your_paypal_secret_key

4. Start the server:

  Bash
  npm run server

📱 Frontend Setup
To launch the client-side application:

1. Navigate to the frontend folder:

  Bash
  
  cd ../frontend

2. Install dependencies:
  
  Bash
  
  npm install

3. Run the development server:
  
  Bash
  
  npm run dev

🗺️ Project Architecture
The application follows a Decoupled MERN Architecture designed to ensure data integrity and secure payment handling.

Payment Flow Architecture
Instead of creating "Pending" orders that clutter the database, Zist Zari uses a "Verify-on-Success" strategy:

1. Initialization: The Frontend sends the cart data and shipping info to the Backend.

2. Gateway Handshake: The Backend creates a session with Stripe or PayPal and returns a secure redirect URL to the Frontend.

3. External Payment: The user is redirected to the official gateway. No order is saved to MongoDB at this stage to prevent unpaid "zombie" entries.

4. The Verify Bridge: Upon success, the gateway redirects the user to the /verify route on the Frontend, passing a token (PayPal) or orderId (Stripe).

5. Finalization:

The Verify Page sends the transaction ID back to the Backend.

The Backend captures the funds from the gateway.

Only after successful capture, the order is saved to the orders collection, and the user's cart is cleared.

Order Display Logic
To maintain a professional UI, the Orders page utilizes a CSS Grid System (grid-cols-[2fr_1fr_1fr]). This ensures that product details, payment status, and tracking buttons remain perfectly aligned regardless of product name length.

🤝 Contributing
For local development, ensure you use Sandbox Test Accounts for PayPal. Real accounts will result in a 401 Unauthorized error in the sandbox environment.
