import React, { useContext, Fragment } from "react";
import AuthContext from "../Context/authContext/authContext";
import Login from "../Layout/Login";
import AccountType from "../Layout/AccountType";
import { Redirect } from "react-router-dom";

const FirstPage = () => {
  const { isAuthenticated, isAdm } = useContext(AuthContext);
  return (
    <Fragment>
      {!isAuthenticated ? (
        isAdm ? (
          <AccountType />
        ) : (
          <Login />
        )
      ) : (
        <Redirect to="/orders" />
      )}
      {/* {!isAuthenticated ? (
        <Login />
      ) : !isAdm ? (
        <Redirect to="/orders" />
      ) : (
        <AccountType />
      )} */}
    </Fragment>
  );
};

export default FirstPage;
