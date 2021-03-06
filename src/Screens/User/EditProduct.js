import React, {useReducer, useState,useContext, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import {Context as ProductContext} from '../../Context/ProductContext';
import {LogBox} from 'react-native';
import Input from '../../UI/Input';
import Colors  from '../../Constants/Colors';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const FORM_UPDATE = 'UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.payload,
    };
    const updatedValidities = {
      ...state.inputValidators,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidators: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};
const EditProduct = props => {
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState()
  const {state, updateProduct, createProduct} = useContext(ProductContext);
  const prodId = props.route.params.productId;
  const editedProduct = state.userProducts.find(prod => prod.id === prodId);
  const [formState, dispatch] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidators: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });
  useEffect(()=>{
    if(error){
      Alert.alert('An error occured!',error,[{text:'Okay'}])
    }
  },[error])
  const submitHandler = useCallback( async() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {text: 'Okay'},
      ]);
      return;
    }
    setError(null)
    setIsLoading(true)
    try{
      if (editedProduct) {
        await updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
        );
      } else {
        await createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price,
        );
      }
      props.navigation.goBack();
    }catch(err){
      setError(err.message)
    }
    setIsLoading(false)
  });
  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [updateProduct,createProduct, prodId, formState]);
  const inputChangeHandler = useCallback((inputIdentifier, inputValue,inputValidity) => {
    dispatch({
      type: FORM_UPDATE,
      payload: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  },[dispatch]);
  if(isLoading){
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size='large' color={Colors.primary}/>
    </View>
  }
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={100}>
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect={false}
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct?editedProduct.title:''}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct?editedProduct.imageUrl:''}
          initiallyValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect={false}
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct?editedProduct.description:''}
          initiallyValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProduct;
