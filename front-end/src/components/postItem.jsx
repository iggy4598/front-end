import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

const PostItem = () => {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axiosInstance.post("/api/items", itemData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/home");
    } catch (err) {
      setError("Error posting item. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Post a New Item</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={itemData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Item description"
          value={itemData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={itemData.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={itemData.image}
          onChange={handleChange}
        />
        <button type="submit">Post Item</button>
      </form>
    </div>
  );
};

export default PostItem;