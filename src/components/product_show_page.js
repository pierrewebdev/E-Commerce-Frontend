import React from "react";
import { connect } from "react-redux";

class ProductShow extends React.Component {
  getProductInfoFromState = () => {
    //I need to get the name of the product from router props
    const productName = this.props.routerProps.match.params.productname;
    //I need to map my redux state to this component as props
    const allProducts = this.props.products;

    //finally I need to use filter to find the name of the product I want
    const productIWant = allProducts.find((product) => {
      return product.name === productName
    });
    return productIWant
  };


  
  render() {
    const productInfo = this.getProductInfoFromState();
    const imageStyles = {
        width:"45vw",
        height:"auto"
    }

    return (
      <>
        <br/>
        <div className="product-page-content-container">
          <div className="product-image-container">
            <img style = {imageStyles}
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
        <div>
          {/* Product Review Form Goes Here */}
          <form>
            <p>Add a Headline to your Review</p>
            <input
              style = {{padding:"5px 10px 5px 10px", width:"150px"}}
              type="text"
              placeholder="Headline about Product"
            />
            <p>Tell us more details about what you think</p>
            <textarea 
            placeholder = "What did you like or dislike about this product?"
            rows = "5"
            cols = "40"
            ></textarea>
            <br/>
            <br/>
            <input type = "submit" value = "Add Your Review" />
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    products: globalState.productInfo.products,
  };
};


export default connect(mapStateToProps,null)(ProductShow)
