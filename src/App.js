import React from "react";
import Header from "./components/header";
import Main from "./components/main";
import ProductShow from "./components/product_show_page";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import CartContainer from "./components/cart_container";
import PurchaseHistory from "./components/purchase_history";
import "./App.css";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer,Zoom} from "react-toastify"

//imports for my redux actions
import { setCustomer, setProducts } from "./redux_actions.js";

class App extends React.Component {
  componentDidMount() {
    //make a fetch request for the products in my backend
    const requestUrl = "https://health-and-fit-store-api.herokuapp.com";

    fetch(`${requestUrl}/products`)
      .then((res) => res.json())
      .then((productsArr) => {
        this.props.setProducts(productsArr);
      });
    console.log("I made a request to get your products");

    //keep user logged in if localStorage still has token
    if (localStorage.token) {
      fetch(`${requestUrl}/keep-logged-in`, {
        method: "GET",
        headers: {
          "Authorization": localStorage.token
        },
      })
        .then((res) => res.json())
        .then((customerInfo) => {
          if(customerInfo.customer){
            this.props.setCustomer(customerInfo);
          }else{
            console.log("user info sent from the backend was undefined")
          }
        });
    }
  }

  renderShowPage = (props) => {
    if (this.props.token) {
      return <ProductShow routerProps={props} />;
    } else {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <> <ToastContainer
          draggable = {false}
          transition = {Zoom}
          autoClose = {5000}
          hideProgressBar = {true}
          pauseOnHover
        /></>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => <LoginForm routerProps={props} />}
          ></Route>
          <Route
            exact
            path="/register"
            render={(props) => <RegisterForm routerProps={props} />}
          ></Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/cart">
            <CartContainer />
          </Route>
          <Route exact path="/purchase-history">
            <PurchaseHistory />
          </Route>
          <Route
            path="/:productname"
            render={(props) => this.renderShowPage(props)}
          />
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

const mapDispatchToProps = {
  setProducts: setProducts,
  setCustomer: setCustomer,
};

const mapStateToProps = (globalState) => {
  return {
    products: globalState.productInfo.products,
    token: globalState.customerInfo.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
