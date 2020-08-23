import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../Context/authContext/authContext";

const PrivateRoute = ({ component: Component, type, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;
  const isAvailable = type.includes(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          isAvailable && <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
