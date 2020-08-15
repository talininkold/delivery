import React, { useReducer } from 'react';
import AuthContext from './authContext'
import AuthReducer from './AuthReducer'
import M from 'materialize-css/dist/js/materialize.min.js'
import {
  LOGIN_USER,
  LOADING,
  LOGIN_ERROR,
  SET_KEY,
  SET_USER,
  SET_LOADING
} from '../types';

const AuthState = props => {
  const initialState = {
    loading: false,
    isAuthenticated: false,
    key: '',
    user: ''
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Login user
  const loginUser = async (login, pass) => {
    dispatch({type: LOADING, payload: true})
    const res = await fetch(`https://script.google.com/macros/s/AKfycbzXebhTNiUhnUgjXLkevAlwVlN6_0pmb-xOxzyB-g3pR8qj_0A/exec?login=${login}&password=${pass}`)
    const data = await res.json();
    const user = data.user[0] 
    const key = data.key[0]
    if (user === 'admin' || user === 'supplier') {
      dispatch({type: LOGIN_USER, payload: {user, key}})
      M.toast({html: 'Вы успешно вошли'})
    } else {
      M.toast({html: 'Неверные имя пользователя или пароль'})
      dispatch({type: LOGIN_ERROR})
    }
    console.log(user, key)
  }

  const loadUser = () => {
    if (localStorage.user) {
      dispatch({type:SET_USER, payload: localStorage.user})
    }
    if (localStorage.param) {
      dispatch({type:SET_KEY, payload: localStorage.param})
    }
  }

  const logOut = () => {
    dispatch({type: LOGIN_ERROR})
  }
  
  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        key: state.key,
        user: state.user,
        loginUser,
        loadUser,
        logOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;