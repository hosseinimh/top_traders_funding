import React from "react";

const Modal = ({ id, children }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
