import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import {Context as OrderContext} from '../../Context/OrderContext';

const OrdersScreen = props =>{
    const {orders} = useContext(OrderContext);
    return <FlatList data={orders} keyExtractor={item=>item.id} renderItem={itemData=><Text>{itemData.item.totalAmount}</Text>}/>
}
export default OrdersScreen; 