import React from "react";

function CartItem(props) {
  const handleDelete = () => {
    props.delete(props.productId);
  };

  // const pTagStyles = {
  //   fontSize: "16px",
  //   width:"400px"
  // };

  return (
    <div className = "cart-container">
      <div className="cart-item">
        <div>
          <img
            className="cart-img"
            src={props.image}
            alt="One of our Health and Fitness items"
          />
        </div>
        <div>
          <p style = {{fontWeight:"bold"}}>{props.name}</p>
          <p>{props.description}</p>
        </div>
        <div>
          <p style = {{fontSize: "20px"}}>Price: ${props.price}</p>
          <button className="review-button" onClick={handleDelete}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
