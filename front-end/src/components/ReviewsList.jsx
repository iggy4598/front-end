import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReview, setEditedReview] = useState({ rating: "", text: "" });

  const fetchReviews = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const response = await axios.get(`/api/users/${tokenPayload.id}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
    } catch (err) {
      setError("Failed to load reviews.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditedReview({ rating: review.rating, text: review.text });
  };

  const handleEditSubmit = async (e, reviewId) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.put(`/api/reviews/${reviewId}`, editedReview, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.map((r) => (r.id === reviewId ? res.data : r)));
      setEditingReviewId(null);
    } catch (error) {
      setError("Error updating review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (error) {
      setError("Error deleting review.");
    }
  };

  return (
    <div>
      <h2>My Reviews</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            {editingReviewId === review.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, review.id)}>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={editedReview.rating}
                  onChange={(e) =>
                    setEditedReview({ ...editedReview, rating: e.target.value })
                  }
                  required
                />
                <textarea
                  name="text"
                  value={editedReview.text}
                  onChange={(e) =>
                    setEditedReview({ ...editedReview, text: e.target.value })
                  }
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingReviewId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <p>{review.text}</p>
                <p>Rating: {review.rating}</p>
                <button onClick={() => handleEditClick(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;