import React from "react";

const ImageHelper = ({ product }) => {
  const imageurl =
    "https://storage.googleapis.com/product-images-new-website/" +
    product.photo;
  return (
    <img src={imageurl} alt={product.name} style={{ maxHeight: "180px" }} />
  );
};

export default ImageHelper;
