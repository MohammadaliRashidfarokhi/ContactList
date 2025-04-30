import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./ContactViewModal.module.css";

function ContactView() {
  const { detailContact, setDetailContact } = useContext(ContactContext);

  if (!detailContact) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={() => setDetailContact(null)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={() => setDetailContact(null)}
        >
          &times;
        </button>

        <h2 className={styles.modalTitle}>جزئیات مخاطب</h2>

        <div className={styles.detailSection}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>نام:</span>
            <span className={styles.detailValue}>{detailContact.name}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>ایمیل:</span>
            <span className={styles.detailValue}>{detailContact.email}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>جنسیت:</span>
            <span className={styles.detailValue}>
              {detailContact.sex === "مرد" ? "مرد" : "زن"}
            </span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>تلفن:</span>
            <span className={styles.detailValue}>{detailContact.phone}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>کشور:</span>
            <span className={styles.detailValue}>{detailContact.country}</span>
          </div>

          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>آدرس:</span>
            <span className={styles.detailValue}>{detailContact.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactView;
