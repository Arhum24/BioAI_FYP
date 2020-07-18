
import React,{useEffect,useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  AsyncStorage
 
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import Appointment from './screens/Appointment'
import Profile from './screens/Profile'
import Logout from './screens/Logout'
import AddAppointment from './screens/AddAppointment'
import AppointmentDetails from './screens/AppointmentDetails'
import Patient from './screens/Patient'
import PatientDetails from './screens/PatientDetail'
import Diagnosis from './screens/Diagnosis'
import fetchimages from './screens/restaurantimages'
import ContactUs from './screens/contactus'
import Posts from './screens/posts';
import DiagnosisDetails from './screens/DiagnosisDetails';
import ImagePickerExample from './screens/uploadpic';


const Stack = createStackNavigator();

const App= ({ navigation }) => {
   const [isloggedin,setLogged] = useState(null)

   const detectLogin= async ()=>{
      const token = await AsyncStorage.getItem('token')
      if(token){
          setLogged(true)
      }else{
          setLogged(false)
      }
   }
  useEffect(()=>{
     detectLogin()
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" headerMode="none">
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name = "home" component = {HomeScreen}/>
          <Stack.Screen name = "appointment" component = {Appointment}/>
          <Stack.Screen name = "profile" component = {Profile}/>
          <Stack.Screen name = "logout" component = {Logout}/>
          <Stack.Screen name = "addAppointment" component = {AddAppointment}/>
          <Stack.Screen name = "appointmentDetail" component = {AppointmentDetails}/>
          <Stack.Screen name = "patient" component = {Patient}/>
          <Stack.Screen name = "patientDetail" component = {PatientDetails}/>
          <Stack.Screen name = "diagnosisDetail" component = {DiagnosisDetails}/>
          <Stack.Screen name = "diagnosis" component = {Diagnosis}/>
          <Stack.Screen name = "community" component = {fetchimages}/>
          <Stack.Screen name = "write" component ={ContactUs}/>
          <Stack.Screen name = "Post" component ={Posts}/>
          <Stack.Screen name = "upload" component ={ImagePickerExample}/>
      </Stack.Navigator>
    </NavigationContainer>);
  };


export default App;
