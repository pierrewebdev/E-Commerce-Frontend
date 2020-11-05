import React from "react";

function PastItem(props) {
  const generateItemComponents = () => {
    return props.pastCart.pastProducts.map((product, index) => {
      return (
        <div key={index}>
          <img
            className="cart-img"
            src={product.image}
            alt="Order from past cart"
          />
          <p>{product.name}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <p style = {{fontSize:"22px",fontWeight:"bold"}}>Ordered on {props.pastCart.timeStamp} </p>
      <p style = {{fontSize:"22px",fontWeight:"bold"}}>Total Price: ${props.pastCart.price} </p>
      <div className = "purchase-history-item">
        {generateItemComponents()}
      </div>
    </div>
  );
}

export default PastItem;
