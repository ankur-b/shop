import React, {useContext,useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../Context/AuthContext';
import Colors from '../Constants/Colors';

const StartupScreen = ({navigation}) => {
  const {tryLocalSignin} = useContext(AuthContext)
  useEffect(()=>{
      tryLocalSignin({navigation})
  },[])
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary}/>
    </View>
  );
};
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default StartupScreen