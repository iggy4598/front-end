import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const SingleItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/items/${id}`)
      .then((response) => setItem(response.data))
      .catch((error) => console.error("Error fetching item details:", error));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Average Rating: {item.averageRating || "No ratings yet"}</p>

      <h3>Reviews</h3>
      {item.reviews.length ? (
        item.reviews.map((review) => (
          <div key={review.id}>
            <p><strong>Rating:</strong> {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default SingleItem;
