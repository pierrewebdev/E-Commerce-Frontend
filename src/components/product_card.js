import React from "react";
import {addToCart} from "../redux_actions.js"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        this.props.addToCart(data)
      })
  }
  render(){
    return (
        <div onMouseEnter = {evt => this.swapBooleanState()} onMouseLeave = {evt => this.swapBooleanState()} className="product-card">
          <div style = {{position:"relative"}}>
            <img
              className="product-card-image"
              src={this.props.image}
              alt="One of our Fitness and Health Products"
            />
            <button onClick = {this.addToCart} style = {this.showMe()} className = "product-btn-add">Add to Cart</button>
           <Link className = "product-btn-info" style = {this.showMe()} to = {`${this.props.name}`}>More info</Link>
          </div>
          <p className="product-card-name">{this.props.name}</p>
          <span>${this.props.price}</span>
        </div>
      );
  }
}

const mapDispatchToProps = {addToCart}


export default connect(null,mapDispatchToProps)(ProductCard)
