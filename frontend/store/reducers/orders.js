import { ADD_ORDER,SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders
      };
    case ADD_ORDER:
      const currentDate = new Date().toDateString();
      const dateIndex = state.orders.filter((order)=>order.date.toDateString()===currentDate);
      if( state.orders.length!=0 && dateIndex.length!=0){
        //console.log(dateIndex)
        const orders = [...state.orders];
        const existingOrder = orders[0];
        const updatedOrder = {
          ...existingOrder,
          items: existingOrder.items.concat(action.orderData.items),
          totalAmount : existingOrder.totalAmount + action.orderData.amount
        }
        orders.splice(dateIndex,1);
        orders.push(updatedOrder);
        return {
          orders : orders
        };
      }
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
  }

  return state;
};
