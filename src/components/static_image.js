import React from "react";

class StaticImage extends React.Component {
  render() {
    return (
      <div className="banner">
        <div>
          <h1 style = {{textTransform:"capitalize", fontSize:"45px"}}>Give your workouts that extra push</h1>
          <p style = {{fontSize: "21px"}}>Here at Health and Fit, it's our job to make your workouts work out. <br/> Check out our wonderful selection of products</p>
        </div>
      </div>
    );
  }
}

export default StaticImage;

