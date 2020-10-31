import React from "react";

function Guarantee() {
    const iTagStyles = {
        fontSize:"25px",
        marginTop:"20px"
    }
  return (
    <div className = "guarantee-div">
      <div>
        <i style = {iTagStyles} className="fa fa-truck"></i>
        <p>Fast and Secure Shipping</p>
        <p>
          We Ensure Fast and Secure shipping so your item gets to you in a
          timely and safe manner
        </p>
      </div>
      <div>
        <i style = {iTagStyles} className="fa fa-clock-o"></i>
        <p>30 DAYS MONEY BACK Guarantee</p>
        <p>
          If you don't love what you bought, you can get your money back, no
          questions asked
        </p>
      </div>
      <div>
        <i style = {iTagStyles} className="fa fa-phone"></i>
        <p>SUPPORT 24/7</p>
        <p>Get Access to Customer Support whenever you need it</p>
      </div>
    </div>
  );
}

export default Guarantee
