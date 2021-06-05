import React, {useEffect,useContext} from 'react';
import {FlatList, Button} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext';
import {Context as CartContext} from '../../Context/CartContext';
import ProductItem from '../../Components/Shop/ProductItem';
import Colors from '../../Constants/Colors';
const ProductOverview = props => {
  const {state,fetchProducts} = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('Product Detail', {
      productId: id,
      productTitle: title,
    });
  };
  useEffect(()=>{
    fetchProducts(0)
  },[fetchProducts,state])
  return (
    <FlatList
      data={state.availableProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={()=>{
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={()=>{
              cartContext.addToCart(itemData.item);
            }}
          />
        </ProductItem>
      )}
    />
  );
};
export default ProductOverview;
