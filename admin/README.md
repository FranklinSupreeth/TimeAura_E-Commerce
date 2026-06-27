# TimeAura Admin Dashboard

A separate admin application for managing orders, tracking status, and managing products for the TimeAura watch store.

## 🚀 Features

### Order Management

- **View All Orders**: Display all customer orders with columns for Order ID, Customer, Transaction ID, Amount, Status, and Payment Status
- **Filter Orders**: Filter orders by status (Pending, Processing, Shipped, Delivered, Cancelled, Returned)
- **Order Details**: View complete order information including:
  - Customer details and contact information
  - Order items with images and prices
  - Transaction ID and payment method
  - Estimated delivery date
- **Update Order Status**: Change order status and payment status with notes
- **Track Transactions**: View transaction IDs for all orders

### Dashboard

- Key metrics including Total Revenue, Active Orders, Total Orders, and Pending Orders
- Recent orders overview
- Visual indicators for payment and order status

### Product Management

- View all available products
- Delete products from inventory
- See product details (brand, category, price)

## 📁 Project Structure

```
admin/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx       # Admin dashboard with metrics
│   │   ├── OrdersPage.jsx      # Orders list and filtering
│   │   ├── OrderDetail.jsx     # Single order details and status update
│   │   └── ProductsPage.jsx    # Product management
│   ├── services/
│   │   └── apiService.js       # API calls to backend
│   ├── utils/
│   │   └── format.js           # Formatting utilities (currency, date, colors)
│   ├── App.jsx                 # Main app with routing and sidebar
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json
└── index.html                  # HTML entry point
```

## 🔌 API Endpoints Used

The Admin Dashboard connects to these backend endpoints:

### Orders API

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/status` - Update order status and payment status
- `GET /api/users/:userId/orders` - Get orders by user

### Products API

- `GET /api/products` - Get all products
- `DELETE /api/products/:id` - Delete product

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

```bash
cd admin
npm install
```

### Development

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:5174/`

### Production Build

```bash
npm run build
```

## 📊 Usage Guide

### Viewing Orders

1. Navigate to the "Orders" page from the sidebar
2. Use the filter buttons to view orders by status
3. Click the "View" button on any order to see details

### Updating Order Status

1. Go to an order's detail page
2. Select the new **Order Status** (Pending, Processing, Shipped, Delivered, Cancelled, Returned)
3. Select the new **Payment Status** (Pending, Completed, Failed, Refunded)
4. Optionally add **Notes** about the order
5. Click "Update Order Status" button

### Tracking Orders

- Each order has a unique **Order ID** (e.g., #ORD-7721)
- Each transaction has a **Transaction ID** (e.g., TXN-1234567890)
- Status is color-coded for easy identification
- Payment status shows payment completion state

## 🎨 Status Color Coding

### Order Status

- **Pending** - Yellow
- **Processing** - Blue
- **Shipped** - Purple
- **Delivered** - Green
- **Cancelled** - Red
- **Returned** - Orange

### Payment Status

- **Pending** - Yellow
- **Completed** - Green
- **Failed** - Red
- **Refunded** - Orange

## 🔧 Configuration

### Backend Connection

The admin dashboard is configured to connect to the backend at `http://localhost:5000`.

To change this:

1. Open `src/services/apiService.js`
2. Change the `API_URL` variable

```javascript
const API_URL = "http://your-backend-url/api";
```

## 📝 Environment

This admin dashboard requires:

- Backend server running (see main project README)
- MongoDB database connected
- All Order and Product models properly seeded

## 🚨 Important Notes

- The admin dashboard is separate from the main customer-facing application
- Both run on different ports (Customer: 5173, Admin: 5174)
- Ensure backend server is running before starting admin dashboard
- JWT authentication can be added for security (optional)

## 📚 Technologies Used

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Recharts** - Charts and graphs
- **Lucide React** - Icons

## 🎯 Future Enhancements

- Add authentication/login
- Implement order export (CSV, PDF)
- Add email notifications for order updates
- Advanced analytics and reporting
- Bulk order operations
- Customer communication history
