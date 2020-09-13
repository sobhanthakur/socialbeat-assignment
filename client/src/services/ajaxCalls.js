import axios from "axios";

// Get All Products
export const getProducts = async () => {
  try {
    const res = await axios.get("/api/products");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Get All Orders
export const getOrders = async () => {
  try {
    const res = await axios.get("/api/orders/all");
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
