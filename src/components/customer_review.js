import React from "react";
import StarRatingComponent from "react-star-rating-component";

class CustomerReview extends React.Component {
  render() {
    return (
      <div className="customer-review-container">
        <div className="customer-review">
          <p className="customer-review-headline">{this.props.headline}</p>
          <StarRatingComponent
            name="review"
            value={this.props.reviewRating}
            starColor={"gold"}
            editing={false}
          />
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default CustomerReview;
