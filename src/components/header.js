import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search_bar";


class Header extends React.Component {
  render() {
    return (
      <header className = "header">
        <div className="title-and-search-bar">
          <p className = "title"><Link style = {{color:"black", textDecoration:"none"}} to = "/">Health and Fit Store</Link></p>
          <SearchBar />
        </div>
        <ul className = "navbar">
          <li><i className="fa fa-book" aria-hidden="true"></i> Purchase History</li>
          <li><i className="fa fa-shopping-cart"></i> Shopping Cart</li>
          <li><Link to = "/login" style = {{color:"black", textDecoration:"none"}}><i className="fa fa-user-o" aria-hidden="true"></i> Log In</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
