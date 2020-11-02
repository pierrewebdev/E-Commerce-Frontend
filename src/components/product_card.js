import React from "react";
import { connect } from "react-redux";

class ProductCard extends React.Component {

    state = {
        showing:false
    }

  showMe = () =>{
    return this.state.showing ? 
    {visibility:"visible"} 
        : 
    {visibility:"hidden"}
  }

  swapBooleanState = () =>{
    this.setState({showing: !this.state.showing})
  }

  addToCart = () =>{
      //make a fetch request to add the item in the customer's current cart
      fetch("http://localhost:3000/cart_products",{
          method:"POST",
          headers:{
            "Authorization": localStorage.token,
            "Content-Type":"application/json",
            Accept:"application/json"
          },
          body:JSON.stringify({
            productId :this.props.id
          })
      })
      .then(res => res.json())
      .then(data => {
          this.props.actionForAddToCart(data.product)
      })
  }
  render(){
    return (
        <div onMouseEnter = {evt => this.swapBooleanState()} onMouseLeave = {evt => this.swapBooleanState()} className="product-card">
          <div style = {{position:"relative",
      width: "50%", maxWidth: "500px"}}>
            <img
              className="product-card-image"
              src={this.props.image}
              alt="One of our Fitness and Health Products"
            />
            <button onClick = {this.addToCart} style = {this.showMe()} className = "product-btn">Add to Cart</button>
          </div>
          <p className="product-card-name">{this.props.name}</p>
          <span>${this.props.price}</span>
        </div>
      );
  }
}

//I need to dispatch an action that will update the redux store's state to include new item in customer's current cart

const actionForAddToCart = (productToAddToCart) =>{
    return{
        payload:productToAddToCart,
        type: "ADD_TO_CART"
    }
}

const mapDispatchToProps = {actionForAddToCart}

export default connect(null,mapDispatchToProps)(ProductCard)
