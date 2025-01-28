import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductReviews: React.FC<{ productId: number }> = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${productId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <p><strong>Rating:</strong> {review.rating}/5</p>
          <p><strong>Comment:</strong> {review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
