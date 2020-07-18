
import React,{useEffect} from 'react';
import {
  
  AsyncStorage
} from 'react-native';
const Logout = (props) => {    
  useEffect(() => {    


    async function logoutdata(){
   try{
    await AsyncStorage.removeItem('token');
        if(await AsyncStorage.getItem('appointmentDetail')!=null){
            await AsyncStorage.removeItem('appointmentDetail');
        }
        if(await AsyncStorage.getItem('profile')!=null){
            await AsyncStorage.removeItem('profile');}
        }
        catch(err){
        }
        props.navigation.navigate('login');}

        logoutdata();


        });
return <></>

 };
 

 
 
 export default Logout;


