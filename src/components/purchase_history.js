import React from "react";
import PastItem from "./past_item";
import { connect } from "react-redux";
import { randomId } from "../randomIdGenerator";

class PurchaseHistory extends React.Component {

  turnCartsToComponents = () => {
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
