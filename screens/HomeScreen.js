
import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { TextInput} from 'react-native-paper';
import { Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Icon } from 'react-native-elements'
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  ScrollView,
  Image,
  ImageBackground,
  BackHandler
} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';
import { FontAwesome } from "react-native-vector-icons";
import LinearGradient from 'react-native-linear-gradient'
import normalize from 'react-native-normalize';
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: "100%",
    height: '100%',
    backgroundColor:'#000',
    paddingTop: 10,
    position: 'absolute',
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
  }
});


const HomeScreen = (props) => {
    const [beginGrad,setBeginGrad] = React.useState("#18E3DD");
    const [endGrad,setEndGrad] = React.useState("#3282F4");
    const [iconColor,setIconColor] = React.useState("#18E3DD")
  useEffect(() => {
    // Update the document title using the browser API
 
    console.disableYellowBox= true;
        
        async function fetchData() {

          var Tok = await AsyncStorage.getItem('token')
          var Token = JSON.parse(Tok)
          console.log("Token = ",Token)
          await fetch("http://192.168.10.4:8000/api/auth/userdata", {
            method: 'GET',
            headers: {
              'x-access-token': Token, "Access-Control-Allow-Origin": "*",
             
            },
    
          }).then((response) => response.json()).then(async (data) => {
            console.log(data)
            await AsyncStorage.setItem("profile", JSON.stringify(data))
    
          })
        }
    
        fetchData();


  });

return (
    <> 
       
  
      {/* <ImageBackground
      source={require('../assets/background.jpg')}
      
      style={styles.backgroundImage}> */}
        
<GradientButton
      style={{fontWeight:"bold", marginLeft:"auto",marginRight:"auto",
      postion:0,
      margin:0,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      text="Home"
      textStyle={{ fontSize: 21,color:"white" }}
      gradientBegin={beginGrad}
      gradientEnd={endGrad}
      gradientDirection="diagonal"
      height={normalize(250)}    
      width={"100%"}
      radius={6}
      impact={true}
      impactStyle="Light"
      onPressAction={() => {
        if(beginGrad=="#18E3DD"){
          setBeginGrad("#2AB6D3");
          setEndGrad("#3CDD9F");
          setIconColor("#3CDD9F");}
          else{
            setBeginGrad("#18E3DD");
            setEndGrad("#3282F4")
            setIconColor("#18E3DD")
          }

      }}
    >

    </GradientButton>
  
<View style={{flexDirection:'row', flexWrap:'wrap',marginTop:"10%",marginLeft:"2%"}}>
        
    
    

<TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('appointment')}}>
 <View style={{width:normalize(150),height:normalize(150),marginLeft:normalize(20),color:"black",backgroundColor:"white",shadowColor: 'rgba(0, 0, 0, 0.1)',
shadowOpacity: 1,
elevation: 6,
shadowRadius: 40 ,
shadowOffset : { width: 1, height: 13}}}>

                <FontAwesome
                name="calendar"
                style={{ color: iconColor, fontSize:50,marginTop:20,marginLeft:50 }}
              />
              <Text style={{fontSize:18,marginTop:20,marginLeft:20,fontWeight:"bold"}}>Appointments</Text>

 </View>
</TouchableWithoutFeedback>
    

<TouchableWithoutFeedback onPress={()=>{props.navigation.navigate('patient')}}>
 <View style={{width:normalize(150),height:normalize(150),marginLeft:normalize(20),color:"black",backgroundColor:"white",
shadowColor: 'rgba(0, 0, 0, 0.1)',
shadowOpacity: 0.8,
elevation: 6,
shadowRadius: 40 ,
shadowOffset : { width: 1, height: 13}}}>

                <FontAwesome
                name="heartbeat"
                style={{ color: iconColor, fontSize:50,marginTop:20,marginLeft:normalize(50) }}
              />
              <Text style={{fontSize:18,marginTop:20,marginLeft:45,fontWeight:"bold"}}>Patients</Text>

 </View>
</TouchableWithoutFeedback>

</View>

<View style={{flexDirection:'row', flexWrap:'wrap',marginTop:"5%",marginLeft:"2%"}}>
        
    
    

<TouchableWithoutFeedback onPress= {()=>{props.navigation.navigate('profile')}}>
 <View style={{width:normalize(150),height:normalize(150),marginLeft:normalize(20),color:"black",backgroundColor:"white",shadowColor: 'rgba(0, 0, 0, 0.1)',
shadowOpacity: 1,
elevation: 6,
shadowRadius: 40 ,
shadowOffset : { width: 1, height: 13}}}>

                <FontAwesome
                name="user"
                style={{ color: iconColor, fontSize:50,marginTop:normalize(20),marginLeft:normalize(55) }}
              />
              <Text style={{fontSize:18,marginTop:normalize(20),marginLeft:normalize(45),fontWeight:"bold"}}>Profile</Text>

 </View>
</TouchableWithoutFeedback>
    

<TouchableWithoutFeedback onPress= {()=>{props.navigation.navigate('logout')}}>
 <View style={{width:normalize(150),height:normalize(150),marginLeft:normalize(20),color:"black",backgroundColor:"white",
shadowColor: 'rgba(0, 0, 0, 0.1)',
shadowOpacity: 0.8,
elevation: 6,
shadowRadius: 40 ,
shadowOffset : { width: 1, height: 13}}}>

                <FontAwesome
                name="sign-out"
                style={{ color: iconColor, fontSize:normalize(50),marginTop:normalize(20),marginLeft:normalize(50) }}
              />
              <Text style={{fontSize:18,marginTop:normalize(20),marginLeft:normalize(45),fontWeight:"bold"}}>Logout</Text>

 </View>
</TouchableWithoutFeedback>

</View>

      {/* <View style={{marginLeft:19,justifyContent:'center'}} > */}
        {/* <Text style={{color:'white',fontSize:28,justifyContent:'center'}}>BioAI: Introducing AI to</Text> */}
        {/* <Text style={{marginLeft:27,paddingBottom:20,color:'white',fontSize:34,justifyContent:'center'}}>Bio-AI</Text> */}
        {/* <Button
          raised
          icon={{name: 'search'}}
          title='Scan Image'
        /> */}
        {/* <Text></Text> */}
        
        {/* <Button
          raised
          icon={{name: 'assignment'}}
          title='Appointments'
          onPress = {()=>{props.navigation.navigate('appointment')}}
          />
          <Text></Text>
          <Button
          raised
          icon={{name: 'patient'}}
          title='Patients'
          onPress = {()=>{props.navigation.navigate('patient')}}

          />
           <Text></Text> */}
             {/* <Button
          raised
          icon={{name: 'person'}}
          title='Community'
          onPress = {()=>{props.navigation.navigate('community')}}
          />
           <Text></Text> */}

           
           {/* <Button
          raised
          icon={{name: 'camera'}}
          title='Upload pic'
          onPress = {()=>{props.navigation.navigate('upload')}}
          />
           <Text></Text> */}
          
        {/* <Button
          raised
          icon={{name: 'person'}}
          title='Profile'
          onPress = {()=>{props.navigation.navigate('profile')}}
          />
           <Text></Text>
        
        <Button
          raised
          icon={{name: 'home'}}
          title='Logout'
          onPress = {()=>{props.navigation.navigate('logout')}}
          />
        
        
      </View> */}
    {/* </ImageBackground> */}
  
    </>

   );
 };
 

 
 
 export default HomeScreen;