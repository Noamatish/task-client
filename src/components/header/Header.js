import React from "react";
import { useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const logout = () => {
      localStorage.clear('token');
      window.location.reload();
  };
  const user = useSelector((state) => state.authSlice.user);
  const toHome = () => {
     history.push("/home");
  };
  const toRegister = () => {
     history.push("/register");
  };

  const toLogin = () => {
     history.push("/login");
  };

  const toEmails = () => {
     history.push("/");
  };

  return (
    <div id="header-container">
        <p onClick={toHome} >Home</p>
        {user ?
        <>
        <p onClick={toEmails} >Emails</p>
        <p onClick={logout} >Logout</p>
        </>
        :
        <>
        <p onClick={toLogin} >Login</p>
        <p onClick={toRegister} >Register</p>
        </>
         }
    </div>
  );
}

export default Header;
