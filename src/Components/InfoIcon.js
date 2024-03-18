import React, { useState } from "react";
import Modal from "react-modal";

export default function InfoIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="info-icon-container">
      <span
        className="info-icon"
        onMouseEnter={() => setIsModalOpen(true)}
        onMouseLeave={() => setIsModalOpen(false)}
      >
        &#8505;
      </span>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Rules Modal"
        className="rules-modal"
        overlayClassName="rules-modal-overlay"
      >
        <h2 id="rules-heading">Rules</h2>
        <ul className="rules-list">
          <li>Grid must be at least 4 squares</li>
          <li>Rows and Columns must be between 2 and 6</li>
          <li>Grid size must have an even number of squares</li>
          <li>Total number of squares in the grid must be 12 or less</li>
        </ul>
      </Modal>
    </div>
  );
}
