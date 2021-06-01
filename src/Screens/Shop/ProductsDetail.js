import React, {useContext} from 'react';
import {ScrollView, View, Text, Image, Button, StyleSheet} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext';
import {Context as CartContext} from '../../Context/CartContext';
import Colors from '../../Constants/Colors';
const ProductDetail = props => {
  const {state} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);
  const {productId} = props.route.params;
  const selectedProduct = state.availableProducts.find(
    product => product.id === productId,
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={()=>{
            addToCart(selectedProduct)
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price} </Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions:{
    marginVertical:10,
    alignItems:'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal:20
  },
});

export default ProductDetail;
