import React from 'react';
import {Provider as ProductProvider} from './src/Context/ProductContext';
import {Provider as CartProvider} from './src/Context/CartContext';
import {NavigationContainer} from '@react-navigation/native';
import ShopNavigator from './src/Navigation/ShopNavigator';
const App = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <NavigationContainer>
          <ShopNavigator />
        </NavigationContainer>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
