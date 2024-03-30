// Modal.js
import React from "react";
import "./cssFiles/Modal.css";

const Modal = ({ isOpen, onClose, documentType }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{documentType === "pancard" ? "Pancard" : "Passport"} Model</h2>
            <button onClick={onClose}>Close</button>
            <button onClick={onClose}>Ok</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
