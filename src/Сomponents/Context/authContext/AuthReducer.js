import {
  LOGIN_USER,
  LOADING,
  LOGIN_ERROR,
  SET_KEY,
  SET_USER,
  ADMIN_AUTH,
  SET_ACCOUNT_TYPE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOGIN_USER:
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("param", action.payload.key);
      action.payload.account &&
        localStorage.setItem("account", action.payload.account);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        // accountType: account,
      };
    case LOGIN_ERROR:
      localStorage.removeItem("user");
      localStorage.removeItem("param");
      localStorage.removeItem("account");
      localStorage.removeItem("isAdm");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isAdm: false,
        accountType: "",
        user: "",
        key: "",
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case SET_KEY:
      return {
        ...state,
        key: action.payload,
        isAuthenticated: true,
      };
    case ADMIN_AUTH:
      localStorage.setItem("isAdm", true);
      return {
        ...state,
        isAdm: true,
        user: action.payload.user,
        key: action.payload.key,
      };
    case SET_ACCOUNT_TYPE:
      localStorage.setItem("account", action.payload);
      return {
        ...state,
        accountType: action.payload,
      };
    default:
      return state;
  }
};
