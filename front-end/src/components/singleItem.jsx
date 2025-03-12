import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SingleItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [commentInputs, setCommentInputs] = useState({});

  const fetchItem = async () => {
    try {
      const response = await axios.get(`/api/items/${id}`);
      setItem(response.data);
    } catch (err) {
      setError("Item not found.");
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleCommentSubmit = async (e, reviewId) => {
    e.preventDefault();
    const commentText = commentInputs[reviewId];
    if (!commentText) return;
    try {
      await axios.post(
        `/api/reviews/${reviewId}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
      );
      setCommentInputs({ ...commentInputs, [reviewId]: "" });
      fetchItem();
    } catch (err) {
      console.error("Error submitting comment", err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      {item.image && <img src={item.image} alt={item.name} style={{ width: "300px" }} />}
      <p>{item.description}</p>
      <p>Average Rating: {item.averageRating}</p>
      <h3>Reviews:</h3>
      {item.reviews.map((review) => (
        <div key={review.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>{review.text}</p>
          <p>Rating: {review.rating}</p>
          {review.image && <img src={review.image} alt="Review" style={{ width: "150px" }} />}
          <h4>Comments:</h4>
          {review.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.text}</p>
            </div>
          ))}
          {sessionStorage.getItem("token") && (
            <form onSubmit={(e) => handleCommentSubmit(e, review.id)}>
              <input
                type="text"
                placeholder="Write a comment"
                value={commentInputs[review.id] || ""}
                onChange={(e) => setCommentInputs({ ...commentInputs, [review.id]: e.target.value })}
                required
              />
              <button type="submit">Submit Comment</button>
            </form>
          )}
        </div>
      ))}
      <button onClick={() => navigate(`/items/${id}/write-review`)}>Write a Review</button>
    </div>
  );
};

export default SingleItem;