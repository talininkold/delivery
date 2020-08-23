import React from "react";
import AccountTypeSelector from "./AccountTypeSelector";

const Modal = () => {
  return (
    <div id="modal1" className="modal">
      <div className="modal-content" style={{ color: "#000" }}>
        <h4>Bыберите аккаунт</h4>
        <div className="input-field col s12">
          <AccountTypeSelector />
        </div>
      </div>
      <div className="modal-footer">
        {/* <a href="#!" className="modal-close btn-flat">
          Применить
        </a> */}
        <a href="#!" className="modal-close btn-flat">
          закрыть
        </a>
      </div>
    </div>
  );
};

export default Modal;
