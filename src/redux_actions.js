
//Action to set a customer in redux store's state
//This action is used in the LoginForm, RegisterForm, and App components
const setCustomer = (customerObj) =>{
    const {address,email,current_cart,id,name,} = customerObj.customer
    const pastCarts = customerObj.customer.past_carts
    const token = customerObj.token
  
    const niceCustomerObj = {
      name:name,
      id:id,
      address:address,
      email:email,
      currentCart:current_cart.serialized_products,
      currentCartId:current_cart.id,
      token:token,
      totalPrice: current_cart.total_price,
      pastCarts: pastCarts
    }
    return {
        payload:niceCustomerObj,
        type:"SET CUSTOMER"
    }
}

//Action to set products into state of redux store
//This action is used in my App component
const setProducts = (arrayOfProducts) => {
    return {
      type: "SET PRODUCTS",
      payload: arrayOfProducts,
    };
};

//Action to log customer out of the app and clear out the part of my redux store that hold's a customer's info
//This action is used in my LogUser component
const logoutCustomer = () =>{
    return {
        payload: {},
        type: "LOGOUT"
    }
}

//Action to update my redux store's current cart in the customer information with a new cart whenever the user checks out all their current cart items
const updateStateWithNewCart = (newCart) =>{
    return {
        payload:newCart,
        type:"NEW_CART"
    }
}

//Action to add a new product into the current customer's cart in redux store
const addToCart = (productToAddToCart) =>{
    const {product,quantity} = productToAddToCart
    const finalProduct = {...product, quantity}
    return{
        payload:finalProduct,
        type: "ADD_TO_CART"
    }
}

const deleteProductFromCart = (productToDeleteFromCart) =>{
    const objectToReturn = {
        payload:productToDeleteFromCart,
        type:"DELETE"
    }
    return objectToReturn
}

const addNewReview = (reviewObj) =>{
    return {
        payload:reviewObj,
        type: "ADD_REVIEW"
    }
}

export {setCustomer, setProducts, logoutCustomer, updateStateWithNewCart, addToCart, deleteProductFromCart, addNewReview }
