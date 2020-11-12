import React from "react";
import { connect } from "react-redux";
import ReviewForm from "./review_form";
import Popup from "reactjs-popup";
import CustomerReview from "./customer_review";
import { randomId } from "../randomIdGenerator.js";
import {addToCart} from "../redux_actions.js";

class ProductShow extends React.Component {
  getProductInfoFromState = () => {
    //I need to get the name of the product from router props
    const productName = this.props.routerProps.match.params.productname;
    //I need to map my redux state to this component as props
    const allProducts = this.props.products;

    //finally I need to use filter to find the name of the product I want
    const productIWant = allProducts.find((product) => {
      return product.name === productName;
    });
    return productIWant;
  };

  turnReviewsToComponents = () => {
    const reviews = this.getProductInfoFromState().reviews;

    //loop through each review and generate a CustomerReview Component with it
    return reviews.map((review) => {
      return (
        <li className="customer-review-li" key={randomId()}>
          <CustomerReview
            reviewerName={review.customer_name}
            headline={review.headline}
            content={review.content}
            reviewRating={review.rating}
          />
        </li>
      );
    });
  };

  addToCart = () =>{
    //make a fetch request to add the item in the customer's current cart
    const productInfo = this.getProductInfoFromState();
    fetch("http://localhost:3000/cart_products",{
        method:"POST",
        headers:{
          "Authorization": localStorage.token,
          "Content-Type":"application/json",
          Accept:"application/json"
        },
        body:JSON.stringify({
          productId :productInfo.id
        })
    })
    .then(res => res.json())
    .then(data => {
        this.props.addToCart(data.product)
    })
  }

  render() {
    const productInfo = this.getProductInfoFromState();
    const imageStyles = {
      width: "100%",
      height: "auto",
      borderRadius:"30px"
    };

    const descriptionStyles = {
      textAlign:"left",
      margin: "10px 0px"
    }
    return (
      <>
        <br />
        <div className="product-page-content-container">
          <div className="product-image-container">
            <img
              style={imageStyles}
              src={productInfo.image}
              alt={productInfo.name}
            />
          </div>
          <div className = "product-info">
            <h1>{productInfo.name}</h1>
            <p style = {descriptionStyles}>Product Details: </p>
            <p style = {descriptionStyles}>{productInfo.description}</p>
            <p style = {descriptionStyles}>Price: ${productInfo.price}</p>
            <button onClick = {this.addToCart} className="product-show-btn">Add to Cart</button>
          </div>
        </div>
        <div>
          <h2 style={{ fontSize: "26px" }}>Customer Reviews</h2>
          {this.turnReviewsToComponents().length > 0 ? (
            <ul>{this.turnReviewsToComponents()}</ul>
          ) : (
            <p>No Reviews for this Product </p>
          )}
        </div>
        <Popup
          className="review-popup"
          trigger={
            <button type="button" className="product-show-btn">
              Add a Review
            </button>
          }
          modal
        >
          <ReviewForm productId={productInfo.id} />
        </Popup>
      </>
    );
  }
}

const mapDispatchToProps = {addToCart}

const mapStateToProps = (globalState) => {
  return {
    products: globalState.productInfo.products,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);
