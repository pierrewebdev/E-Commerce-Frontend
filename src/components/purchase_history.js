import React from "react";
import PastItem from "./past_item";
import { connect } from "react-redux";
import { randomId } from "../randomIdGenerator";

class PurchaseHistory extends React.Component {

  //method to destructure cart serialized_products array into something easier to work with
  breakDownCart = (cart) => {
    //this returns a cart with a timestamp, a price and a simplified array of products
    // const betterProducts = cart.serialized_products.map((productObj) => {
    //   console.log(productObj)
    //   return {
    //     name: productObj.name,
    //     image: productObj.image,
    //   };
    // });

    // return {
    //   timeStamp: cart.nice_timestamp,
    //   price: cart.total_price,
    //   pastProducts: betterProducts,
    // };
  };

  turnCartsToComponents = () => {
    //    const pastCartArr = this.props.pastCarts.map( cart => this.breakDownCarts(cart))
    const returnThis = this.props.pastCarts.map((pastCart) => {
      return (
        <div key={randomId()}>
          <PastItem pastCart={pastCart} />
        </div>
      );
    });
    return returnThis;
  };

  render() {
    return this.props.pastCarts.length < 1 ? (
      <div className = "purchase-history-container">
          <p style = {{margin:"100px", fontSize:"24px"}}>Haven't made any purchases yet...</p>
      </div>
    ) : (
      <div className="purchase-history-container">
        {this.turnCartsToComponents()}
      </div>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    pastCarts: [...globalState.customerInfo.pastCarts],
  };
};

export default connect(mapStateToProps, null)(PurchaseHistory);
