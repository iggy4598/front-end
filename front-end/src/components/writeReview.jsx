import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const WriteReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({ rating: "", text: "", image: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/items/${id}/reviews`, review, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      navigate(`/items/${id}`);
    } catch (err) {
      setError("Failed to submit review.");
    }
  };

  return (
    <div>
      <h2>Write a Review</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="number" name="rating" placeholder="Rating (1-5)" value={review.rating} onChange={handleChange} required min="1" max="5" />
        <textarea name="text" placeholder="Your review" value={review.text} onChange={handleChange} required />
        <input type="text" name="image" placeholder="shoe picture (optional)" value={review.image} onChange={handleChange} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default WriteReview;