import React from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ categories: string; productId: string }>;
}) => {
  const { categories, productId } = await params;

  console.log(productId);

  return <div>ProductPage</div>;
};

export default ProductPage;
