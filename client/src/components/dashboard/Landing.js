import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { getProducts } from "../../services/ajaxCalls";

const Landing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="mt-5">
      {products.map((product) => (
        <>
          <Row key={product._id}>
            <Col xs="4">
              <img
                id="customImage"
                src={product.image}
                alt=""
                width="150px"
                height="200px"
              />
            </Col>
            <Col xs="8" className="m-auto">
              <Row>
                <b>{product.title}</b>
              </Row>
              <Row>
                <b>Price: Rs {product.price}</b>
              </Row>
              <Row>{product.description}</Row>
              <Row>
                <Button color="success">Add To Cart</Button>
              </Row>
            </Col>
          </Row>
          <hr />
        </>
      ))}
    </div>
  );
};

export default Landing;
