import React, {useContext} from 'react';
import {View, Text, FlatList, Button, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';
import {Context as CartContext} from '../../Context/CartContext';

const CartScreen = props => {
  const {state} = useContext(CartContext);
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:<Text style={styles.amount}>${state.totalAmount}</Text>
        </Text>
        <Button color={Colors.accent} disabled={state.totalAmount===0} title="Order Now" />
      </View>
      <View>
        <Text>CART ITEMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {margin: 20},
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:20,
    padding:10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
      fontSize:18
  },
  amount: {
      color:Colors.primary
  },
});

export default CartScreen;
