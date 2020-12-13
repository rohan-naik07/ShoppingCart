import { useState } from "react/cjs/react.production.min";
import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export const deleteProduct = productId => {
  return async (dispatch,getState) =>{
    let id = getState().auth.userId;
    let token = getState().auth.token;
    try{
      const response = 
      await fetch(`https://shoppingcart-f670e-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json'
        }
    });
    if (!response.ok) {
      throw new Error('Something went wrong! ' + response.statusText);
    }
    } catch(error){
      throw(err);
    }
    dispatch({ 
      type: DELETE_PRODUCT, 
      pid: productId 
    });
  }
};

export const fetchProducts = ()=>{

  try{
    return async (dispatch,getState)=>{
      const response = await fetch('https://shoppingcart-f670e-default-rtdb.firebaseio.com/products.json');
      let id = getState().auth.userId;
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const jsonResponse = await response.json();
      const loadedProducts = []

      //console.log(jsonResponse)
  
      for(const key in jsonResponse){
        loadedProducts.push(new Product(
          key,
          id,
          jsonResponse[key].title,
          jsonResponse[key].imageUrl,
          jsonResponse[key].description,
          jsonResponse[key].price
          ))
      }
  
      dispatch({
        type: FETCH_PRODUCT,
        products : loadedProducts,
        id : id
      });
    }
  } catch (error){
    throw error;
  }
}

export const createProduct = (title, description, imageUrl, price) => {

  return async (dispatch,getState) => {
    let id = getState().auth.userId;
    let token = getState().auth.token;
    const response = await fetch(
      `https://shoppingcart-f670e-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId : id
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong! ' + response.statusText);
    }

    const jsonResponse = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id : jsonResponse.name,
        title,
        description,
        imageUrl,
        price,
        ownerId : id
      }
    });
  }
 };

export const updateProduct = (id, title, description, imageUrl,price) => {

  return async (dispatch,getState) => {
    let Userid = getState().auth.userId;
    let token = getState().auth.token;
    console.log(id);
    const response = await fetch(`https://shoppingcart-f670e-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,{
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });

    if (!response.ok) {
      throw new Error('Something went wrong! ' + response.statusText);
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        price,
        ownerId : Userid
      }});
  }
  
};
