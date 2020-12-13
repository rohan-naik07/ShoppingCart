export const ADD_TO_CART = 'ADD_CART';
export const DELETE_FROM_CART ='DELETE_FROM_CART'
export const CLEAR_CART = "CLEAR_CART";

export const addCart = (product) =>{
    return {
        type : ADD_TO_CART,
        product:product
    }
}

export const removeCart = (product) => {
    return {
        type: DELETE_FROM_CART,
        product: product
    }
}

export const clearCart = ()=>{
    return {
        type : CLEAR_CART
    }
}
