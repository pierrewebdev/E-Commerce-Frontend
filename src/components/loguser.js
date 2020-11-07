import React from "react"
import {logoutCustomer} from "../redux_actions.js"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

class LogUser extends React.Component {

    handleClick = () =>{
        //logs user out by clearing local storage and setting redux state back with an action to the user reducer
        localStorage.clear()
        this.props.logout()
    }

    render() {
        const loginButton = (
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              <i className="fa fa-sign-in" aria-hidden="true"></i>
               Log In
            </Link>
          )
      
          const logOutButton = (
              <Link to = "/" style={{ color: "white", textDecoration: "none" }} onClick = {this.handleClick} ><i className="fa fa-sign-in" aria-hidden="true"></i> Log out
            </Link>
          )

        const buttonToRender = !this.props.customer.name ? loginButton : logOutButton
        return(buttonToRender)
    }
      
}

const mapStateToProps = (globalState) =>{
    return {
        customer: globalState.customerInfo
    }
}

//dispatch acton to redux
const mapDispatchToProps = {
    logout: logoutCustomer
}

export default connect(mapStateToProps,mapDispatchToProps)(LogUser)