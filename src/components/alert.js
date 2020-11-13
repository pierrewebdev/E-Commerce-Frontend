import React from "react";

class Alert extends React.Component {

    state = {
        showing:true
    }

    hideMe = () => {
        this.setState({showing:!this.state.showing})
    }

    alertstyle = () =>{
        return this.state.showing ? {display:"block"} : {display:"none"}
    }
  render() {
    return (
      <div  style = {this.alertstyle()} className="alert">
        <span
          className="closebtn"
          onClick = {this.hideMe}
        >
          &times;
        </span>
        <strong>Sucess</strong> You added {this.props.product} to your cart
        action.
      </div>
    );
  }
}

export default Alert;
