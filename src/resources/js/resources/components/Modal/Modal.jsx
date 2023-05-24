import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setShownModalAction } from "../../../state/layout/layoutActions";

const Modal = ({ id, title, children, show = false }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(show);

  useEffect(() => {
    if (showModal) {
      dispatch(setShownModalAction(id));
    } else {
      dispatch(setShownModalAction(null));
    }
  }, [showModal]);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="modalbox"
      id={id}
      style={{ display: showModal ? "flex" : "none" }}
    >
      <div className="modal">
        <div className="modal-hd">
          <span>
            <i
              className="modal-close icon-close-circle4 mxdir-10"
              onClick={hideModal}
            />
            {title}
          </span>
        </div>
        <div className="modal-main">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
