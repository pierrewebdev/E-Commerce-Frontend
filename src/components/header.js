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
            <Link style={{ color: "black", textDecoration: "none" }} to="/">
              Health and Fit Store
            </Link>
          </p>
          <SearchBar />
        </div>
        <ul className="navbar">
          <li>
           <Link style={{ color: "black", textDecoration: "none" }} to = "/purchase-history"> <i className="fa fa-book" aria-hidden="true"></i> Purchase History</Link>
          </li>
          <li>
            <Link style={{ color: "black", textDecoration: "none" }} to="/cart">
              <i className="fa fa-shopping-cart"></i> Shopping Cart
            </Link>
          </li>
          {this.props.customer ? (
            <li>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to="#"
              ><i className="fa fa-user" aria-hidden="true"></i> {`${this.props.customer}'s profile`}</Link>
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
    customer: globalState.customerInfo.name
  };
};

export default connect(mapStateToProps, null)(Header);
