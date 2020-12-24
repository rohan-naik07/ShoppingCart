//import product from "../../../backend/models/product";
import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_REVIEWS = 'FETCH_REVIEWS'

const baseUrl = 'http://192.168.0.35:8000/'

export const deleteProduct = productId => {
  return async (dispatch,getState) =>{
    let token = getState().auth.token;
    try{
      const response = 
      await fetch(baseUrl + `products/${productId}`,
      {
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
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
      const response = await fetch(baseUrl + 'products');
      let id = getState().auth.userId;
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const jsonResponse = await response.json();
      const loadedProducts = []

      jsonResponse.forEach(product=>{
        console.log(product);
        loadedProducts.push(new Product(
          product._id,
          id,
          product.title,// key.title
          product.imageUrl,
          product.description,
          product.price
        ))
      })

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
      baseUrl + 'products',
      {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body : JSON.stringify({
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price,
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
        id : jsonResponse._id,
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
    const response = await fetch(baseUrl + `products/${id}`,{
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
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

export const fetchReviews = (productId)=>{
  return async (dispatch,getState)=>{
    const response = await fetch(baseUrl + `reviews/${productId}`);
    let id = getState().auth.userId;
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const loadedProducts = []
    dispatch({
      type : FETCH_REVIEWS,
      reviews : jsonResponse
    })
  }
}