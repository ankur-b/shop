import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {Context as OrderContext} from '../../Context/OrderContext';
import OrderItem from '../../Components/Shop/OrderItem';
import Colors from '../../Constants/Colors';
const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const {state, fetchOrders} = useContext(OrderContext);
  const loadOrders = useCallback(async () => {}, [state, setIsLoading]);
  useEffect(() => {
    setIsLoading(true);
    fetchOrders().then(() => {
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      
      data={state.orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};
export default OrdersScreen;
