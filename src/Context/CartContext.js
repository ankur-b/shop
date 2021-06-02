import createDataContext from './createDataContext';
import CartItem from '../Models/CartItem';
const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updatedOrNewCartItem;
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
      return {
        items: {...state.items, [addedProduct.id]: updatedOrNewCartItem},
        totalAmount: state.totalAmount + prodPrice,
      };
    case 'REMOVE_FROM_CART':
      const selectedCartItem = state.items[action.payload];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum.toFixed(2) -
            selectedCartItem.productPrice.toFixed(2),
        );
        updatedCartItems = {...state.items, [action.payload]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.payload];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount:
          state.totalAmount.toFixed(2) -
          selectedCartItem.productPrice.toFixed(2),
      };
    case 'CLEAR_CART':
      return {
        items: {},
        totalAmount: 0,
      };
    case 'DELETE_PRODUCT':
      if(!state.items[action.payload]){
        return state
      }
      const updatedItems = state.items;
      const itemTotal = state.items[action.payload].sum
      delete updatedItems[action.payload]
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal  
      };
    default:
      return state;
  }
};
const addToCart = dispatch => product => {
  dispatch({type: 'ADD_TO_CART', payload: product});
};
const removeFromCart = dispatch => pid => {
  dispatch({type: 'REMOVE_FROM_CART', payload: pid});
};
const clearCart = dispatch => pid => {
  dispatch({type: 'CLEAR_CART', payload: pid});
};
const deleteProduct = dispatch => pid => {
  dispatch({type: 'DELETE_PRODUCT', payload: pid});
};
export const {Provider, Context} = createDataContext(
  CartReducer,
  {addToCart, removeFromCart, clearCart,deleteProduct},
  {items: {}, totalAmount: 0},
);
