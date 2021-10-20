import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthRoute = ({ component: Component, path, ...props }) => {
  const user = useSelector((state) => state.authSlice.user);
  if (user) {
    return <Redirect to="/" />;
  }
  return <Route component={Component} path={path} {...props} />;
};

export default AuthRoute;
