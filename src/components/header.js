import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search_bar";
import LogUser from "./loguser.js";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="title-and-search-bar">
          <p className="title">
            <Link style={{ fontSize:"30px", color:"black", textDecoration: "none" }} to="/">
             Health and Fit Store
            </Link>
          </p>
          <SearchBar />
        </div>
        <ul className="navbar">
          <li>
           <Link style={{ color:"white", textDecoration: "none" }} to = "/purchase-history"> <i style = {{fontSize:"20px"}} className="fa fa-book" aria-hidden="true"></i> Purchase History</Link>
          </li>
          <li style = {{position:"relative"}}>
            <Link style={{ color:"white", textDecoration: "none" }} to="/cart">
              <i style = {{fontSize:"20px"}} className="fa fa-shopping-cart"></i> Cart <span id = "cart-count">({this.props.currentCartCount})</span>
            </Link>
          </li>
          {this.props.customer ? (
            <li>
              <Link
                style={{ color:"white", textDecoration: "none" }}
                to="#"
              ><i style = {{fontSize:"20px"}} className="fa fa-user" aria-hidden="true"></i> {`${this.props.customer}'s profile`}</Link>
            </li>
          ) : null}
          <li>
            <LogUser />
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => {
  return {
    customer: globalState.customerInfo.name,
    currentCartCount: globalState.customerInfo.currentCart.length
  };
};

export default connect(mapStateToProps, null)(Header);
