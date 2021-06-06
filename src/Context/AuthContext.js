import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';
import API_KEY from '../../Firebase_API_KEY';
let timer;
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case 'SIGNIN':
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case "SIGNOUT":
      return {
        token:null,
        userId:null
      }
    default:
      return state;
  }
};
const signup = dispatch => async (email, password) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  );
  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong';
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email already exists';
    }
    throw new Error(message);
  }
  const resData = await response.json();
  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
  ).toISOString();
  await AsyncStorage.setItem('token', resData.idToken);
  await AsyncStorage.setItem('userId', resData.localId);
  await AsyncStorage.setItem('expireTime', expirationDate);
  setLogoutTimer(expirationDate)
  dispatch({
    type: 'SIGNUP',
    payload: {token: resData.idToken, userId: resData.localId},
  });
};
const signin = dispatch => async (email, password) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    },
  );
  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong';
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid';
    }
    throw new Error(message);
  }
  const resData = await response.json();
  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
  ).toISOString();
  await AsyncStorage.setItem('token', resData.idToken);
  await AsyncStorage.setItem('userId', resData.localId);
  await AsyncStorage.setItem('expireTime', expirationDate);
  setLogoutTimer()
  dispatch({
    type: 'SIGNIN',
    payload: {token: resData.idToken, userId: resData.localId},
  });
};
const signout = dispatch => async()=>{
  clearLogoutTimer()
  await AsyncStorage.removeItem('token')
  await AsyncStorage.removeItem('userId')
  await AsyncStorage.removeItem('expireTime')
  dispatch({type:'SIGNOUT'})
}
const tryLocalSignin =
  dispatch =>
  async ({navigation}) => {
    const expireTime = await AsyncStorage.getItem('expireTime');
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    const expirationDate = new Date(expireTime);
    const expirationTime = expirationDate.getTime() - new Date().getTime()
    setLogoutTimer(expirationTime)
    if (!token && !userId && expirationDate <= new Date()) {
      navigation.navigate('Auth');
      return;
    } else {
      dispatch({
        type: 'SIGNIN',
        payload: {token: token, userId: userId},
      });
    }
  };
const clearLogoutTimer = ()=>{
  if(timer){
    clearTimeout(timer)
  }
}
const setLogoutTimer = expirationTime =>{
  timer = setTimeout(()=>{
    signout()
  },expirationTime/1000)
}
export const {Provider, Context} = createDataContext(
  AuthReducer,
  {signup, signin,tryLocalSignin,signout},
  {token: null, userId: null},
);
