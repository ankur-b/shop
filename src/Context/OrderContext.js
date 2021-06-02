import createDataContext from './createDataContext';
import Order from '../Models/order';
const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
        const newOrder = new Order(new Date().toString(),action.payload.items,action.payload.amount,new Date())
        return {
            ...state,
            orders:state.orders.concat(newOrder)
        }
    default:
      return state;
  }
};
const addOrder = dispatch => (cartItems, totalAmount) => {
  dispatch({
    type: 'ADD_ORDER',
    payload: {
      items: cartItems,
      amount: totalAmount,
    },
  });
};
export const {Provider, Context} = createDataContext(
  OrderReducer,
  {addOrder},
  {orders: []},
);
