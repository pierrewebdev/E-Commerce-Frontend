import React from "react"
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
            <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
              <i className="fa fa-user-o" aria-hidden="true"></i> Log In
            </Link>
          )
      
          const logOutButton = (
              <Link to = "/" style={{ color: "black", textDecoration: "none" }} onClick = {this.handleClick}><i className="fa fa-user-o" aria-hidden="true"> Log out</i></Link>
          )

        const buttonToRender = !this.props.customer? loginButton : logOutButton
        return(buttonToRender)
    }
      
}

const mapStateToProps = (globalState) =>{
    return {
        customer: globalState.customerInfo.customer
    }
}

//an action for the user reducer
const logoutCustomer = () =>{
    return {
        payload: {},
        type: "LOGOUT"
    }
}

//dispatch acton to redux
const mapDispatchToProps = {
    logout: logoutCustomer
}

export default connect(mapStateToProps,mapDispatchToProps)(LogUser)