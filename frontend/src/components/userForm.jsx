import React, { useState, useEffect } from "react";

const UserForm = ({ editingUser, setEditingUser, onUserSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
    photo: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        dob: editingUser.dob.split("T")[0],
        email: editingUser.email,
        mobile: editingUser.mobile,
        photo: null,
      });
    }
  }, [editingUser]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.dob) newErrors.dob = "DOB required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "10-digit mobile required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    if (formData.photo) formDataToSend.append("photo", formData.photo);

    try {
      if (editingUser) {
        await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          body: formDataToSend,
        });
      }
      setFormData({ name: "", dob: "", email: "", mobile: "", photo: null });
      setEditingUser(null);
      setErrors({});
      onUserSaved();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="date"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="tel"
        placeholder="Mobile"
        value={formData.mobile}
        maxLength="10"
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFormData({ ...formData, photo: e.target.files[0] })
        }
      />
      <button type="submit">{editingUser ? "Update" : "Add"} User</button>
      {editingUser && (
        <button type="button" onClick={() => setEditingUser(null)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserForm;
