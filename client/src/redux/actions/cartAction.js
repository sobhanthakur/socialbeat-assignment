import axios from "axios";
import { setAlert } from "./alertAction";

// Add to Cart
export const addToCart = (product, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ productid: product._id });
    const res = await axios.post("/api/orders", body, config);

    dispatch(setAlert("Product Added To Cart", "success", 4000));
  } catch (err) {
    if (err.response.status === 401) {
      console.log(err.response);
      history.push("/login");
    } else {
      dispatch(setAlert(err.response.data.msg, "danger", 4000));
    }
  }
};

// Get Cart Items
export const cartItems = (history) => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders");
    return res.data;
  } catch (err) {
    if (err.response.status === 401) {
      console.log(err.response);
      history.push("/login");
    } else {
      dispatch(setAlert(err.response.data.msg, "danger", 4000));
    }
  }
};

// Get Cart Items
export const removeCart = (id, history) => async (dispatch) => {
  try {
    await axios.delete("/api/orders/" + id);
    dispatch(setAlert("Cart Item Removed", "success", 4000));
  } catch (err) {
    if (err.response.status === 401) {
      console.log(err.response);
      history.push("/login");
    } else {
      dispatch(setAlert(err.response.data.msg, "danger", 4000));
    }
  }
};

// Checkout
export const checkout = (payload, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put("/api/orders", payload, config);
    dispatch(setAlert("Order Placed", "success", 4000));
    history.push("/");
  } catch (err) {
    if (err.response.status === 401) {
      console.log(err.response);
      history.push("/login");
    } else {
      dispatch(setAlert(err.response.data.msg, "danger", 4000));
    }
  }
};
