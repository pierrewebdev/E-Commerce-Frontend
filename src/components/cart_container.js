import React from "react";
import { connect } from "react-redux";
import CartItem from "./cart_item"


class CartContainer extends React.Component {
    arrOfCartItems = () =>{
        const niceProducts = this.props.products.slice()

        
        return niceProducts.map((product,index)=> <li style = {{listStyleType:"none"}} key = {index}>
            <CartItem 
            name = {product.name}
            image = {product.image}
            description = {product.description}
            price = {product.price} />
          </li>
        )
    }

    handleCheckout = () => {
        //send a post request to the backend to switch the current cart's checkout attribute to true
        //return a new cart
    }


  render() {
    const nicePrice = this.props.price
    const component = (
        <div id = "cart-container">
          <p style ={{fontWeight:"bold",fontSize:"23px"}}>Total Price: ${nicePrice} </p>
          <ul>
              {this.arrOfCartItems()}
          </ul>
          <button onClick = {this.handleCheckout}>Check Out</button>
        </div>
      )

      const ternary = this.props.products.length>0 ? component : <p>Props is undefined</p>

      return ternary
  }
}

const mapStateToProps = (globalState) =>{
    return {
        products: globalState.customerInfo.currentCart,
        price:globalState.customerInfo.totalPrice
    }
}

export default connect(mapStateToProps, null)(CartContainer)
