import createDataContext from './createDataContext';
import PRODUCTS from '../data/dummy-data';
import Product from '../Models/Product';
const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT':
      const newProduct = new Product(
        action.payload.id,
        'u1',
        action.payload.title,
        action.payload.description,
        action.payload.imageUrl,
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
        action.payload.description,
        state.userProducts[productIndex].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.userProducts.findIndex(
        prod => prod.id === action.payload.id,
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
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
    case 'SET_PRODUCTS':
      return {
        availableProducts: action.payload,
        userProducts: action.payload,
      };
    default:
      return state;
  }
};
const createProduct =
  dispatch => async (title, description, imageUrl, price) => {
    const response = await fetch(
      'https://shop-63045-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, imageUrl, price}),
      },
    );
    const resData = await response.json();
    dispatch({
      type: 'CREATE_PRODUCT',
      payload: {id: resData.name, title, imageUrl, description, price},
    });
  };
const updateProduct = dispatch => async (id, title, description, imageUrl) => {
  const response = await fetch(
    `https://shop-63045-default-rtdb.firebaseio.com/products/${id}.json`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, imageUrl}),
    },
  );
  console.log(response)
  if(!response.ok){
    throw new Error('Something went wrong!')
  }
  dispatch({
    type: 'UPDATE_PRODUCT',
    payload: {id, title, description, imageUrl},
  });
};
const deleteProduct = dispatch =>async (productId) => {
  const response = await fetch(
    `https://shop-63045-default-rtdb.firebaseio.com/products/${productId}.json`,
    {
      method: 'DELETE',
    },
  );
  if(!response.ok){
    throw new Error('Something went wrong!')
  }
  dispatch({type: 'DELETE_PRODUCT', payload: productId});
};
const fetchProducts = dispatch => async () => {
  try {
    const response = await fetch(
      'https://shop-63045-default-rtdb.firebaseio.com/products.json',
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await response.json();
    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          'u1',
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price,
        ),
      );
    }
    dispatch({type: 'SET_PRODUCTS', payload: loadedProducts});
  } catch (err) {
    throw err;
  }
};
export const {Provider, Context} = createDataContext(
  ProductReducer,
  {deleteProduct, updateProduct, createProduct, fetchProducts},
  {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
  },
);
