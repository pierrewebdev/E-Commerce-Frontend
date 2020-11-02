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
    currentCart:[],
    totalPrice:0
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
            const resetState = action.payload
            return resetState
        case "ADD_TO_CART":
            console.log("Adding item to user's cart")
            const copyOfCurrentCart = [...state.currentCart,action.payload]

            return {
                ...state,
                currentCart:copyOfCurrentCart,
                totalPrice: state.totalPrice + action.payload.price
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