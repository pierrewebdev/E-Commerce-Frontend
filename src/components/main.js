import React from "react";
import ProductContainer from "./product_container";
import Guarantee from "./guarantee";
import StaticImage from "./static_image"

class Main extends React.Component {
  render() {
    return (
      <>
        <StaticImage/>
        <ProductContainer />
        <Guarantee />
      </>
    );
  }
}

export default Main
