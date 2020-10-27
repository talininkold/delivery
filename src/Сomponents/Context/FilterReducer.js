import {
  GET_ORDERS,
  GET_ORDERS_DELIVERY,
  FILTER_ORDERS,
  CLEAR_ORDERS,
  CLEAR_ORDERS_FILTERS,
  PHONE_FILTER,
  NAME_FILTER,
  ID_FILTER,
  SET_LOADING,
  СLEAR_FILTER,
  GET_COURIER,
  COURIER_PHONE,
  ADD_COURIER,
  GET_ARCHIVE,
  FILTER_ARCHIVE,
  CLEAR_ARCHIVE,
  CLEAR_ARCHIVE_FILTER,
  DELETE_COURIER,
  ORDER_ID_FILTER,
  CLEAR_ALL
} from './types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case GET_ORDERS_DELIVERY:
      return {
        ...state,
        ordersD: action.payload
      };
    case FILTER_ORDERS:
      return {
        ...state,
        ordersF: state.orders.filter((tr) => {
          const {filter, param} = action.payload;
          if (filter === 'name') {
            return tr[0] == param || tr[0] == 'ФИО водителя'
          } if (filter === 'phone') {
            return tr[1] == param || tr[1] == 'Номер телефона\nводителя'
          } else {
            return tr[2] == param || tr[2] == 'chatID'
          }
        })
      }
    case CLEAR_ORDERS:
      return {
        ...state,
        [action.payload]: null
      };
    case CLEAR_ORDERS_FILTERS:
      return {
        ...state,
        ordersF: null
      }
    case NAME_FILTER:
      return {
        ...state,
        array: action.payload
      };
    case PHONE_FILTER:
      return {
        ...state,
        array: action.payload
      };
    case ID_FILTER:
      return {
        ...state,
        array: action.payload
      };
    case ORDER_ID_FILTER:
      return {
        ...state,
        archiveF: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case СLEAR_FILTER:
      return {
        ...state,
        array: null
      }
    case GET_COURIER:
      return {
        ...state,
        couriers: action.payload
      }
    case COURIER_PHONE:
      return {
        ...state,
        courierPhone: action.payload
      }
    case ADD_COURIER:
      return {
        ...state,
        courierPhone: [...state.courierPhone, action.payload]
      }
    case DELETE_COURIER:
      return {
        ...state,
        courierPhone: state.courierPhone.filter((item, index) => (index === 0 ? item[0] === 'Phone' : item[0] != action.payload))
      }
    case GET_ARCHIVE:
      return {
        ...state,
        archive: action.payload
      }
    case CLEAR_ARCHIVE:
      return {
        ...state,
        archive: [],
        archiveF: null
      }
    case CLEAR_ARCHIVE_FILTER:
      return {
        ...state,
        archiveF: null
      }
    case FILTER_ARCHIVE:
      return {
        ...state,
        archiveF: state.archive.filter((tr) => {
          const {filter, param} = action.payload;
          if (filter === 'name') {
            return tr[0] == param || tr[0] == 'ФИО водителя'
          } if (filter === 'phone') {
            return tr[1] == param || tr[1] == 'Номер телефона\nводителя'
          } else {
            return tr[2] == param || tr[2] == 'chatID'
          }
        })
      }
    case CLEAR_ALL:
      return {
        ...state,
        loading: false,
        orders: null,
        ordersD: null,
        ordersF: null,
        array: null,
        couriers:[],
        courierPhone:[],
        archive: [],
        archiveF: null
      }
    default:
      return state;
  }
};