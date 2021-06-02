import React, {useContext} from 'react';
import {FlatList, Button} from 'react-native';
import ProductItem from '../../Components/Shop/ProductItem';
import {Context as ProductContext} from '../../Context/ProductContext';
import Colors from '../../Constants/Colors';
const UserProducts = props => {
  const {state} = useContext(ProductContext);
  return (
    <FlatList
      data={state.userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}>
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button color={Colors.primary} title="Delete" onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};
export default UserProducts;
