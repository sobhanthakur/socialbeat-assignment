import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../types";
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

    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
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
