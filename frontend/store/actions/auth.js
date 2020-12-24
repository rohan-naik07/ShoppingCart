import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE'; 
export const LOGOUT_USER = 'LOGOUT_USER';

let timer;
const baseUrl = 'http://192.168.0.35:8000/'

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const signup = (email, password) => {
    return async dispatch => {
      const response = await fetch(
        baseUrl + 'auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        throw new Error(errorResData.message);
      }
  
      const resData = await response.json();
      console.log(resData);

      dispatch(
        authenticate(
          resData.userId,
          resData.token,
          parseInt(resData.expiresIn) *1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(resData.expiresIn) * 1000 
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
  };
  

export const loginUser = (email, password)=>{
    const loginUrl = 
    baseUrl + 'auth/login';

    return async dispatch=>{
        const response = await fetch(loginUrl,{
            method: 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })

        });

        if (!response.ok) {
          const errorResData = await response.json();
          throw new Error(errorResData.message);
        }
        
          const resData = await response.json();
          console.log(resData);
          dispatch(
            authenticate(
              resData.userId,
              resData.token,
              parseInt(resData.expiresIn) *1000
            )
          );
          const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000 
          );
          saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const addReview = (productId,rating,feedback)=>{
  return async (dispatch,getState)=>{
    let id = getState().auth.userId;
    let token = getState().auth.token;
    const response = await fetch( baseUrl + `reviews/${productId}`,{
      method : 'POST',
      headers : {
        'content-type' : 'application/json',
        'Authorization' : `Bearer ${token}`
    },
    body: JSON.stringify({
        rating : rating,
        feedback : feedback,
        userId : id
    })
      }
    );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const loadedProducts = []
  }
}

export const logoutUser = ()=>{
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return ({ type : LOGOUT_USER })
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logoutUser());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};