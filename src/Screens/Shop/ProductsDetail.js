import React, {useContext} from 'react';
import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext'
const ProductDetail = props => {
    const {state} = useContext(ProductContext)
    const {productId} = props.route.params
    const product = state.availableProducts.find(product=>product.id===productId)
    console.log(product)
    console.log(productId);
  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});



export default ProductDetail;
