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

//potential images to base the design on
// https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
// https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1994&q=80
//https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260
