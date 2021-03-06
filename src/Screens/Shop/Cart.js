import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Colors from '../../Constants/Colors';
import {Context as CartContext} from '../../Context/CartContext';
import {Context as OrderContext} from '../../Context/OrderContext';
import CartItem from '../../Components/Shop/CartItem';
import Card from '../../UI/Card';

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const {state, removeFromCart, clearCart} = useContext(CartContext);
  const orderContext = useContext(OrderContext);
  const cartitems = [];
  for (const key in state.items) {
    cartitems.push({
      productId: key,
      productTitle: state.items[key].productTitle,
      productPrice: state.items[key].productPrice.toFixed(2),
      quantity: state.items[key].quantity,
      sum: state.items[key].sum,
    });
  }
  const sendOrderHandler = async () => {
    setIsLoading(true);
    await orderContext.addOrder(cartitems, state.totalAmount);
    clearCart();
    setIsLoading(false);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            ${Math.round(state.totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            disabled={state.totalAmount === 0}
            title="Order Now"
            onPress={sendOrderHandler}
          />
        )}
      </View>
      <FlatList
        data={cartitems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            amount={itemData.item.sum.toFixed(2)}
            title={itemData.item.productTitle}
            deletable
            onRemove={() => {
              removeFromCart(itemData.item.productId);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {margin: 20},
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
