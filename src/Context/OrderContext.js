import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import Order from '../Models/order';
const OrderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    case 'SET_ORDERS':
      return {
        orders: action.payload,
      };
    default:
      return state;
  }
};
const addOrder = dispatch => async (cartItems, totalAmount) => {
  const date = new Date();
  const token = await AsyncStorage.getItem('token');
  const userId = await AsyncStorage.getItem('userId');
  const response = await fetch(
    `https://shop-63045-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cartItems, totalAmount, date: date.toISOString()}),
    },
  );
  if (!response.ok) {
    throw new Error('Something went wrong');
  }
  const resData = await response.json();
  dispatch({
    type: 'ADD_ORDER',
    payload: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date: date,
    },
  });
};
const fetchOrders = dispatch => async () => {
  const userId = await AsyncStorage.getItem('userId');
  try {
    const response = await fetch(
      `https://shop-63045-default-rtdb.firebaseio.com/orders/${userId}.json`,
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await response.json();
    const loadedOrders = [];
    for (const key in resData) {
      loadedOrders.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date),
        ),
      );
    }
    dispatch({type: 'SET_ORDERS', payload: loadedOrders});
  } catch (err) {
    throw err;
  }
};
export const {Provider, Context} = createDataContext(
  OrderReducer,
  {addOrder, fetchOrders},
  {orders: []},
);
