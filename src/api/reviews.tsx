const express = require("express");
const app = express();
app.use(express.json());

const reviews = []; // Temporary in-memory storage (replace with DB)

app.post("/api/reviews", (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  if (!productId || !userId || !rating) {
    return res.status(400).send("Missing required fields.");
  }
  reviews.push({ productId, userId, rating, comment });
  res.status(201).send("Review submitted successfully.");
});

app.get("/api/reviews/:productId", (req, res) => {
  const { productId } = req.params;
  const productReviews = reviews.filter((review) => review.productId === productId);
  res.status(200).json(productReviews);
});

app.listen(3001, () => console.log("Reviews API running on port 3001"));
