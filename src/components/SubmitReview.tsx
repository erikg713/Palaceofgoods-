import React, { useState } from "react";
import axios from "axios";

const SubmitReview: React.FC<{ productId: number; userId: string }> = ({ productId, userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/reviews", { productId, userId, rating, comment });
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Review</h2>
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitReview;
