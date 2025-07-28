 import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTrash,
  FaEdit,
  FaSearch,
} from "react-icons/fa";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddContact = () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    setContacts([...contacts, formData]);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    if (isEditing && index === editIndex) {
      setIsEditing(false);
      setFormData({ name: "", email: "", phone: "" });
    }
  };

  const handleEdit = (index) => {
    setFormData(contacts[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updated = [...contacts];
    updated[editIndex] = formData;
    setContacts(updated);
    setFormData({ name: "", email: "", phone: "" });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="app-container">
      <h1 className="app-header">Contact Manager</h1>

      <div className="contact-form-card">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        {isEditing ? (
          <button className="add-contact-btn" onClick={handleUpdate}>
            Update Contact
          </button>
        ) : (
          <button className="add-contact-btn" onClick={handleAddContact}>
            Add Contact
          </button>
        )}
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search contacts..."
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      <h2 className="contact-list-title">Saved Contacts</h2>

      {filteredContacts.map((contact, index) => (
        <div className="contact-card" key={index}>
          <div className="image-wrapper no-image">👤</div>

          <div className="contact-info">
            <div className="info-item">
              <FaUser className="info-icon" />
              <p>{contact.name}</p>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <p>{contact.email}</p>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <p>{contact.phone}</p>
            </div>
          </div>

          <div className="card-actions">
            <button
              className="edit-button"
              onClick={() => handleEdit(index)}
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(index)}
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
