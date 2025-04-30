import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./DeleteConfirmationModal.module.css";

function DeleteConfirmation() {
  // Get modal data from context
  const context = useContext(ContactContext);
  const shouldShowModal = context.showModal;
  const closeModalFunction = context.setShowModal;
  const modalSettings = context.modalConfig;

  if (!shouldShowModal) {
    return null;
  }

  function handleConfirmButton() {
    modalSettings.onConfirm();
    closeModalFunction(false);
  }

  function handleCancelButton() {
    closeModalFunction(false);
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{modalSettings.title}</h3>
        <p className={styles.modalMessage}>{modalSettings.message}</p>

        <div className={styles.modalActions}>
          <button
            onClick={handleConfirmButton}
            className={styles.confirmButton}
          >
            تایید
          </button>

          <button onClick={handleCancelButton} className={styles.cancelButton}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
