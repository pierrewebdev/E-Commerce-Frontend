import React from "react";
import {addToCart} from "../redux_actions.js"
import { connect } from "react-redux";
import { Link} from "react-router-dom";
import {toast} from "react-toastify"


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
      if(this.props.customer.name !== ""){
        fetch("https://health-and-fit-store-api.herokuapp.com/cart_products",{
          method:"POST",
          headers:{
            "Authorization": localStorage.token,
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify({
            productId :this.props.id
          })
      })
      .then(res => res.json())
      .then(data => {
        this.props.addToCart(data)
        toast.dark(`Added ${data.product.name.toLowerCase()} to your cart`)
      })
      } else{
        toast.error("Please Log in First")
      }
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

const mapStateToProps = (globalState) => {
  return {
    customer:globalState.customerInfo
  }
}

const mapDispatchToProps = {addToCart}


export default connect(mapStateToProps,mapDispatchToProps)(ProductCard)
