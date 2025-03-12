import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/api/reviews", { headers: {} });
      setReviews(response.data);
    } catch (err) {
      setError("Failed to load reviews.");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Review for: {review.item?.name}</h3>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Review:</strong> {review.text}
            </p>
            <p>
              <strong>By:</strong> {review.user?.firstName}{" "}
              {review.user?.lastName} ({review.user?.email})
            </p>
            {review.comments && review.comments.length > 0 && (
              <div>
                <h4>Comments:</h4>
                {review.comments.map((comment) => (
                  <p key={comment.id}>{comment.text}</p>
                ))}
              </div>
            )}
          </div>
        ))
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default AllReviews;