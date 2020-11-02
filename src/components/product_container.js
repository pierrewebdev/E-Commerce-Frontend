import React from "react";
import ProductCard from "./product_card";
import { connect } from "react-redux";

class ProductContainer extends React.Component {
  //method to turn product object to a ProductCard Component
  productObjToCard = (productObj) => {
    return <ProductCard id = {productObj.id} name={productObj.name} image={productObj.image} price = {productObj.price} />;
  };

  //method to create list of product cards out of array of products
  turnProductsToComponents = () => {
    const cardLiArr = this.props.products.map((productObj) => {
      return <li key={productObj.id}>{this.productObjToCard(productObj)}</li>;
    });

    return cardLiArr;
  };
  render() {
    return (
      <div className = "product-container">
        <p className = "product-container-title">Our Collection:</p>
        <ul>{this.turnProductsToComponents()}</ul>
      </div>
    );
  }
}

//I want to receive the state of my products as props from React-Redux

const mapStateToProps = (globalState) => {
  return {
    products: globalState.productInfo.products
  };
};

export default connect(mapStateToProps, null)(ProductContainer);
