import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {randomId} from "../randomIdGenerator"

class SearchBar extends React.Component{

    state = {
        searchValue: ""
    }

    turnProductsToNamedLinks = (searchTerm) =>{
        const products = this.props.products
        const filteredProducts =  products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

        return filteredProducts.map( product => {
          return <li key = {randomId()}>
              <Link onClick = {() => this.setState({searchValue:""})} style={{ color: "black", textDecoration: "none" }} to = {product.name}>{product.name}</Link>
          </li>
        })
    }

    handleUserInput = (evt) => {
        const inputText = evt.currentTarget.value
  
        this.setState({
          searchValue:inputText
        })
    }

    showSearchTerms = () =>{
        return this.state.searchValue.length > 0 ? {visibility:"visible"} : {visibility:"hidden"}
    }
    render(){
        return(
            <div>
            <form>
                <div className = "search-bar">
                <input className = "fontAwesome" type="text" autoComplete='off' name = "search" value = {this.state.searchValue} onChange = {this.handleUserInput} placeholder="&#xf002; Search"/>
                </div>
                {/* <button type="submit"><i className="fa fa-search"></i></button> */}
                <div style = {this.showSearchTerms()} id = "search-container">
                <ul>
                    {this.turnProductsToNamedLinks(this.state.searchValue)}
                </ul>
              </div>
            </form>
            </div>
        )
    }
}

const mapStateToProps = (globalState) => {
    return {
        products:globalState.productInfo.products
    }
}

export default connect(mapStateToProps,null)(SearchBar)