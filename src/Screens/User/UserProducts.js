import React, {useContext} from 'react';
import {FlatList, Button} from 'react-native';
import ProductItem from '../../Components/Shop/ProductItem';
import {Context as ProductContext} from '../../Context/ProductContext';
import {Context as CartContext} from '../../Context/CartContext';
import Colors from '../../Constants/Colors';
const UserProducts = props => {
  const {state, deleteProduct} = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const editProductHandler = (id) =>{
    props.navigation.navigate('Edit Product',{
        productId:id
    })
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
            editProductHandler(itemData.item.id)
          }}>
          <Button color={Colors.primary} title="Edit" onPress={() => {
              editProductHandler(itemData.item.id)
          }} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteProduct(itemData.item.id);
              cartContext.deleteProduct(itemData.item.id)
            }}
          />
        </ProductItem>
      )}
    />
  );
};
export default UserProducts;
