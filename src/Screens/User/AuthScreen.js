import React, {
  useContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from 'react';
import {
  ScrollView,
  View,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Context as AuthContext} from '../../Context/AuthContext';
import Input from '../../UI/Input';
import Card from '../../UI/Card';
import Colors from '../../Constants/Colors';
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
const AuthScreen = props => {
  const {state, signup, signin} = useContext(AuthContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidators: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{text: 'Okay'}]);
    }
  }, [error]);
  const authHandler = () => {
    if (isSignup) {
      setIsLoading(true);
      
      signup(formState.inputValues.email, formState.inputValues.password)
        .then(() => {
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      signin(formState.inputValues.email, formState.inputValues.password)
        .then(() => {
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatch({
        type: FORM_UPDATE,
        payload: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [],
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCaptitalize="none"
            errorText="Please enter a valid email address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCaptitalize="none"
            errorText="Please enter a valid Password"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? 'Sign Up' : 'Sign In'}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? 'Sign In' : 'Sign Up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup(prevState => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginBottom: 50,
  },
  authContainer: {
    maxWidth: '80%',
    width: 400,
    height: 200,
    padding: 20,
  },
  buttonContainer: {
    margin: 10,
  },
});
export default AuthScreen;
