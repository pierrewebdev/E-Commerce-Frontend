import React from "react";
import {setCustomer} from "../redux_actions.js"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";

class LoginForm extends React.Component {
  //it's a form so it needs to be a controlled component

  state = {
      email: "",
      password:""
  }

  handleUserInput = (evt) => {
      const inputName = evt.currentTarget.name
      const inputText = evt.currentTarget.value

      this.setState({
        [inputName]:inputText
      })
  }

  handleSubmit = (evt) =>{
    evt.preventDefault()

    const enteredEmail = evt.currentTarget.email.value
    const enteredPassword = evt.currentTarget.password.value

    //make the fetch request to the login endpoint
    const requestUrl = "http://localhost:3000"

    fetch(`${requestUrl}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify({
            email: enteredEmail,
            password: enteredPassword
        })
    })
    .then(res => res.json())
    .then(customer => {
        if(customer.error){
            alert(`${customer.error}`)
        }else{
            const betterCustomerObj = {
                customer:{...customer.customer_info},
                token: customer.token
            }
            this.props.setCustomer(betterCustomerObj)
            localStorage.setItem("token", customer.token)
            
        }
    })

    //send back to home page
    this.props.routerProps.history.push("/")
  }


  render() {
      const loginForm = (
        <form onSubmit = {this.handleSubmit} className="login-form">
        <h1>Log in Form</h1>
        <div className="input-container">
          <i className="fa fa-envelope" aria-hidden="true"></i>
          <input required placeholder="email"
            name = "email"
            value = {this.state.emailInput}
            onChange = {this.handleUserInput}
          />
          <br/>
        </div>
        <div className="input-container">
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          <input required placeholder="password"
            name = "password"
            type = "password"
            value = {this.state.passwordInput}
            onChange = {this.handleUserInput}
          />
        </div>

        <input className = "submit-btn" type="submit" value = "Log in"/>
        <br/>
        <Link style = {{color:"black"}}to = "/register">Register for an Account</Link>
      </form>
      )
    return (
      <div className = "login-div">
          {loginForm}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCustomer: setCustomer
}

export default connect(null,mapDispatchToProps)(LoginForm);
