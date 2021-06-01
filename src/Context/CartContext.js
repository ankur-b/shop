import createDataContext from './createDataContext';
import CartItem from '../Models/CartItem';
const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedOrNewCartItem 
      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return{
          items:{...state.items,[addedProduct.id]:updatedOrNewCartItem},
          totalAmount: state.totalAmount + prodPrice
      }
    default:
      return state;
  }
};
const addToCart = dispatch => product => {
  dispatch({type: 'ADD_TO_CART', payload: product});
};
export const {Provider, Context} = createDataContext(
  CartReducer,
  {addToCart},
  {items: {}, totalAmount: 0},
);
