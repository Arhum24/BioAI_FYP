
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  Dimensions, Stylesheet, ScrollView, ImageBackground, View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from 'react-native';

import GradientButton from 'react-native-gradient-buttons';

const LoginScreen = (props) => {
const [email,setEmail] = useState('');
const [password,setPassword]=useState('')
const [loginerror,setLoginError] = useState('');
async function Login() {

  const data = { email: email, password: password }
  console.log(data)
  let result = "";
  try {
    console.log("Inside Fetch Command");
      await fetch("http://192.168.10.4:8000/api/auth/login", {
        method: 'POST',
        headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json',
                     "accepts":"application/json"
   
                   },

          body: JSON.stringify({
              email: email,
              password: password,

          }),
          
         
      }).then((response) => response.json())
      .then(async (responseData) => {
            console.log("inside responsejson");
           console.log('response object:',responseData)
           result=responseData
           await AsyncStorage.setItem('token',JSON.stringify(result.token));
          props.navigation.navigate("home");

       }).done();

  } catch (err) {
      console.log(err)
      return result = { auth: false }
  }


  return result
}

  

console.disableYellowBox= true;
  return (
   <> 


   <ScrollView style={{ backgroundColor: 'white', width: Dimensions.get("window").width, //for full screen
              height: Dimensions.get("window").height }}>
   
   {/* <ImageBackground
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
        


            }}
            // source={require('.../../assets/11436.jpg')}/> */}
     
     <StatusBar backgroundColor="blue" barStyle="light-content" />
      <Text 
      style={{fontSize:22,textAlign : "center",alignContent : "center",marginLeft:18,marginTop:100,color:"black",fontWeight:"bold",fontFamily:"serif"}}>BioAI- <Text style={{color:"#18E3DD",fontFamily:"serif"}}>DOCTOR ASSISTANT</Text></Text>
      <Text 
      style={{fontSize:19,marginTop:"8%",textAlign : "center",marginLeft:-5,color:"gray",fontFamily:"serif"}}
      >Enjoy the Experience</Text>
      <View
      style={{
        borderBottomColor:"#3282F4",
        borderBottomWidth:4,
        borderRadius:100,
        marginLeft:90,
        marginRight:100,
        marginTop:4,
        textAlign : "center"
      }}
       />

         <Text 
      style={{fontSize:19,marginTop:"8%",textAlign : "center",marginLeft:-5,color:"red",fontFamily:"serif"}}
    >{loginerror}</Text>
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:25}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      <TextInput
        label='Password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:18,marginRight:18,marginTop:18}}
        theme={{colors:{primary:"blue"}}}
     
      />



<GradientButton
      style={{marginLeft:18,marginRight:18,marginTop:18,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13},}}
      text="Login"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#18E3DD"
      gradientEnd="#3282F4"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      impact
      impactStyle='Light'
      onPressAction={async() => {
       
        if(email.length >0 ){
            if(password.length>0){
                var result = Login();}
            else{
                setLoginError("*Incorrect Email or Password")
            }
          }else{
            setLoginError("*Incorrect Email or Password")

          }        }}
    />



      <Button 
        mode="contained"
        color="white"
        style={{marginLeft:18,marginRight:18,marginTop:18,
          borderWidth: 1,
          borderColor: 'gray',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.8,
          elevation: 6,
          shadowRadius: 15 ,
          shadowOffset : { width: 1, height: 13},
        
        }}
         onPress={()=>props.navigation.replace("signup")}
         >
        <Text style={{}}> Don't Have An Account?</Text>
      </Button>
   
     

     
      </ScrollView>
   </>
  );
};



export default LoginScreen;
