import React from 'react';
import {Provider as ProductProvider} from './src/Context/ProductContext';
import {Provider as CartProvider} from './src/Context/CartContext';
import {Provider as OrderProvider} from './src/Context/OrderContext';
import {Provider as AuthProvider} from './src/Context/AuthContext';
import MainNavigator from './src/Navigation/ShopNavigator';
const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
