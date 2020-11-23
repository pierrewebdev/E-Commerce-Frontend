import React from "react";

function PastItem(props) {
  const generateItemComponents = () => {
    return props.pastCart.serialized_products.map((product, index) => {
      const niceProduct = product.product
      return (
        <div key={index}>
          <img
            className="cart-img"
            src={niceProduct.image}
            alt="Order from past cart"
          />
          <p>{niceProduct.name}</p>
          <strong> Amount Bought: {product.quantity}</strong>
        </div>
      );
    });
  };

  const calculateTotalPrice = (productsArr) => {
    let totalPrice = 0;

    productsArr.forEach( productObj => {
      totalPrice += (productObj.product.price * productObj.quantity);
    })

    return totalPrice;
  }

  const totalPrice = calculateTotalPrice(props.pastCart.serialized_products)

  return (
    <div>
       <p style = {{fontSize:"25px",fontWeight:"bold"}}>Ordered on {props.pastCart.nice_timestamp}  </p>
      <p style = {{fontSize:"25px",fontWeight:"light"}}>Total Price: ${totalPrice} </p>
      <div className = "purchase-history-item">
        {generateItemComponents()}
      </div> 
    </div>
  );
}

export default PastItem;
