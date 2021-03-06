import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {Platform, Text,View,Button, SafeAreaView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../UI/HeaderButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductOverview from '../Screens/Shop/ProductOverview';
import ProductDetail from '../Screens/Shop/ProductsDetail';
import Orders from '../Screens/Shop/Orders';
import Cart from '../Screens/Shop/Cart';
import UserProducts from '../Screens/User/UserProducts';
import EditProduct from '../Screens/User/EditProduct';
import AuthScreen from '../Screens/User/AuthScreen';
import StartupScreen from '../Screens/StartupScreen';
import Colors from '../Constants/Colors';
import {Context as AuthContext} from '../Context/AuthContext';
const ProductsStack = createStackNavigator();
const OrderStack = createStackNavigator();
const userStack = createStackNavigator();
const authStack = createStackNavigator();
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
          headerRight: props => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === 'android' ? 'md-create' : 'ios-create'
                }
                onPress={() => {
                  navigation.navigate('Edit Product', {productId: null});
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <userStack.Screen
        name="Edit Product"
        component={EditProduct}
        options={props => ({
          title: props.route.params.productId ? 'Edit Product' : 'Add Product',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName={
                  Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
                }
                onPress={() => {
                  JSON.stringify(props.route.params.submit());
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </userStack.Navigator>
  );
};
const AuthStackScreens = () => {
  return (
    <authStack.Navigator
      initialRouteName="start"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}>
      <authStack.Screen name="start" component={StartupScreen} />
      <authStack.Screen
        name="Auth"
        component={AuthScreen}
        options={() => ({
          title: 'Authenticate',
          headerLeft: ()=> null
        })}
      />
    </authStack.Navigator>
  );
};
const DrawerScreens = () => {
  const {signout} = useContext(AuthContext);
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContent={props => {
        return (
          <View style={{flex: 1,paddingTop:20}} >
            <SafeAreaView>
              <DrawerItemList {...props}/>
            <Button title="Signout" color={Colors.primary} onPress={()=>{
              signout()
            }} />
            </SafeAreaView>
          </View>
        );
      }}
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

const MainNavigator = () => {
  const {state} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {state.token ? <DrawerScreens /> : <AuthStackScreens />}
    </NavigationContainer>
  );
};
export default MainNavigator;
