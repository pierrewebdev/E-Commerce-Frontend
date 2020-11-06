import React from "react";
import {
  deleteProductFromCart,
  updateStateWithNewCart,
} from "../redux_actions.js";
import { connect } from "react-redux";
import CartItem from "./cart_item";
import { randomId } from "../randomIdGenerator";
import StripeCheckout from "react-stripe-checkout";

class CartContainer extends React.Component {
  //stripe token callback
  onToken = (token) => {
    const charge = {
      token: token.id,
    };

    fetch("http://localhost:3000/create-charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        charge: charge,
        price: this.props.price * 100,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
         this.handleCheckout()
      });
  };

  arrOfCartItems = () => {
    const niceProducts = this.props.products.slice();

    return niceProducts.map((product) => (
      <li style={{ listStyleType: "none" }} key={randomId()}>
        <CartItem
          productId={product.id}
          name={product.name}
          image={product.image}
          description={product.description}
          price={product.price}
          delete={this.deleteFromCart}
        />
      </li>
    ));
  };

  handleCheckout = () => {
    //send a post request to the backend to switch the current cart's checkout attribute to true
    //return a new cart
    const cartId = this.props.cartId;
    //POST request to send cart id and token
    fetch("http://localhost:3000/check-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        cartId: cartId,
      }),
    })
      .then((res) => res.json())
      .then((newCartInfo) => {
        this.props.updateStateWithNewCart(newCartInfo);
      });
  };

  deleteFromCart = (productId) => {
    const cartId = this.props.cartId;
    fetch("http://localhost:3000/delete-from-cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        productId: productId,
        cartId: cartId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.deleteProductFromCart(data.product)
        // setTimeout(() => this.props.deleteProductFromCart(data.product), 6000);
      });
  };

  render() {
    const buttonStyles = {
      background: "black",
      color: "white",
      width: "25%",
      padding: "5px",
      margin: "20px",
    };
    const nicePrice = this.props.price;
    const component = (
      <>
        <ul>{this.arrOfCartItems()}</ul>
      </>
    );

    const ternary =
      this.props.products.length > 0 ? component : <p>Your Cart is empty</p>;

    return (
      <div id="cart-container">
        <p style={{ fontWeight: "bold", fontSize: "23px" }}>
          Total Price: ${nicePrice}{" "}
        </p>
        <ul>{ternary}</ul>

        <StripeCheckout
            name = "Health and Fitness Store"
            description = "Please Enter the Relevant Info Below"
            amount = {this.props.price * 100}
            shippingAddress = {true}
            billingAddress = {true}
            currency = "USD"
            closed = {() => alert("Thank you for shopping with us!")}
            token = {this.onToken}
            stripeKey = {process.env.REACT_APP_STRIPE_API_KEY}
        >
        <button style = {buttonStyles}>Check Out</button>
        </StripeCheckout>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    products: globalState.customerInfo.currentCart,
    cartId: globalState.customerInfo.currentCartId,
    price: globalState.customerInfo.totalPrice,
  };
};

const mapDispatchToProps = { updateStateWithNewCart, deleteProductFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
