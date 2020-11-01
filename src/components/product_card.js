import React from "react";

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
      //method is supposed to handle adding things to cart and persisting it
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

export default ProductCard;
