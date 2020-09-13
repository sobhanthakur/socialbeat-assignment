import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { getProducts } from "../../services/ajaxCalls";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { withRouter, Link } from "react-router-dom";

const Landing = ({ history }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="mt-5">
      <Link to="/cart">
        <Button color="warning" className="mb-3">
          Go To Cart
        </Button>
      </Link>
      {products.map((product) => (
        <React.Fragment key={product._id}>
          <Row>
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
                <Button
                  color="success"
                  onClick={(e) => dispatch(addToCart(product, history))}
                >
                  Add To Cart
                </Button>
              </Row>
            </Col>
          </Row>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default withRouter(Landing);
