import React, { useContext, useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize";
import { Link } from "react-router-dom";
import FilterContext from "../Context/filterContext";
import AuthContext from "../Context/authContext/authContext";
import Modal from "./Modal";

const Navbar = () => {
  const filterContext = useContext(FilterContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, isAdm } = authContext;

  useEffect(() => {
    if (localStorage.param) {
      if (isAdm) {
        filterContext.clearAll();
      }
      authContext.loadUser();
      filterContext.getOrders();
      filterContext.getOrdersDelivery();
      filterContext.getCouriers();
    }
    console.log("changed");
    // eslint-disable-next-line
  }, [localStorage.user, localStorage.param, localStorage.account]);

  document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
  });

  return (
    <nav className="nav-extended" style={{ padding: "10px" }}>
      <div className="nav-wrapper">
        <h4 className="brand-logo" id="logo">
          Сервис доставки
        </h4>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {localStorage.isAdm && isAuthenticated && (
            <li>
              <a className="modal-trigger" href="#modal1">
                Bыбрать пользователя
              </a>
            </li>
          )}
          <li>
            {(isAuthenticated || localStorage.isAdm) && (
              <a
                type="button"
                onClick={() => {
                  authContext.logOut();
                  filterContext.clearAll();
                }}
              >
                Выйти
              </a>
            )}
          </li>
        </ul>
      </div>
      <div className="nav-content">
        {isAuthenticated && (
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <Link className="active" to="orders">
                Заказы
              </Link>
            </li>
            <li className="tab">
              <Link to="orders_delivery">
                Заказы на доставку
              </Link>
            </li>
            {user === "admin" && (
              <li className="tab">
                <Link to="couriers">Курьеры</Link>
              </li>
            )}
            <li className="tab">
              <Link to="archive">Архив</Link>
            </li>
          </ul>
        )}
        {isAdm && isAuthenticated && (
          <div id="account-about">
            <p>показанa учетная запись:</p>
            <div>
              <i className="fas fa-id-card" />
              <p>{localStorage.account}</p>
            </div>
          </div>
        )}
      </div>
      <Modal />
    </nav>
  );
};

export default Navbar;
