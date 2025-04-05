import React, { useState } from "react";

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>User Profile</h2>
      <p>Manage your account information here.</p>
      <form onSubmit={handleSubmit} style={{ margin: "20px auto", maxWidth: "300px" }}>
        {/* Email Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              backgroundColor: "#ccc", // Gray background
              color: "#000", // Black font color
              border: "1px solid #888", // Subtle border
              borderRadius: "5px",
            }}
            required
          />
        </div>
        {/* Name Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              backgroundColor: "#ccc",
              color: "#000",
              border: "1px solid #888",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        {/* Address Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              backgroundColor: "#ccc",
              color: "#000",
              border: "1px solid #888",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        {/* City Input */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "8px",
              margin: "5px 0",
              backgroundColor: "#ccc",
              color: "#000",
              border: "1px solid #888",
              borderRadius: "5px",
            }}
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
