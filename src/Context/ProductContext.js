import createDataContext from './createDataContext';
import PRODUCTS from '../data/dummy-data'
const ProductReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const {Provider, Context} = createDataContext(
  ProductReducer,
  {},
  {availableProducts:PRODUCTS,userProducts:PRODUCTS.filter(prod => prod.ownerId === 'ui')},
);