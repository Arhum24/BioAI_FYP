
import React,{useState} from 'react';
import {TextInput,Button} from 'react-native-paper';
import {FontAwesome} from '@expo/vector-icons';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert,
  ScrollView,
} from 'react-native';
import Svg, {

  LinearGradient,Rect,Defs,Stop,Ellipse

} from 'react-native-svg';
import { Card,Container, Header, Left,Right,Body, Content,DatePicker, CardItem } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Input } from 'react-native-elements';
import moment from'moment';
import GradientButton from 'react-native-gradient-buttons';
import normalize from "react-native-normalize";
const AddApointment = (props) => {
  const [isDateTimePickerVisible,setDateTimePickerVisible]=useState(false);
 
  const _showDateTimePicker = () => setDateTimePickerVisible(true);

  const _hideDateTimePicker = () => setDateTimePickerVisible(false);
  const { token } = props.route.params;
  const {user} = props.route.params;
  console.log("Doctor ID = "+user._id)
  console.log("Token = "+token)
 
  const [email,setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone_number,setPhone_number] = useState('');
  const [date,setDate] = useState();
  const [dateSelected,setDateSelected] = useState(false);
  const _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    
   
    _hideDateTimePicker();
    setDate(date);
    setDateSelected(true);
  };
  // const [time,setTime] = useState('');
  const sendCred= async (props)=>{
    try{
      const { token } = props.route.params;
      const {user} = props.route.params;
      console.log("Doctor ID = "+user._id)
      console.log("Token = "+token)
      console.log(name,email,phone_number,date,user._id)
     fetch("http://192.168.10.4:8000/api/auth/appointment",{
       method:"POST",
       headers: {
        'x-access-token': token, "Access-Control-Allow-Origin": "*",  'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        
        "Doctor_ID": user._id,
        "Name": name,
        "Email": email,
        "Phone_Number": Number(phone_number),
        "DateAppoi": new Date(date).toISOString()
      })
     })
     .then(res=>res.json())
     .then(async (data)=>{
       console.log(data);
       if(data.message){alert(data.message)}
       else{props.navigation.push('appointment')}
    })}catch(err){
      alert(err)
    }
   
  }
  return (
    <ScrollView>
    <Container>
     <Header style={{backgroundColor:"#2AB6D3"}} transparent><Left>
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{props.navigation.push('appointment')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
    <Body>
    <Text style={{fontSize:25,color:"white"}} >Add Appointment</Text>
   
    </Body>  
    </Header>
   

      <Content>
      {/* <Text
      style={{fontSize:20,marginLeft:18,marginTop:20,color:"red"}}>Add New Appointment</Text>       */}
           <Svg height="220" width="100%">
  <Defs>
    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0" stopColor="#18E3DD" stopOpacity="1" />
      <Stop offset="1" stopColor="#3282F4" stopOpacity="1" />
    </LinearGradient>
  </Defs>

  <Rect
    x="0"
    y="0"
    width="100%"
    height="220"
    fill="url(#grad)"

  />
  <FontAwesome name="calendar" size={50} color="white" style={{justifyContent:"center",marginTop:100,marginLeft: "auto", marginRight: "auto"}}></FontAwesome>
   <Text style={{justifyContent:"center",marginTop:10,marginLeft: "auto", marginRight: "auto",fontSize:20,color:"white",fontWeight:"bold"}}>
  
       {"Schedule Appointment"}</Text>   

</Svg>
         
      <TextInput
        label='Name'
        mode="outlined"
        value={name}
        style={{marginLeft:18,marginRight:18,marginTop:15}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setName(text)}
     
      />
        


      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={{marginLeft:18,marginRight:18,marginTop:25}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setEmail(text)}
     
      />
            
            <TextInput
        label='Phone'
        mode="outlined"
        value={phone_number}
        style={{marginLeft:18,marginRight:18,marginTop:25}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>setPhone_number(text)}
     
      />
            

   
            
   
       <TouchableOpacity style={{marginLeft:20,marginTop:30,borderWidth:1.5,borderRadius:5,borderColor:"gray",width:"90%",height:50,paddingTop:15,paddingLeft:14}} onPress={_showDateTimePicker}>
       {dateSelected ? <Text style={{color:"gray"}}>{moment(date).format('MMMM Do YYYY, h:mm A')}</Text>:<Text style={{color:"gray"}}>Select Date and Time</Text>}
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={_handleDatePicked}
          onCancel={_hideDateTimePicker}
          mode="datetime"
        />





{/* 
      <Button primary
        mode="contained"
        onPress={() => sendCred(props)}
        style={{marginLeft:30,backgroundColor:'#1976D2',color:'white',width:100, justifyContent:'center'}}
        >
        
        <Text style={{color:'white', fontSize:15}} >Confirm</Text>
      </Button> */}
  

  <GradientButton
      style={{marginLeft:18,marginRight:18,marginTop:18,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13},}}
      text="Confirm"
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
        style={{marginLeft:18,marginRight:18,marginTop:18,
          borderWidth: 1,
          borderColor: 'gray',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOpacity: 0.8,
          elevation: 6,
          shadowRadius: 15 ,
          shadowOffset : { width: 1, height: 13},
        
        }}
         onPress= {()=>{setDate();setDateSelected(false);props.navigation.push('appointment')}}
         >
        <Text style={{}}> Back</Text>
      </Button>
   
      </Content>
   </Container>
   </ScrollView>
  );
  
    }


export default AddApointment;
