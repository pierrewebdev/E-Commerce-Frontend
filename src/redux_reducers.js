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

const userReducer = (state = {},action) =>{
    switch(action.type){
        case "SET CUSTOMER":
            const newState = {
                ...state,
            ...action.payload
            }
            return newState
        case "LOGOUT":
            const resetState = {}
            return resetState
        case "ADD_TO_CART":
            const copyOfProducts = [state.customerInfo.currentCart,...action.payload]
            console.log(copyOfProducts)
            
            return {
                ...state,
                currentCart:copyOfProducts
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