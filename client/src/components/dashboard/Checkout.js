import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkout } from "../../redux/actions/cartAction";

const Checkout = ({ history }) => {
  const [modal, setModal] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
  });

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(checkout(formdata, history));
  };
  return (
    <div>
      <Button color="warning" onClick={toggle}>
        Checkout
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Enter Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => onSubmit(e)}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                value={formdata.email}
                onChange={(e) =>
                  setFormdata({ ...formdata, email: e.target.value })
                }
                placeholder="Enter email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                value={formdata.name}
                onChange={(e) =>
                  setFormdata({ ...formdata, name: e.target.value })
                }
                placeholder="Enter Name"
                required
              />
            </FormGroup>
            <Button color="success">Place Order</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(Checkout);
