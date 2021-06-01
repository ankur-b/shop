import React, {useContext} from 'react';
import {FlatList, Text} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext';
import {Context as CartContext} from '../../Context/CartContext';
import ProductItem from '../../Components/Shop/ProductItem';
const ProductOverview = props => {
  const {state} = useContext(ProductContext);
  const cartContext = useContext(CartContext)
  return (
    <FlatList
      data={state.availableProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate('Product Detail', {
              productId: itemData.item.id,
              productTitle:itemData.item.title
            });
          }}
          onAddToCart={()=>{
            cartContext.addToCart(itemData.item)
          }}
        />
      )}
    />
  );
};
export default ProductOverview;
