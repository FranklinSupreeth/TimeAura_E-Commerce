const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

console.log("MONGO_URI:", process.env.MONGO_URI);
const initialProducts = [
  {
    id: 1,
    name: "Submariner Date",
    brand: "Rolex",
    price: 12500,
    category: "Men",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80",
    description: "The benchmark among divers' watches."
  },
  {
    id: 2,
    name: "Classic Lady-Datejust",
    brand: "Rolex",
    price: 8400,
    category: "Women",
    image: "https://images.unsplash.com/photo-1730757679771-b53e798846cf?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Elegance and precision for the modern woman."
  },
  {
    id: 3,
    name: "Aqua Terra Luxury",
    brand: "Omega",
    price: 5400,
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80",
    description: "A tribute to maritime heritage."
  },
  {
    id: 4,
    name: "Chronograph Sport",
    brand: "Seiko",
    price: 3200,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80",
    description: "Built for speed and performance."
  },
  {
    id: 5,
    name: "Santos de Cartier",
    brand: "Cartier",
    price: 645000,
    category: "Men",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80",
    description: "One of the first modern wristwatches, designed for aviator Alberto Santos-Dumont, featuring exposed screws and a square dial."
  },
  {
    id: 6,
    name: "Tank FrançaiseLady-Datejust",
    brand: "Cartier",
    category: "Women",
    image: "https://media.rolex.com/image/upload/q_auto:eco/f_auto/t_v7/c_limit,w_1920/v1/catalogue/2025/upright-c/m279135rbr-0001",
    description: "An elegant blend of classic design and modern sophistication, featuring a stainless steel bracelet and a rectangular dial with Roman numerals.",
    price: 520000
  },
  {
    id: 7,
    name: "Rolex Deepsea",
    brand: "Rolex",
    price: 135000,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80",
    description: "Engineered for extreme underwater exploration, featuring a robust case, a helium escape valve, and exceptional water resistance up to 3,900 meters."
  }
];

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✓ Connected successfully");
    await Product.deleteMany({}); // Clears current products
    await Product.insertMany(initialProducts);
    console.log("✓ Vault Populated Successfully!");
    process.exit();
  } catch (err) {
    console.error("✗ Error:", err.message);
    process.exit(1);
  }
};

seedDB();