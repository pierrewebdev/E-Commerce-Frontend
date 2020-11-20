import React from "react";

function CartItem(props) {
  const handleDelete = () => {
    props.delete(props.productId);
  };

  const handleIncrement = () =>{
    props.incrementQuantity(props.productId)
  }

  const handleDecrement = () =>{
    props.decrementQuantity(props.productId)
  }

  const quantitySpanStyles = {
    margin:"0 10px",
    fontSize:"16px",
    cursor:"pointer"
  };

  const quantityDivStyles = {
    border:"1px solid"
  }

  return (
    <div className="cart-container">
      <div className="cart-item">
        <div>
          <img
            className="cart-img"
            src={props.image}
            alt="One of our Health and Fitness items"
          />
        </div>
        <div>
          <p style={{ fontWeight: "bold" }}>{props.name}</p>
          <p>{props.description}</p>
        </div>
        <div>
          <p style={{ fontSize: "18px" }}>Price: ${props.price}</p>
          <div>
          <p>Quantity:</p>
          <div style = {quantityDivStyles}>
            <span onClick = {handleDecrement} style = {quantitySpanStyles}>-</span>
            {props.quantity}
            <span onClick = {handleIncrement} style = {quantitySpanStyles}>+</span>
          </div>
        </div>
          <button className="review-button" onClick={handleDelete}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
