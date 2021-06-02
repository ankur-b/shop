import React, {useState, useContext, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, TextInput, StyleSheet} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const EditProduct = props => {
  const {state,updateProduct,createProduct} = useContext(ProductContext);
  const prodId = props.route.params.productId;
  const editedProduct = state.userProducts.find(prod => prod.id === prodId);
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : '',
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : '',
  );
  const submitHandler = useCallback(() => {
    if(editedProduct){
        updateProduct(prodId,title,imageUrl,description)
    }else{
        createProduct(title,imageUrl,description,+price)
    }
  })
  useEffect(() => {
    props.navigation.setParams({submit:submitHandler})
  }, [updateProduct,createProduct,prodId,title,description,imageUrl,price]);
  return (
    <ScrollView> 
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProduct;
