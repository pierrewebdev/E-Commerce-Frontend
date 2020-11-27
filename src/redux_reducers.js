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
        deepCopiedProductObj.products.find(product => product.id === product_id).reviews.push(newProductReview)

          const objectToReturn = Object.assign({}, state, deepCopiedProductObj)
          return objectToReturn
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
    pastCarts:[]
}
const userReducer = (state = userReducerDefault,action) =>{
    switch(action.type){
        case "SET CUSTOMER":
            const newState = {
                ...state,
            ...action.payload
            }
            return newState
        case "LOGOUT":
            return {
                ...state,
                ...userReducerDefault
            }
        case "ADD_TO_CART":
            const copyOfCurrentCart = [...state.currentCart,action.payload]

            return {
                ...state,
                currentCart:copyOfCurrentCart
            }
        case "INCREASE QUANTITY":
          const deepCopyOfCurrentCart = lodash.cloneDeep(state.currentCart)
          const productToUpdate = deepCopyOfCurrentCart.find(item => item.product.id === action.payload.id)
          productToUpdate.quantity = action.payload.quantity
          return {
              ...state,
              currentCart: deepCopyOfCurrentCart
          }
          case "DECREASE QUANTITY":
            const deepCopyOfCurrentCartForDelete = lodash.cloneDeep(state.currentCart)
            const productToDelete = deepCopyOfCurrentCartForDelete.find(item => item.product.id === action.payload.id)
            productToDelete.quantity = action.payload.quantity
            return {
              ...state,
              currentCart: deepCopyOfCurrentCartForDelete
            }
        case "NEW_CART":
            const newCart = action.payload.new_cart.serialized_products
            const newCartId = action.payload.new_cart.id
            const pastCarts = action.payload.past_carts

            return {
                ...state,
                currentCart:newCart,
                currentCartId:newCartId,
                pastCarts: pastCarts

            }
        case "DELETE":
            const copiedCurrentCart = lodash.cloneDeep(state.currentCart)
            const filteredCart = copiedCurrentCart.filter( product => {
                return product.product.id !== action.payload.id
            })
            return {
                ...state,
                currentCart:filteredCart
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