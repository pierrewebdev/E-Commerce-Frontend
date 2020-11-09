import React from "react";
import { connect } from "react-redux";
import { addNewReview } from "../redux_actions";
import BeautyStars from "beauty-stars";

class ReviewForm extends React.Component {
  state = {
    headline: "",
    content: "",
    rating: 0,
  };

  handleUserInput = (evt) => {
    const inputName = evt.currentTarget.name;
    const inputText = evt.currentTarget.value;

    this.setState({
      [inputName]: inputText,
    });
  };

  handleStarClick = (value) => {
    this.setState({ rating: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const reviewHeadline = evt.currentTarget.headline.value;
    const reviewContent = evt.currentTarget.content.value;
    const rating = this.state.rating;

    //make a post request to my backend with the content of the review
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        headline: reviewHeadline,
        rating: rating,
        content: reviewContent,
        productId: this.props.productId,
      }),
    })
      .then((res) => res.json())
      .then((reviewObj) => {
        this.props.addNewReview(reviewObj);
      })
  };

  render() {
    return (
      <div>
        {/* Product Review Form Goes Here */}
        <form onSubmit={this.handleSubmit} className="review-form">
          <p>Add a Headline to your Review</p>
          <input
            style={{ padding: "5px 10px 5px 10px", width: "150px" }}
            type="text"
            name="headline"
            className="review-headline"
            placeholder="Headline about Product"
            value={this.state.headline}
            onChange={this.handleUserInput}
          />
          <p>How would you rate this product out of 5?</p>
          <BeautyStars
            value={this.state.rating}
            inactiveColor={"black"}
            activeColor={"gold"}
            onChange={this.handleStarClick}
            size={"28px"}
          />
          <p>Tell us more details about what you think</p>
          <textarea
            name="content"
            placeholder="What did you like or dislike about this product?"
            value={this.state.content}
            onChange={this.handleUserInput}
            rows="5"
            cols="40"
          ></textarea>
          <br />
          <br />
          <input
            type="submit"
            value="Add Your Review"
            className="review-form-submit"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addNewReview: addNewReview,
};

export default connect(null, mapDispatchToProps)(ReviewForm);
