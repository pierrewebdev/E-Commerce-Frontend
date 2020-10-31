import React from "react"

class StaticImage extends React.Component{
    render(){
        return(
            <div>
                <img className = "header-img"
                src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                alt = ""
                />
            </div>
        )
    }
}

export default StaticImage