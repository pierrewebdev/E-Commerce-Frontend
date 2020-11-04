const { combineReducers } = require("redux");


const productReducer = (state = {products:[]}, action) => {
    //this function is responsible for keeping track of making changes to state throughout the application
    switch(action.type){
      case "SET PRODUCTS":
        const newState = {
          products: [...state.products,...action.payload]
        }
        return newState
      default:
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
            console.log("Setting a new Customer")
            const newState = {
                ...state,
            ...action.payload
            }
            return newState
        case "LOGOUT":
            console.log("Logging out now")
            return {
                ...state,
                ...userReducerDefault
            }
        case "ADD_TO_CART":
            console.log("Adding item to customer's cart")
            const copyOfCurrentCart = [...state.currentCart,action.payload]

            return {
                ...state,
                currentCart:copyOfCurrentCart,
                totalPrice: state.totalPrice + action.payload.price
            }
        case "NEW_CART":
            console.log("Creating new cart for customer")
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
        default:
            return state
    }
}

const reducersObj = {
    productInfo: productReducer,
    customerInfo:userReducer
}


const rootReducer = combineReducers(reducersObj)

export default rootReducer;