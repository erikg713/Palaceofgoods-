import React from "react";
import ProductReviews from "../components/ProductReviews";
import SubmitReview from "../components/SubmitReview";

const ProductPage: React.FC<{ productId: number; userId: string }> = ({ productId, userId }) => {
  return (
    <div>
      <h1>Product Details</h1>
      {/* Product details component */}
      <ProductReviews productId={productId} />
      <SubmitReview productId={productId} userId={userId} />
    </div>
  );
};

export default ProductPage;
