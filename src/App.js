import React from "react";
import Header from "./components/header";
import Main from "./components/main";
import LoginForm from "./components/login";
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
      .then(userInfo => this.props.setCustomer(userInfo))
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path = "/login" render = {props => <LoginForm routerProps = {props} />} >
          </Route>
          <Route exact path = "/">
            <Main/>
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
  return {
      payload:customerObj,
      type:"SET CUSTOMER"
  }
}

const mapDispatchToProps = {
  setProducts: setProducts,
  setCustomer: setCustomer
};

export default connect(null, mapDispatchToProps)(withRouter(App));
