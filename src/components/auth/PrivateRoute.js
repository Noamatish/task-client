import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const user = useSelector((state) => state.authSlice.user);
  if (user) {
    return <Route component={Component} path={path} {...rest} />;
  }
  return <Redirect to="/home" />;
};

export default PrivateRoute;
