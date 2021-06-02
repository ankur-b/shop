import createDataContext from './createDataContext';
import PRODUCTS from '../data/dummy-data';
import Product from '../Models/Product';
const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT':
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case 'UPDATE_PRODUCT':
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.payload.id,
      );
      const updatedProduct = new Product(
        action.payload.id,
        state.userProducts[productIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        state.userProducts[productIndex].price, 
        action.payload.description,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.userProducts.findIndex(
        prod => prod.id === action.payload.id,
      );
      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct
      return {
        ...state,
        availableProducts:updatedAvailableProducts,
        userProducts:updatedUserProducts
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.payload,
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};
const createProduct = dispatch => (title, description, imageUrl, price) => {
  dispatch({
    type: 'CREATE_PRODUCT',
    payload: {title, description, imageUrl, price},
  });
};
const updateProduct = dispatch => (id, title, description, imageUrl) => {
  dispatch({
    type: 'UPDATE_PRODUCT',
    payload: {id, title, description, imageUrl},
  });
};
const deleteProduct = dispatch => productId => {
  dispatch({type: 'DELETE_PRODUCT', payload: productId});
};
export const {Provider, Context} = createDataContext(
  ProductReducer,
  {deleteProduct, updateProduct, createProduct},
  {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
  },
);
