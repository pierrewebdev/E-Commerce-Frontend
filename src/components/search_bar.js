import React from "react"

class SearchBar extends React.Component{
    render(){
        return(
            <form className = "search-bar">
                <input type="text" placeholder="Search for a Product..."/>
                <button type="submit"><i className="fa fa-search"></i></button>
            </form>
        )
    }
}

export default SearchBar