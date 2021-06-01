import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../UI/HeaderButton';
import ProductOverview from '../Screens/Shop/ProductOverview';
import ProductDetail from '../Screens/Shop/ProductsDetail';
import Orders from '../Screens/Shop/Orders'
import Cart from '../Screens/Shop/Cart';
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
      <ShopStack.Screen
        name="All Products"
        component={ProductOverview}
        options={({navigation})=>({
          headerRight: props => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {navigation.navigate('Cart')}}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ShopStack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={({route}) => ({title: route.params.productTitle})}
      />
      <ShopStack.Screen name="Cart" component={Cart} />
    </ShopStack.Navigator>
  );
};
export default ShopStackScreens;
