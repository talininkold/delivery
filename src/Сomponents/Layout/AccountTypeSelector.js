import React, { useContext } from "react";
import AuthContext from "../Context/authContext/authContext";

const AccountTypeSelector = () => {
  const { accountType, setAccountType } = useContext(AuthContext);
  return (
    <select
      style={{ display: "block", fontSize: "1rem" }}
      className="my-10"
      onChange={(e) => setAccountType(e.target.value)}
      value={accountType}
    >
      <option value="" selected disabled>
        ...
      </option>
      <option value="samokatbook">samokatbook</option>
      <option value="inSales">Insales</option>
    </select>
  );
};

export default AccountTypeSelector;
