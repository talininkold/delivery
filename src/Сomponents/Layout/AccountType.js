import React, { useContext } from "react";
import AccountTypeSelector from "./AccountTypeSelector";
import AuthContext from "../Context/authContext/authContext";

const AccountType = () => {
  const { changeAccount, user, key } = useContext(AuthContext);

  const onLogin = () => {
    changeAccount(user, key);
  };

  return (
    <div>
      <h5>Добрый день!</h5>
      <h6>Вы вошли в систему как администратор</h6>
      <p>
        Чтобы выбрать, какую учетную запись Bы хотите открыть, используйте
        выпадающee меню и кнопку «Выбрать пользователя»
      </p>
      <div className="my-10" id="change-account-form">
        <AccountTypeSelector />
        <a className="btn btn-primary my-10" onClick={onLogin}>
          пepeйти
        </a>
      </div>
    </div>
  );
};

export default AccountType;
