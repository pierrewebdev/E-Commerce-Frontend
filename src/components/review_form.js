import React from "react"

class ReviewForm extends React.Component{

    state = {
        headline:"",
        content:""
    }

    handleUserInput = (evt) => {
        const inputName = evt.currentTarget.name
        const inputText = evt.currentTarget.value
  
        this.setState({
          [inputName]:inputText
        })
    }

    render(){
        return (
            <div>
          {/* Product Review Form Goes Here */}
          <form className = "review-form">
            <p>Add a Headline to your Review</p>
            <input
              style = {{padding:"5px 10px 5px 10px", width:"150px"}}
              type="text"
              name = "headline"
              placeholder="Headline about Product"
              value = {this.state.headline}
              onChange = {this.handleUserInput}
            />
            <p>Tell us more details about what you think</p>
            <textarea 
            name = "content"
            placeholder = "What did you like or dislike about this product?"
            value = {this.state.content}
            onChange = {this.handleUserInput}
            rows = "5"
            cols = "40"
            ></textarea>
            <br/>
            <br/>
            <input 
            type = "submit" value = "Add Your Review" />
          </form>
        </div>
        )
    }
}

export default ReviewForm