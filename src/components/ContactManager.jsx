import React, { useState, useContext, useEffect } from "react";
import { ContactContext } from "../context/ContactContext";
import styles from "./ContactManager.module.css";

function ContactManager() {
  const { addContact, updateContact, editingContact, setEditingContact } =
    useContext(ContactContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    sex: "مرد",
    phone: "",
    country: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setForm({
        name: editingContact.name || "",
        email: editingContact.email || "",
        sex: editingContact.sex || "مرد",
        phone: editingContact.phone || "",
        country: editingContact.country || "",
        address: editingContact.address || "",
      });
    } else {
      resetForm();
    }
  }, [editingContact]);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      sex: "مرد",
      phone: "",
      country: "",
      address: "",
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "نام الزامی است";
    if (/\d/.test(form.name)) errors.name = "نام نباید شامل عدد باشد";
    if (!form.email.trim()) errors.email = "ایمیل الزامی است";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "فرمت ایمیل نامعتبر است";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const contactData = {
      ...form,
      id: editingContact?.id || Date.now(),
    };

    if (editingContact) {
      updateContact(contactData);
    } else {
      addContact(contactData);
    }

    resetForm();
    setEditingContact(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {editingContact ? "ویرایش مخاطب" : "افزودن مخاطب جدید"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>نام و نام خانوادگی</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`${styles.input} ${
              formErrors.name ? styles.errorInput : ""
            }`}
          />
          {formErrors.name && (
            <span className={styles.error}>{formErrors.name}</span>
          )}
        </div>

        {/* Email field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>ایمیل</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`${styles.input} ${
              formErrors.email ? styles.errorInput : ""
            }`}
          />
          {formErrors.email && (
            <span className={styles.error}>{formErrors.email}</span>
          )}
        </div>

        {/* Gender field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>جنسیت</label>
          <select
            name="sex"
            value={form.sex}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="مرد">مرد</option>
            <option value="زن">زن</option>
          </select>
        </div>

        {/* Phone field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>شماره تلفن</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Country field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>کشور</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        {/* Address field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>آدرس</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className={styles.input}
            rows="3"
          />
        </div>

        {/* Buttons */}
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            {editingContact ? "ذخیره تغییرات" : "افزودن مخاطب"}
          </button>

          {editingContact && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setEditingContact(null);
              }}
              className={styles.cancelButton}
            >
              انصراف
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactManager;
