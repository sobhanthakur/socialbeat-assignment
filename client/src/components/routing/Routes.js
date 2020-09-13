import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../components/auth/Login";
import AlertComponent from "../layout/AlertComponent";
import PrivateRoute from "./PrivateRoute";
import Landing from "../dashboard/Landing";
import { useSelector } from "react-redux";
import Register from "../auth/Register";
import Cart from "../dashboard/Cart";
import Admin from "../dashboard/Admin";

const Routes = (props) => {
  const state = useSelector((state) => ({
    auth: state.authReducer.isAuthenticated,
  }));
  return (
    <div className="container">
      <AlertComponent></AlertComponent>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Landing}></Route>
        <PrivateRoute exact path="/cart" component={Cart}></PrivateRoute>
        <Route exact path="/admin" component={Admin}></Route>
      </Switch>
    </div>
  );
};

export default Routes;
