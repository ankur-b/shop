import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../UI/HeaderButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductOverview from '../Screens/Shop/ProductOverview';
import ProductDetail from '../Screens/Shop/ProductsDetail';
import Orders from '../Screens/Shop/Orders';
import Cart from '../Screens/Shop/Cart';
import UserProducts from '../Screens/User/UserProducts';
import Colors from '../Constants/Colors';
const ProductsStack = createStackNavigator();
const OrderStack = createStackNavigator();
const userStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const ProductsStackScreens = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <ProductsStack.Screen
        name="All Products"
        component={ProductOverview}
        options={({navigation}) => ({
          headerLeft: props => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: props => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                  navigation.navigate('Cart');
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ProductsStack.Screen
        name="Product Detail"
        component={ProductDetail}
        options={({route}) => ({title: route.params.productTitle})}
      />
      <ProductsStack.Screen
        name="Cart"
        component={Cart}
        options={props => ({title: 'Your Cart'})}
      />
    </ProductsStack.Navigator>
  );
};
const OrderStackScreens = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerTitle: 'Your Orders',
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <OrderStack.Screen
        name="Orders"
        component={Orders}
        options={({navigation}) => ({
          headerLeft: props => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrderStack.Navigator>
  );
};
const userStackScreens = () => {
  return (
    <userStack.Navigator
      screenOptions={{
        headerTitle: 'Your Orders',
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <userStack.Screen
        name="User Products"
        component={UserProducts}
        options={({navigation}) => ({
          headerLeft: props => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </userStack.Navigator>
  );
};
const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}>
      <Drawer.Screen
        options={{
          drawerIcon: drawerConfig => (
            <Icon
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
            />
          ),
        }}
        name="Products"
        component={ProductsStackScreens}
      />
      <Drawer.Screen
        options={{
          drawerIcon: drawerConfig => (
            <Icon
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
            />
          ),
        }}
        name="Orders"
        component={OrderStackScreens}
      />
      <Drawer.Screen
        options={{
          drawerIcon: drawerConfig => (
            <Icon
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
            />
          ),
        }}
        name="User Products"
        component={userStackScreens}
      />
    </Drawer.Navigator>
  );
};
export default DrawerScreen;
