import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${props.amount}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.removeButton}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        color:'#888',
        fontSize:16,
        marginHorizontal:20
    },
    title:{
        fontSize:16
    },
    amount:{
        fontSize:16
    },
    removeButton:{
        marginLeft:20
    }
});

export default CartItem;
