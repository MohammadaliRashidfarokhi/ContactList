import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./ContactsGrid.module.css";

function ContactsGrid() {
  const contextData = useContext(ContactContext);
  const allContacts = contextData.contacts;
  const searchText = contextData.searchTerm;
  const setSearchText = contextData.setSearchTerm;
  const setEditContact = contextData.setEditingContact;
  const selectedIds = contextData.selectedContacts;
  const toggleSelection = contextData.toggleSelectContact;
  const deleteSelected = contextData.deleteContacts;
  const showDetails = contextData.setDetailContact;

  // Filter contacts based on search
  function getFilteredContacts() {
    let filtered = [];
    for (let i = 0; i < allContacts.length; i++) {
      const contact = allContacts[i];
      if (
        contact.name.includes(searchText) ||
        contact.email.includes(searchText) ||
        contact.phone.includes(searchText) ||
        contact.country.includes(searchText)
      ) {
        filtered.push(contact);
      }
    }
    return filtered;
  }

  // Deleting selected contacts
  function handleDeleteSelectedContacts() {
    deleteSelected(selectedIds);
  }

  const contactsToShow = getFilteredContacts();

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="جستجو..."
          value={searchText}
          onChange={function (e) {
            setSearchText(e.target.value);
          }}
          className={styles.searchInput}
        />

        {selectedIds.length > 0 && (
          <button
            onClick={handleDeleteSelectedContacts}
            className={styles.deleteSelectedButton}
          >
            حذف انتخاب شده‌ها ({selectedIds.length})
          </button>
        )}
      </div>

      {/* List of all contacts */}
      {contactsToShow.map(function (contact) {
        const isSelected = selectedIds.includes(contact.id);

        return (
          <div
            key={contact.id}
            className={`${styles.contactCard} ${
              isSelected ? styles.selected : ""
            }`}
          >
            <div className={styles.contactCheckbox}>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={function () {
                  toggleSelection(contact.id);
                }}
              />
            </div>

            {/* Contact info */}
            <div className={styles.contactInfo}>
              <h3 className={styles.contactName}>{contact.name}</h3>
              <p className={styles.contactEmail}>{contact.email}</p>
              <p className={styles.contactPhone}>{contact.phone}</p>
            </div>

            {/* Action buttons */}
            <div className={styles.contactActions}>
              <button
                onClick={function () {
                  showDetails(contact);
                }}
                className={styles.viewButton}
              >
                مشاهده
              </button>
              <button
                onClick={function () {
                  setEditContact(contact);
                }}
                className={styles.editButton}
              >
                ویرایش
              </button>
              <button
                onClick={function () {
                  deleteSelected([contact.id]);
                }}
                className={styles.deleteButton}
              >
                حذف
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactsGrid;
