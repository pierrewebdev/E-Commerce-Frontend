import React from "react";
import { connect } from "react-redux";
import ReviewForm from "./review_form";
import Popup from "reactjs-popup";
import CustomerReview from "./customer_review"
import {randomId} from "../randomIdGenerator.js"

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

  turnReviewsToComponents = () =>{
    const reviews = this.getProductInfoFromState().reviews;

    //loop through each review and generate a CustomerReview Component with it
    return reviews.map(review => {
      console.log(review.customer_name)
      return <li className = "customer-review-li" key = {randomId()} >
        <CustomerReview
         reviewerName = {review.customer_name}
         headline = {review.headline}
         content = {review.content}
         reviewRating = {review.rating} 
        />
      </li>
    })
  }

  render() {
    const productInfo = this.getProductInfoFromState();
    const imageStyles = {
      width: "45vw",
      height: "auto",
    };
    console.log(this.props)
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
          <div>
            <h1>{productInfo.name}</h1>
            <p>Description: {productInfo.description}</p>
            <p>Price: ${productInfo.price}</p>
            <button className = "review-button">Add to Cart</button>
          </div>
        </div>
        <div>
          <p style = {{fontSize:"28px", textDecoration:"underline"}}>Customer Reviews:</p>
          <ul>
            {this.turnReviewsToComponents()}
          </ul>
        </div>
        <Popup
          className = "review-popup"
          trigger={
            <button type="button" className="review-button">
              Add a Review
            </button>
          }
        modal
        >
          <ReviewForm productId = {productInfo.id} />
        </Popup>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    products: globalState.productInfo.products,
  };
};

export default connect(mapStateToProps, null)(ProductShow);
