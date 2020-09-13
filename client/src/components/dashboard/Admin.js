import React, { useEffect } from "react";
import { getOrders } from "../../services/ajaxCalls";
import { useState } from "react";
import { Table } from "reactstrap";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  return (
    <div className="container mt-5">
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Email</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order[0].createdAt.split("T")[0]}</td>
              <td>{order[0].details.email}</td>
              <td>
                {order.map((inner) => (
                  <>
                    {inner.product.title}
                    <br />
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
