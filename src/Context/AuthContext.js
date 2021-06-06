import createDataContext from './createDataContext';
import API_KEY from '../../Firebase_API_KEY';
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {};
    case 'SIGNIN':
      return {};
    default:
      return state;
  }
};
const signup = dispatch => async (email, password) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  {
      method:"POST",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:email,password:password,returnSecureToken:true
    })
  });
  console.log(email,password,'callback',API_KEY)
  if(!response.ok){
      throw new Error('Something went wrong!')
  }
  const resData = await response.json()
  console.log(resData)
  dispatch({type: 'SIGNUP'});
};
const signin = dispatch => async (email, password) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:email,password:password,returnSecureToken:true
      })
    });
    console.log(email,password,'callback',API_KEY)
    if(!response.ok){
        throw new Error('Something went wrong!')
    }
    const resData = await response.json()
    console.log(resData)
    dispatch({type: 'SIGNIN'});
  };
export const {Provider, Context} = createDataContext(
  AuthReducer,
  {signup,signin},
  {},
);
