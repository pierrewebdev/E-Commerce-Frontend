import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RegisterForm extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleUserInput = (evt) => {
    const inputName = evt.currentTarget.name;
    const inputText = evt.currentTarget.value;

    this.setState({
      [inputName]: inputText,
    });
  };

  handleSubmit = (evt) =>{
      evt.preventDefault()
      //make a fetch request to the register endpoint on my backend
      fetch("http://localhost:3000/register",{
          method:"POST",
          headers:{
              "Content-Type":"application/json",
              Accept:"application/json"
          },
          body: JSON.stringify({
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        })
      })
      .then(res => res.json())
      .then(customer =>{
        const betterCustomerObj = {
            customer:{...customer.customer_info},
            token: customer.token
        }
        this.props.setCustomer(betterCustomerObj)
        localStorage.setItem("token", customer.token)
        
      })
  }

  render() {
    const registerForm = (
      <form onSubmit={this.handleSubmit} className="login-form">
        <h1>Make an Account</h1>
        <div className="input-container">
        <i className="fa fa-address-card-o" aria-hidden="true"></i>
          <input
            required
            placeholder="name"
            name="name"
            value={this.state.name}
            onChange={this.handleUserInput}
          />
        </div>

        <div className="input-container">
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <input
            required
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
        </div>
        <div className="input-container">
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          <input
            required
            placeholder="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
        </div>

        <input className="submit-btn" type="submit" value="Create Account" />
        <br/>
        <Link style = {{color:"black"}} to ="/login">Log into your Account</Link>
      </form>
    );
    return <div className = "register-form-div">{registerForm}</div>;
  }
}

const setCustomer = (customerObj) => {
  const { address, email, current_cart, id, name } = customerObj.customer;
  const pastCarts = customerObj.customer.past_carts;
  const token = customerObj.token;

  const niceCustomerObj = {
    name: name,
    id: id,
    address: address,
    email: email,
    currentCart: current_cart.serialized_products,
    currentCartId: current_cart.id,
    token: token,
    totalPrice: current_cart.total_price,
    pastCarts: pastCarts,
  };
  return {
    payload: niceCustomerObj,
    type: "SET CUSTOMER",
  };
};

const mapDispatchToProps = {
  setCustomer: setCustomer,
};

export default connect(null,mapDispatchToProps)(RegisterForm)
