import React from "react";

function CartItem(props) {
  return (
    <>
      <div className = "cart-item">
        <div>
          <img className = "cart-img" src={props.image} alt="One of our Health and Fitness items" />
        </div>
        <div>
          <p>{props.name}</p>
          <p>{props.description}</p>
          <p>Price: ${props.price}</p>
        </div>
      </div>
      <br/>
    </>
  );
}

export default CartItem;
