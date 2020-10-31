import React from "react";

function ProductCard(props) {
  return (
    <div className="product-card">
      <img
        className="product-card-image"
        src={props.image}
        alt="One of our Fitness and Health Products"
      />
      <p className="product-card-name">{props.name}</p>
      <span >${props.price}</span>
    </div>
  );
}

export default ProductCard;
