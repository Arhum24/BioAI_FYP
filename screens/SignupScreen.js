
import React,{useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  Dimensions, Stylesheet, ScrollView, ImageBackground,
  SafeAreaView
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';
import GradientButton from 'react-native-gradient-buttons';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const SignupScreen = (props) => {

  const [email,setEmail] = useState('');
  
  const [password,setPassword]=useState('');

  const [cnic,setCnic] = useState('');

  const [licence,setLicence] = useState('');
  const userCountryData = getAllCountries()

const [cca2,setCCA2]= useState('US');
    
  const [licence_country,setLicenceCountry] = useState();
  const [region,setRegion] = useState("Pakistan");
  const [selectedlicence_country,seSelectedtLicenceCountry] = useState(false);
  const [hospital,setHospital] = useState('');

  const [qualification,setQualification] = useState('');

  const [name, setName] = useState('');

  const [username,setUsername ] = useState('');

  const [phone_number,setPhone_number] = useState('');

  const [date,setDate] = useState('');
  const [re_password,setRe_password] = useState('');
 
React.useEffect(()=>{

  console.disableYellowBox= true;
})

  const sendCred= async (props)=>{
    


    
     fetch("http://192.168.10.4:8000/api/auth/register",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password,
        "cnic" : cnic,
        "licence" : licence,
        "qualification" : qualification,
        "name" : name,
        "licence_country":licence_country,
        "hospital":hospital,
        // "username": username,
        "phone_number" : phone_number,
        // "date" : date,
        // "re_password" : re_password,



        
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
       console.log(data);
            try {
                console.log(data);
                alert(data)  
                props.navigation.navigate("login");
              // await AsyncStorage.setItem('token',data.token)
              alert("Signup success")
            } catch (e) {
             alert("Error: "+e)
            }
     })
   
  }
  
  const validate =(props)=>{
    if(email==""){
      Alert("Enter Email")
      console.log("abc")
    }
    else if(password==""){
      Alert("Enter Password")
    }
    else if(username==""){
      Alert("Enter Username")
    }
    else if(name==""){
      Alert("Enter Name")
    }
    else if(cnic==""){
      Alert("Enter CNIC")
    }
    else if(licence==""){
      Alert("Enter Licence")
    }
    else if(phone_number==""){
      Alert("Enter Phone Number")
    }
    else if(qualification==""){
      Alert("Enter Qualification")
    }
    else if (hospital == ""){
alert("Enter Hospital or Clinic Name")
    }
    else if (licence_country == ""){
      alert("Select the country you got licence from.")
          }
  
    else if (email != null && password !=null && name != null && username !=null
       && cnic != null && licence != null && phone_number != null && qualification != null && re_password != null ){
      sendCred(props);
    }
  
  }
  return (
    <SafeAreaView>
    <ScrollView style={{ backgroundColor: 'white', width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height }}>

      <Text 
      style={{fontSize:22,textAlign : "center",alignContent : "center",marginLeft:15,marginTop:50,color:"black",fontWeight:"bold",fontFamily:"serif"}}>BioAI- <Text style={{color:"#18E3DD",fontFamily:"serif"}}>DOCTOR ASSISTANT</Text></Text>
     <Text 
      style={{fontSize:19,marginTop:"5%",textAlign : "center",marginLeft:-5,color:"gray",fontFamily:"serif"}}
      >Create New Account</Text>
      <View
      style={{
        borderBottomColor:"#3282F4",
        borderBottomWidth:4,
        borderRadius:100,
        marginLeft:100,
        marginRight:100,
        marginTop:4,
        textAlign: "center"
      }}
       />
  
      
  
            <TextInput
        label='Name'
        mode="outlined"
        value={name}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setName(text)}
     
      />
      
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
      
      <TextInput
        label='CNIC'
        mode="outlined"
        value={cnic}
        onChangeText={(text)=>{setCnic(text)}}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
     
      />
      <TextInput
        label='Licence'
        mode="outlined"
        value={licence}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setLicence(text)}
     
      />
      <TextInput
        label='Qualification'
        mode="outlined"
        value={qualification}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setQualification(text)}
     
      />
       <TextInput
        label='Phone Number'
        mode="outlined"
        value={phone_number}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setPhone_number(text)}
     
      />
      <TextInput
        label='Password'
        mode="outlined"
        secureTextEntry={true}
        value={password}
        onChangeText={(text)=>{setPassword(text)}}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
     
      />
      
   
         <TextInput
        label='Hospital'
        mode="outlined"
        secureTextEntry={true}
        value={hospital}
        onChangeText={(text)=>{setHospital(text)}}
        style={{marginLeft:15,marginRight:15,marginTop:5}}
        theme={{colors:{primary:"blue"}}}
     
      />
      

      <View style={{flexDirection:'row', flexWrap:'wrap'}} >
        <Text style={{fontSize:20,marginLeft:13,marginTop:7,color:"gray"}}>Licence country: </Text>
        <View style={{marginTop:11, borderWidth:1,borderColor:'gray',borderColor:"black",paddingRight:39,paddingLeft:37,borderRadius:3}}>
        <CountryPicker 
          withEmoji
          onSelect={(value)=>{setLicenceCountry(value.name)}}
        />
</View>
      </View>

      <GradientButton
      style={{marginLeft:18,marginRight:18,marginTop:18,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      text="SIGNUP"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#18E3DD"
      gradientEnd="#3282F4"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      impact
      impactStyle='Light'
      onPressAction={() => sendCred(props)}
    />

      <Button 
        mode="contained"
        color="white"
        style={{marginLeft:15,marginRight:15,marginTop:11,marginBottom:20,
          borderWidth: 1,
          borderColor: 'gray',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.5,
          elevation: 6,
          shadowRadius: 5 ,
          shadowOffset : { width: 1, height: 13},
        
        }}
         onPress={()=>props.navigation.replace("login")}
         >
        <Text> Already Have An Account? Login</Text>
      </Button>
  
   </ScrollView>
   </SafeAreaView>
  );
  
    }


export default SignupScreen;
