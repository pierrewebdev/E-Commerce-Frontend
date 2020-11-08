import BeautyStars from "beauty-stars";
import React from "react";


class CustomerReview extends React.Component {
  render() {
    return (
      <div className="customer-review-container">
        <div className="customer-review">
          <p className="customer-review-headline">{this.props.headline}</p>
           <BeautyStars
              value = {this.props.reviewRating}
              inactiveColor = {"#2a2a2a"}
              activeColor = {"gold"}
              size = {"15px"}
            />
          <p>{this.props.content}</p>
          <span><i className="fa fa-user-circle" aria-hidden="true"></i> {this.props.reviewerName}</span>
        </div>
      </div>
    );
  }
}

export default CustomerReview;
