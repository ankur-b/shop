import React, {useContext} from 'react';
import {View,Text ,FlatList, Button, Alert} from 'react-native';
import ProductItem from '../../Components/Shop/ProductItem';
import {Context as ProductContext} from '../../Context/ProductContext';
import {Context as CartContext} from '../../Context/CartContext';
import Colors from '../../Constants/Colors';
const UserProducts = props => {
  const {state, deleteProduct} = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const editProductHandler = id => {
    props.navigation.navigate('Edit Product', {
      productId: id,
    });
  };
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          deleteProduct(id);
          cartContext.deleteProduct(id);
        },
      },
    ]);
  };
  if(state.userProducts.length ===0){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>No products found.maybe start creating some</Text>
    </View>
  }
  return (
    <FlatList
      data={state.userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this,itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};
export default UserProducts;
