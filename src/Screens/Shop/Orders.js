import React, {useContext} from 'react';
import {FlatList, Text} from 'react-native';
import {Context as OrderContext} from '../../Context/OrderContext';
import OrderItem from '../../Components/Shop/OrderItem';
const OrdersScreen = props => {
  const {state} = useContext(OrderContext);
  console.log(state.orders);
  return (
    <FlatList
      data={state.orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate}
      items={itemData.item.items}/>}
    />
  );
};
export default OrdersScreen;
