import {
  LOGIN_USER,
  LOADING,
  LOGIN_ERROR,
  SET_KEY,
  SET_USER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOGIN_USER:
      localStorage.setItem('user', action.payload.user)
      localStorage.setItem('param', action.payload.key)
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case LOGIN_ERROR:
      localStorage.removeItem('user')
      localStorage.removeItem('param')
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: '',
        key: ''
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }
    case SET_KEY:
      return {
        ...state,
        key: action.payload,
        isAuthenticated: true
      }
    default:
      return state;
  }
};