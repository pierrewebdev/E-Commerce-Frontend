import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search_bar";
import LogUser from "./loguser.js";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    // const logInButton = (
    //   <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
    //     <i className="fa fa-user-o" aria-hidden="true"></i> Log In
    //   </Link>
    // );

    // const logOutButton = (
    //   <i onClick={this.handleClick} className="fa fa-user-o" aria-hidden="true">
    //     {" "}
    //     Log out
    //   </i>
    // );
    return (
      <header className="header">
        <div className="title-and-search-bar">
          <p className="title">
            <Link style={{ color: "black", textDecoration: "none" }} to="/">
              Health and Fit Store
            </Link>
          </p>
          <SearchBar />
        </div>
        <ul className="navbar">
          <li>
            <i className="fa fa-book" aria-hidden="true"></i> Purchase History
          </li>
          <li>
            <i className="fa fa-shopping-cart"></i> Shopping Cart
          </li>
          {this.props.customer ?  <li><Link style={{ color: "black", textDecoration: "none" }} to ="#">{`${this.props.customer.name}'s profile`}</Link></li>:null}
          <li><LogUser/></li>
        </ul>
      </header>
    );
  }
}


const mapStateToProps = (globalState) =>{
  return {
    customer: globalState.customerInfo.customer,
      };
}

export default connect(mapStateToProps,null)(Header);
