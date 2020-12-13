import {ADD_TO_CART} from '../actions/cart'
import {DELETE_FROM_CART} from '../actions/cart';
import {CLEAR_CART} from '../actions/cart';
import Cart from '../../models/cart';

const initialState = {
    products:[],
    price : 0
}

const cartReducer = (state=initialState, action)=>{
    //console.log(action) // action is never null

    switch (action.type){
        case ADD_TO_CART:
            var price = action.product.price + state.price;
            var productIndex = state.products.findIndex(product=>product.id==action.product.id);
            var product = state.products.find(product=>product.id==action.product.id);
            var cartProducts = [...state.products];

            if (productIndex>=0){
                var addedCartProduct = {
                    ...product,
                    quantity : product.quantity + 1
                };
                cartProducts.splice(productIndex,1);
                var updatedProducts = cartProducts.concat(addedCartProduct);
    
                return {
                    products : updatedProducts,
                    price : price
                };
            }
           
            return {
                ...state,
                products : cartProducts.concat(new Cart(
                    action.product.id,
                    action.product.title,
                    action.product.imageUrl,
                    action.product.price,1)),
                price:price
            }
           

        case DELETE_FROM_CART:
            var price = state.price - action.product.price;
            var productIndex = state.products.findIndex(product=>product.id==action.product.id);
            var product = state.products.find(product=>product.id==action.product.id);
            var cartProducts = [...state.products]; 
            if (product.quantity>1){
                var removedCartProduct = {
                    ...product,
                    quantity : product.quantity - 1
                };
                cartProducts.splice(productIndex,1);
                var updatedProducts = cartProducts.concat(removedCartProduct);

                return {
                    products : updatedProducts,
                    price : price
                };
            }

            cartProducts.splice(productIndex,1);

            return {
                ...state,
                products : cartProducts,
                price:price
            }
        case CLEAR_CART:
            var cartProducts = [...state.products]; 
            cartProducts.splice(0,cartProducts.length);
            
            return {
                products:cartProducts,
                price:0
            }
            
        default:
            return state
    }
    return state;
}

export default cartReducer;