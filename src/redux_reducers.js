import lodash from "lodash";
const { combineReducers } = require("redux");


const productReducer = (state = {products:[]}, action) => {
    //this function is responsible for keeping track of making changes to state throughout the application
    switch(action.type){
      case "SET PRODUCTS":
        const newState = {
          products: [...state.products,...action.payload]
        }
        return newState
      case "ADD_REVIEW":
          console.log("adding new review")
          const {headline,content,rating,customer_name,product_id} = action.payload
          const newProductReview = {
              headline:headline,
              content:content,
              rating:rating,
              customer_name:customer_name
        }
        
        //here I use the lodash library to make a true copy of my state
        const deepCopiedProductObj = lodash.cloneDeep(state)
        debugger
        deepCopiedProductObj.products.find(product => product.id === product_id).reviews.push(newProductReview)

          const objectToReturn = Object.assign({}, state, deepCopiedProductObj)
          return objectToReturn
      default:
          console.log("you've hit the default in the reducer")
        return state
    }
  };


const userReducerDefault = {
    name:"",
    id:0,
    address:"",
    email:"",
    token:"",
    currentCart:[],
    currentCartId:0,
    totalPrice:0,
    pastCarts:[]
}
const userReducer = (state = userReducerDefault,action) =>{
    switch(action.type){
        case "SET CUSTOMER":
            // console.log("Setting a new Customer")
            const newState = {
                ...state,
            ...action.payload
            }
            return newState
        case "LOGOUT":
            // console.log("Logging out now")
            return {
                ...state,
                ...userReducerDefault
            }
        case "ADD_TO_CART":
            // console.log("Adding item to customer's cart")
            const copyOfCurrentCart = [...state.currentCart,action.payload]

            return {
                ...state,
                currentCart:copyOfCurrentCart,
                totalPrice: state.totalPrice + action.payload.price
            }
        case "NEW_CART":
            // console.log("Creating new cart for customer")
            const newCart = action.payload.new_cart.serialized_products
            const newCartId = action.payload.new_cart.id
            const newTotalPrice = action.payload.new_cart.total_price
            const pastCarts = action.payload.past_carts

            return {
                ...state,
                currentCart:newCart,
                currentCartId:newCartId,
                totalPrice: newTotalPrice,
                pastCarts: pastCarts

            }
        case "DELETE":
            // console.log("Deleting an item from the cart")
            const filteredCart = state.currentCart.filter( product => {
                return product.id !== action.payload.id
            })
            return {
                ...state,
                currentCart:filteredCart,
                totalPrice: state.totalPrice - action.payload.price
            }
        default:
            // console.log("you hit the default in the customer reducer")
            return state
    }
}

const reducersObj = {
    productInfo: productReducer,
    customerInfo:userReducer
}

const rootReducer = combineReducers(reducersObj)

export default rootReducer;