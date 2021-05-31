import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import ProductOverview from '../Screens/Shop/ProductOverview';
import ProductDetail from '../Screens/Shop/ProductsDetail';
import Colors from '../Constants/Colors';
const ShopStack = createStackNavigator();
const ShopStackScreens = () => {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <ShopStack.Screen name="All Products" component={ProductOverview}/>
      <ShopStack.Screen name="Product Detail" component={ProductDetail} options={({route})=>({title:route.params.productTitle})}/>
    </ShopStack.Navigator>
  );
};
export default ShopStackScreens