import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
const baseUrl = 'http://192.168.0.35:8000'

export const fetchOrders = () => {
  return async (dispatch,getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        baseUrl + `/orders/${userId}`
      );

      if (!response.ok) {
        throw new Error(response.message);
      }

      const resData = await response.json();
      console.log(resData)
      const loadedOrders = [];

      resData[0].orders.forEach(order=>{  //resData[0].orders
        loadedOrders.push(
          new Order(
            order._id,
            order.cartItems,//order.cartItems,
            order.totalAmount,
            new Date(order.date)
          )
        );
      })

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
 
  return async (dispatch,getState) => {
    const date = new Date();
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      baseUrl + `/orders/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.message;
      throw new Error('Something went wrong!' + errorId);
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData._id,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
