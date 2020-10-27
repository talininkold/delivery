import React, { useReducer } from "react";
import FilterContext from "../Context/filterContext";
import FilterReducer from "../Context/FilterReducer";
import M from "materialize-css/dist/js/materialize.min.js";
import {
  GET_ORDERS,
  GET_ORDERS_DELIVERY,
  CLEAR_ORDERS,
  FILTER_ORDERS,
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
  CLEAR_ALL,
} from "../Context/types";

const FilterState = (props) => {
  const initialState = {
    loading: false,
    orders: null,
    ordersD: null,
    // orders: [["ФИО водителя","Номер телефона\nводителя","chatID","DN","PN","Street","Dot","TimeOpen","TimeClose","Status","ID","Операция","Сумма","ФИО","Телефон","Товары","Оплата","Проверка оплаты"],
    // ["","","",1,1,"Россия, Москва, ул. Проспект мира, д.49, к.44","37.633859 55.783494","","","",8579,"Отправить в Каршеринг",3364,"Ника",79645196578,"УТ-00001339 Летняя книга 907 1 907УТ-00000581 Почтальон Мышка 454 1 454УТ-00001179 Карнавал зверей 454 1 454УТ-00001332 Комиссары Гордон и Жаби. Самый большой самый маленький \nполицейский 378 1 378УТ-00001260 Марта с черепами 340 1 340УТ-00001365 Звери на ковчеге 491 1 491УТ-00000950 Правила жизни 340 1 340","Банковской картой","Да"],
    // ["Безгубенко Данила",79151401471,96635166,1,7,"Россия, Москва, Воронцовские пруды, 7, 11","37.53305 55.663964","2020-06-05\n 07:58:16","2020-06-05\n 08:30:12","Done",7871,"Доставка",5405,"Анна Мелешкина",9161244069,["","УТ-00001382 Флон-Флон и Мюзетт 336 1 336","УТ-00001330 Супер обычный день 588 1 588","УТ-00001188 Лисёнок Гон 504 1 504","УТ-00001392 Для тех, кто учится читать 1500 1 1500","УТ-00001391 Книжный сет для дошкольников с картинками 1500 1 1500","УТ-00001049 Дар неудачи. Отпустите детей — они сами справятся 462 1 462","УТ-00000846 Должно ли детство быть счастливым? 210 1 210 ","ORDER_DELIVERY Доставка заказа 305 1 305 "],"Банковской картой","Да"],
    // ["Евгений",79637181545,982814374,2,1,"Россия, Москва, 105264, Москва, ул. 3-я Парковая, д. 36к3, кв.54, код В54В5414","37.783258 55.808437","2020-06-05\n 03:30:27","2020-06-05\n 05:26:47","Done",7808,"Доставка",2052,"Юрий Максюта",79104520376,["","УТ-00001362 Река, текущая вспять 588 1 588","УТ-00001260 Марта с черепами 378 1 378","УТ-00000819 Не/справедливость 149 1 149","УТ-00000849 Фридрих Львиный Зев. Верхом на шмеле 672 1 672 ","ORDER_DELIVERY Доставка заказа 265 1 265 "],"Банковской картой","Да"]],
    ordersF: null,
    array: null,
    couriers: [],
    courierPhone: [],
    archive: [],
    archiveF: null,
    url: {
      samokatbook:
        "https://script.google.com/macros/s/AKfycbzXebhTNiUhnUgjXLkevAlwVlN6_0pmb-xOxzyB-g3pR8qj_0A/exec",
      inSales:
        "https://script.google.com/macros/s/AKfycbwfzdnkBUt-lXhDK0Fw2OzEB7CcuVycu2kqJbbB5LMGcLS9oXs/exec",
    },
  };

  const [state, dispatch] = useReducer(FilterReducer, initialState);

  // Add line breakes function
  const lineBreakes = (array) => {
    let arr = [];
    array.forEach(function (item, index) {
      if (index === 0) {
        arr.push(item);
      } else {
        let newItem = item[15]
          .split("УТ")
          .join("<br>УТ")
          .split("ORDER_DELIVERY")
          .join("<br>ORDER_DELIVERY")
          .split("<br>");
        // let newDate1 = item[7].replace('T', '\n ').slice(0, -5);
        // let newDate2 = item[8].replace('T', '\n ').slice(0, -5);
        item[15] = newItem;
        // item[7] = newDate1;
        // item[8] = newDate2;
        arr.push(item);
      }
    });
    return arr;
  };

  // GET ALL CURRENT ORDERS
  const getOrders = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await fetch(
      `${state.url[localStorage.account]}?query=online&key=${
        localStorage.param
      }`
    );
    const data = await res.json();
    const dataLineBreakes = lineBreakes(data.data);
    dispatch({ type: GET_ORDERS, payload: dataLineBreakes });
    // console.log("orders are here");
    dispatch({ type: SET_LOADING, payload: false });
  };

  const getOrdersDelivery = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    const res = await fetch('https://script.google.com/macros/s/AKfycbzXebhTNiUhnUgjXLkevAlwVlN6_0pmb-xOxzyB-g3pR8qj_0A/exec?orderList');
    const data = await res.json();
    const dataLineBreakes = lineBreakes(data.data);
    dispatch({ type: GET_ORDERS_DELIVERY, payload: dataLineBreakes });
    dispatch({ type: SET_LOADING, payload: false });
  };

  // CLEAR (REFRESH) CURRENT ORDERS
  const clearOrders = async (param) => {
    dispatch({ type: CLEAR_ORDERS, payload: param });
  };

  // FILTER ORDERS
  const filterOrders = (filter, param) => {
    dispatch({ type: FILTER_ORDERS, payload: { filter, param } });
    console.log("orders are filtered");
  };

  // CLEAR ORDERS FILTERS
  const clearOrdersFilters = () => {
    dispatch({ type: CLEAR_ORDERS_FILTERS });
  };

  // Name filter
  const onName = async (text) => {
    if (text === "") {
      M.toast({ html: "Введите данные" });
    } else {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await fetch(
        `${state.url[localStorage.account]}?name=${text}&key=${
          localStorage.param
        }`
      );
      const data = await res.json();
      const dataLineBreakes = lineBreakes(data.data);
      dispatch({ type: NAME_FILTER, payload: dataLineBreakes });
      // console.log("name filtered");
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  // Phone filter
  const onPhone = async (text) => {
    if (text === "") {
      M.toast({ html: "Введите данные" });
    } else {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await fetch(
        `${state.url[localStorage.account]}?phone=${text}&key=${
          localStorage.param
        }`
      );
      const data = await res.json();
      const dataLineBreakes = lineBreakes(data.data);
      dispatch({ type: PHONE_FILTER, payload: dataLineBreakes });
      // console.log("phone filtered");
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
  // Id filter
  const onId = async (text) => {
    if (text === "") {
      M.toast({ html: "Введите данные" });
    } else {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await fetch(
        `${state.url[localStorage.account]}?chatid=${text}&key=${
          localStorage.param
        }`
      );
      const data = await res.json();
      const dataLineBreakes = lineBreakes(data.data);
      dispatch({ type: ID_FILTER, payload: dataLineBreakes });
      console.log("id filtered");
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  // Order Id filter
  const onOrderId = async (number) => {
    if (number !== "") {
      dispatch({ type: SET_LOADING, payload: true });
      const res = await fetch(
        `${state.url[localStorage.account]}?ArchiveID=${number}&key=${
          localStorage.param
        }`
      );
      const data = await res.json();
      const dataLineBreakes = lineBreakes(data.data);
      dispatch({ type: ORDER_ID_FILTER, payload: dataLineBreakes });
      console.log("order id filtered");
      dispatch({ type: SET_LOADING, payload: false });
    }
  };

  // clear filters
  const clearFilter = () => {
    dispatch({ type: СLEAR_FILTER });
  };

  // GET COURIERS
  const getCouriers = async () => {
    const res = await fetch(`${state.url[localStorage.account]}?query=users`);
    const data = await res.json();
    dispatch({ type: COURIER_PHONE, payload: data.data });
    let couriers = [];
    if (data) {
      for (let i = 1; i < data.data.length; i++) {
        couriers.push(data.data[i][1]);
      }
    }
    dispatch({ type: GET_COURIER, payload: couriers });
  };

  // ADD COURIER
  const addCourier = async (courier) => {
    try {
      dispatch({ type: ADD_COURIER, payload: [courier.phone, courier.name] });
      await fetch(
        `${state.url[localStorage.account]}?query=newuser&phoneSet=${
          courier.phone
        }&nameSet=${courier.name}`
      );
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // GET ARCHIVE FOR CURRENT DATES
  const getArchive = async (d1, d2) => {
    dispatch({ type: SET_LOADING, payload: true });
    // console.log(`data 1 ${d1} and data 2 ${d2}`);
    const d2End = d2 + 86340000;
    const res = await fetch(
      `${state.url[localStorage.account]}?ArchiveDate=${
        d1 - d2End > 0 ? d2End : d1
      }&ArchiveDate=${d1 - d2End > 0 ? d1 : d2End}&key=${localStorage.param}`
    );
    const data = await res.json();
    const dataLineBreakes = lineBreakes(data.data);
    dispatch({ type: GET_ARCHIVE, payload: dataLineBreakes });
    // console.log("archive is here");
    dispatch({ type: SET_LOADING, payload: false });
  };

  // FILTER ARCHIVE
  const filterArchive = (filter, param) => {
    dispatch({ type: FILTER_ARCHIVE, payload: { filter, param } });
    console.log("archive is filtered");
  };
  // CLEAR ARCHIVE
  const clearArchive = () => {
    dispatch({ type: CLEAR_ARCHIVE });
  };
  // CLEAR ARCHIVE FILTERS
  const clearArchiveFilters = () => {
    dispatch({ type: CLEAR_ARCHIVE_FILTER });
  };
  //  DELETE COURIER
  const onDeleteCourier = async (tel) => {
    try {
      dispatch({ type: DELETE_COURIER, payload: tel });
      console.log(tel);
      await fetch(
        `${state.url[localStorage.account]}?query=deluser&phoneDel=${tel}`
      );
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const clearAll = () => {
    dispatch({ type: CLEAR_ALL });
  };

  return (
    <FilterContext.Provider
      value={{
        orders: state.orders,
        ordersF: state.ordersF,
        ordersD: state.ordersD,
        array: state.array,
        loading: state.loading,
        couriers: state.couriers,
        courierPhone: state.courierPhone,
        archive: state.archive,
        archiveF: state.archiveF,
        url: state.url,
        getOrders,
        getOrdersDelivery,
        filterOrders,
        clearOrders,
        clearOrdersFilters,
        onName,
        onPhone,
        onId,
        onOrderId,
        clearFilter,
        getCouriers,
        addCourier,
        getArchive,
        filterArchive,
        clearArchive,
        clearArchiveFilters,
        onDeleteCourier,
        clearAll,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;
