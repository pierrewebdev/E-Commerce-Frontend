import React from "react";
import Header from "./components/header";
import Main from "./components/main";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import CartContainer from "./components/cart_container";
import PurchaseHistory from "./components/purchase_history";
import "./App.css";
import { connect } from "react-redux";
import { withRouter,Switch, Route } from "react-router-dom";


class App extends React.Component {
  componentDidMount() {
    //make a fetch request for the products in my backend
    const requestUrl = "http://localhost:3000";

    fetch(`${requestUrl}/products`)
      .then((res) => res.json())
      .then((productsArr) => {
        this.props.setProducts(productsArr);
      });
    console.log("I made a request to get your products")

    //keep user logged in if localStorage still has token
    if(localStorage.token){
      fetch("http://localhost:3000/keep-logged-in",{
        method:"GET",
        headers:{
          "Authorization": localStorage.token
        }
      })
      .then(res => res.json())
      .then(customerInfo => {
        this.props.setCustomer(customerInfo)
      })
    }
  }

  render() {
    // console.log(this.props.customer)
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path = "/login" render = {props => <LoginForm routerProps = {props} />} >
          </Route>
          <Route exact path = "/register" render = {props => <RegisterForm routerProps = {props} />} ></Route>
          <Route exact path = "/">
            <Main/>
          </Route>
          <Route exact path = "/cart">
            <CartContainer/>
          </Route>
          <Route exact path = "/purchase-history">
            <PurchaseHistory/>
          </Route>
        </Switch>
        <footer className="footer">
          <a href="https://github.com/pierrewebdev/">
            Developed By Patrick Pierre
          </a>
        </footer>
      </div>
    );
  }
}

// const mapStateToProps = (globalState) => {
//   return {
//     products: globalState.products,
//   };
// };

//this is an action creator that returns an action
const setProducts = (arrayOfProducts) => {
  return {
    type: "SET PRODUCTS",
    payload: arrayOfProducts,
  };
};

const setCustomer = (customerObj) =>{
  const {address,email,current_cart,id,name,} = customerObj.customer
  const pastCarts = customerObj.customer.past_carts
  const token = customerObj.token

  const niceCustomerObj = {
    name:name,
    id:id,
    address:address,
    email:email,
    currentCart:current_cart.serialized_products,
    currentCartId:current_cart.id,
    token:token,
    totalPrice: current_cart.total_price,
    pastCarts: pastCarts
  }
  return {
      payload:niceCustomerObj,
      type:"SET CUSTOMER"
  }
}

const mapDispatchToProps = {
  setProducts: setProducts,
  setCustomer: setCustomer
};

export default connect(null, mapDispatchToProps)(withRouter(App));
