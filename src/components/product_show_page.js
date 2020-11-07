import React from "react";
import { connect } from "react-redux";
import ReviewForm from "./review_form";
import Popup from "reactjs-popup";

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

  render() {
    const productInfo = this.getProductInfoFromState();
    const imageStyles = {
      width: "45vw",
      height: "auto",
    };

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
            <p>{productInfo.name}</p>
            <p>Description: {productInfo.description}</p>
            <p>${productInfo.price}</p>
            <button>Add to Cart</button>
          </div>
        </div>
        <Popup
          className = "review-popup"
          trigger={
            <button type="button" className="button">
              Add a Review
            </button>
          }
        modal
        >
          <ReviewForm />
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
