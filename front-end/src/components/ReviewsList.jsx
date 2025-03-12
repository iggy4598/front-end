import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const tokenPayload = JSON.parse(atob(sessionStorage.getItem("token").split('.')[1]));
      const response = await axios.get(`/api/users/${tokenPayload.id}/reviews`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setReviews(response.data);
    } catch (err) {
      setError("Failed to load reviews.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <div>
      <h2>My Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;