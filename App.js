import React from 'react';
import {Provider as ProductProvider} from './src/Context/ProductContext';
import {NavigationContainer} from '@react-navigation/native';
import ShopNavigator from './src/Navigation/ShopNavigator';
const App = () => {
  return (
    <ProductProvider>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </ProductProvider>
  );
};

export default App;
