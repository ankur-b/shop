import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, Text, FlatList, Button, ActivityIndicator} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext';
import {Context as CartContext} from '../../Context/CartContext';
import ProductItem from '../../Components/Shop/ProductItem';
import Colors from '../../Constants/Colors';
import PRODUCTS from '../../data/dummy-data';
const ProductOverview = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const {state, fetchProducts} = useContext(ProductContext);
  const cartContext = useContext(CartContext);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('Product Detail', {
      productId: id,
      productTitle: title,
    });
  };
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [setError, setIsLoading]);
  useEffect(() => {
    const willFocusSub = props.navigation.addListener('focus', loadProducts);
    return ()=>{
      willFocusSub.remove()
    }
  },[loadProducts]);
  useEffect(() => {
    loadProducts(); 
  }, []);
  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && state.availableProducts.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No Products found.Maybe start adding some products</Text>
      </View>
    );
  }
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
          }}>
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              cartContext.addToCart(itemData.item);
            }}
          />
        </ProductItem>
      )}
    />
  );
};
export default ProductOverview;
