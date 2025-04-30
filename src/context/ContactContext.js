import React, { createContext, useState } from "react";

export const ContactContext = createContext();

export function ContactProvider(props) {
  // Dummy data
  const initialContacts = [
    {
      id: 1,
      name: "سادق",
      email: "Sadegh.sadeghi@gmail.com",
      sex: "مرد",
      phone: "+989121234567",
      country: "ایران",
      address: "تهران",
    },
    {
      id: 2,
      name: "کیمیا مبادی",
      email: "Kimiya.moradi@gmail.com",
      sex: "زن",
      phone: "+989123456789",
      country: "ایران",
      address: "مشهد",
    },
    {
      id: 3,
      name: "رضا احمدی",
      email: "reza.ahmadi@example.com",
      sex: "مرد",
      phone: "+989124567890",
      country: "ایران",
      address: "اصفهان، خیابان امام خمینی",
    },
    {
      id: 4,
      name: "نرگس محمدی",
      email: "narges.mohammadi@example.com",
      sex: "زن",
      phone: "+989321654987",
      country: "ایران",
      address: "شیراز، بلوار آزادی",
    },
    {
      id: 5,
      name: "امیرحسین رضایی",
      email: "amir.rezaei@example.com",
      sex: "مرد",
      phone: "+989357951468",
      country: "ایران",
      address: "تبریز، میدان ساعت",
    },
  ];

  const [contactsList, setContactsList] = useState(initialContacts);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState(null);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [contactDetails, setContactDetails] = useState(null);

  function handleAddContact(newContact) {
    const contactWithId = {
      ...newContact,
      id: Date.now(),
    };
    setContactsList([...contactsList, contactWithId]);
  }

  function handleUpdateContact(updatedContact) {
    const updatedList = contactsList.map((contact) => {
      if (contact.id === updatedContact.id) {
        return updatedContact;
      }
      return contact;
    });
    setContactsList(updatedList);
  }

  function handleDeleteContacts(idsToDelete) {
    const filteredContacts = contactsList.filter((contact) => {
      return !idsToDelete.includes(contact.id);
    });
    setContactsList(filteredContacts);
    setSelectedContactIds([]);
  }

  function handleToggleSelect(id) {
    if (selectedContactIds.includes(id)) {
      setSelectedContactIds(
        selectedContactIds.filter((contactId) => contactId !== id)
      );
    } else {
      setSelectedContactIds([...selectedContactIds, id]);
    }
  }

  const contextValues = {
    contacts: contactsList,
    searchTerm: searchText,
    setSearchTerm: setSearchText,
    showModal: isModalVisible,
    setShowModal: setIsModalVisible,
    modalConfig: modalOptions,
    setModalConfig: setModalOptions,
    editingContact: contactToEdit,
    setEditingContact: setContactToEdit,
    selectedContacts: selectedContactIds,
    toggleSelectContact: handleToggleSelect,
    detailContact: contactDetails,
    setDetailContact: setContactDetails,
    addContact: handleAddContact,
    updateContact: handleUpdateContact,
    deleteContacts: handleDeleteContacts,
  };

  return (
    <ContactContext.Provider value={contextValues}>
      {props.children}
    </ContactContext.Provider>
  );
}
