import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartItems, removeCart } from "../../redux/actions/cartAction";
import Checkout from "./Checkout";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);
  useEffect(() => {
    dispatch(cartItems(history)).then((data) => {
      setCarts(data);
    });
  }, []);

  const removeProduct = async (product) => {
    await dispatch(removeCart(product._id, history));
    await setCarts(carts.filter((c) => c._id !== product._id));
  };

  const totalPrice = () => {
    let price = 0;
    carts.map((c) => {
      price += c.product.price;
    });
    return price;
  };
  return (
    <div className="mt-5">
      {carts.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart._id}>
                  <td>{cart.product.title}</td>
                  <td>{cart.product.price}</td>
                  <td>
                    <strong
                      style={{ color: "red" }}
                      onClick={(e) => removeProduct(cart)}
                    >
                      X
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <h4>Total Price: {totalPrice()}</h4>
          <Checkout />
        </>
      )}
    </div>
  );
};

export default withRouter(Cart);
