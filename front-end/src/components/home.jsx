import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import PostItem from "./postItem";

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPostItem, setShowPostItem] = useState(false);
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      let url = "/api/items";
      if (searchQuery || categoryFilter) {
        url = `/api/search?query=${encodeURIComponent(
          searchQuery
        )}&category=${encodeURIComponent(categoryFilter)}`;
      }
      const response = await axiosInstance.get(url);
      setItems(response.data);
    } catch (err) {
      setError("Failed to load items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchQuery, categoryFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Review Site</h1>
      <div>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by category..."
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>

      <div>
        <button onClick={() => setShowPostItem(!showPostItem)}>
          {showPostItem ? "Hide Item" : "Post Item"}
        </button>
        {showPostItem && <PostItem />}
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} onClick={() => navigate(`/items/${item.id}`)}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Average Rating: {item.averageRating}</p>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "200px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;