import React from 'react';
import './Modal.css'; // Ensure to have appropriate modal styles

const ModalConfirmDelete = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-buttons">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
