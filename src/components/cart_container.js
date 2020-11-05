import React from "react";
import {deleteProductFromCart, updateStateWithNewCart} from "../redux_actions.js"
import { connect } from "react-redux";
import CartItem from "./cart_item"
import {randomId} from "../randomIdGenerator"


class CartContainer extends React.Component {
    arrOfCartItems = () =>{
        const niceProducts = this.props.products.slice()

        
        return niceProducts.map((product)=> <li style = {{listStyleType:"none"}} key = {randomId()}>
            <CartItem
            productId = {product.id} 
            name = {product.name}
            image = {product.image}
            description = {product.description}
            price = {product.price}
            delete = {this.deleteFromCart}
             />
          </li>
        )
    }

    handleCheckout = () => {
        //send a post request to the backend to switch the current cart's checkout attribute to true
        //return a new cart
        const cartId = this.props.cartId
        const token = this.props.token
        console.log(cartId)
        //POST request to send cart id and token
        fetch("http://localhost:3000/check-out",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Authorization": localStorage.token
            },
            body:JSON.stringify({
                cartId:cartId
            })
        })
        .then(res => res.json())
        .then(newCartInfo=> {
            this.props.updateStateWithNewCart(newCartInfo)
        })
    }

    deleteFromCart = (productId) => {
        const cartId = this.props.cartId
        fetch("http://localhost:3000/delete-from-cart",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Authorization": localStorage.token
            },
            body:JSON.stringify({
                productId:productId,
                cartId:cartId
            })
        })
        .then(res => res.json())
        .then(data => {
            this.props.deleteProductFromCart(data.product)
        })
    }


  render() {
    const buttonStyles = {background:"black",color:"white",width:"25%",padding:"5px",margin:"20px"}
    const nicePrice = this.props.price
    const component = (
        <>
          <ul>
              {this.arrOfCartItems()}
          </ul>
        </>  
      )

      const ternary = this.props.products.length>0 ? component : <p>Your Cart is empty</p>

      return (
        <div id = "cart-container">
        <p style ={{fontWeight:"bold",fontSize:"23px"}}>Total Price: ${nicePrice} </p>
        <ul>
            {ternary}
        </ul>
        <button style = {buttonStyles} onClick = {this.handleCheckout}>Check Out</button>
      </div>
      )
  }
}

const mapStateToProps = (globalState) =>{
    return {
        products: globalState.customerInfo.currentCart,
        cartId:globalState.customerInfo.currentCartId,
        price:globalState.customerInfo.totalPrice,
    }
}

const mapDispatchToProps = {updateStateWithNewCart,deleteProductFromCart}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
