import React from 'react';
import {View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    AsyncStorage,
    ScrollView,
    Modal,
    TouchableHighlight,
    Alert,
    Picker,

} from 'react-native';
import normalize from 'react-native-normalize';
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal';
import {TextInput} from 'react-native-paper';
import Dialog, { DialogFooter, SlideAnimation,DialogButton, DialogContent } from 'react-native-popup-dialog';
import axios from 'axios';
import {FontAwesome} from '@expo/vector-icons';
import { Card,Container, Header, Left,Right,Body, Content, CardItem } from 'native-base';
import GradientButton from 'react-native-gradient-buttons';

import { Divider } from 'react-native-elements';
import Svg, {

  LinearGradient,Rect,Defs,Stop,Ellipse

} from 'react-native-svg';
  export default class Profile extends React.Component{

constructor(props){
    super(props);
    this.state={
        img:"",
        name:"",
        qualification:"",
        cnic:"",
        licence:"",
        email:"",
        phone_number:"",
        licence_country2:'',
        loading: true,
        result:[],
        visible:false,
        defaultAnimationDialog: false,
        hospital:''
        
  }

}


//Token 07adc86b73cef7ed1b94e3a1943a4b97d89e90dc
async componentDidMount(){
    try {
      console.disableYellowBox= true;
      console.log(AsyncStorage.getItem('profile'))
      if(await AsyncStorage.getItem('profile')!=null){
        var data = await AsyncStorage.getItem('profile')
        var returned = this.state.result;
        returned.push(JSON.parse(data))
        console.log("Profile Found Already")
        await this.setState({result:returned,loading:false})
        this.setState({
          name:this.state.result[0].name,
          phone_number:this.state.result[0].phone_number,
          cnic:this.state.result[0].cnic,
          licence_country2:this.state.result[0].licence_country,
          licence:this.state.result[0].licence,
          email:this.state.result[0].email,
          hospital:this.state.result[0].hospital,
          qualification:this.state.result[0].qualification     




        })
      }
      // else{
      //   var Tok = await AsyncStorage.getItem('token')
      //   var Token = JSON.parse(Tok)
      //   console.log(Token)
      //   //Assign the promise unresolved first then get the data using the json method. 
      //   await axios.get('http://10.113.61.228:8000/auth/users/me', {
      //   headers: {'Authorization':Token}})
      //     .then((response) => {
      //       console.log(response)
      //       return response
      //     }).then(async(responsejson)=>{
      //         console.log(responsejson.data)
      //         var returned = this.state.result;
      //         returned.push(responsejson.data)
      //         var data_ = {
      //           username: responsejson.username,
      //           name: responsejson.data.name,
      //           cnic: responsejson.data.cnic,
      //           licence: responsejson.data.licence,
      //           qualification: responsejson.data.qualification,
      //           phone_number: responsejson.data.phone_number,
      //           date: responsejson.data.date,
      //           email: responsejson.data.email,
      //           id: responsejson.data.id
      //         }
      //         console.log("Object "+data_)
      //         await AsyncStorage.setItem("profile",JSON.stringify(data_))
      //         this.setState({result:returned,loading:false})
      //     });
      //   }
       
    } catch(err) {
        console.log("Error fetching data-----------", err);
    }

}

async showEditDialog(){
var value  = this.state.visible;
console.log(value," Inside")
await this.setState({visible:!value})
console.log(this.state.visible," Visible Value")

}

Confirm=async(data)=>{
    
  try{
    var Tok = await AsyncStorage.getItem('token')
    var Token = JSON.parse(Tok)
      const id = await AsyncStorage.getItem('profile');
      const id_ = JSON.parse(id)
      console.log(id_._id+" "+Token)
     fetch("http://192.168.10.4:8000/api/auth/user/"+this.state.result[0]._id,{
       method:"PUT",
       headers: {
        'Content-Type': 'application/json',
        'x-access-token': Token,
      },
      body:JSON.stringify({
        
                     'email': this.state.email,
                    // 'password': password,
                    'cnic': this.state.cnic,
                    'licence': this.state.licence,
                    'licence_country': this.state.licence_country2,
                    'name': this.state.name,
                    'qualification': this.state.qualification,
                    'phone_number': Number(this.state.phone_number),
                    'hospital': this.state.hospital,
      
      }),

     })
     .then(res=>res.json())
     .then(async (data)=>{
       console.log(data);
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
          await AsyncStorage.setItem("profile", JSON.stringify(data));
          console.log("exiting fetchData()")



        

  
        })
    
      }
 

  
        await  fetchData();
        this.setState({loading:true})
        var data = this.state.result[0];
        console.log("Got")
        console.log(data);
        var result = await AsyncStorage.getItem('profile')
        console.log("Result From Async Storgae is")
        result = JSON.parse(result)
        console.log(result.name)

        data.name =result.name ;
        data.phone_number = result.phone_number;
         data.cnic=result.cnic;
        data.licence_country=result.licence_country;
        data.licence=result.licence;
        data.email=result.email;
       data.hospital=result.hospital;
        data.qualification  =result.qualification ;  
      var returned = [];
      returned.push(data)
      console.log("final")
      console.log(returned)

      await this.setState({result:returned,loading:false})


     
       this.setState({defaultAnimationDialog:false})
     
     
    })}catch(err){
      alert(err)
    }

}

renderData(){
    var variable = this.state.result[0].image;
    console.log("Variable "+variable)
    return (
      <ScrollView style = {{flex:1}}>
   
     
<View style = {styles.container}>
 
  <Header style={{backgroundColor:"#2AB6D3"}}transparent><Left>
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{this.props.navigation.navigate('home')}}>
            <FontAwesome name = "arrow-left" size = {20} color = "white" />
    </TouchableOpacity>
    </Left>
    <Body>
    <Text style={{fontSize:25,color:"white"}} >Profile</Text>
    </Body>  
    </Header>
    <View style = {{flex:1,alignItems: "center", justifyContent : "center"}}>
      <View style={styles.container}>
          {/* <View style={styles.header}></View> */}

          
<Svg height="300" width="100%">
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
    height="300"
    fill="url(#grad)"

  />
   <Text style={{justifyContent:"center",marginTop:240,marginLeft: "auto", marginRight: "auto",fontSize:20,color:"white",fontWeight:"bold"}}>{"Dr."+this.state.result[0].name}</Text>   
</Svg>


{/* <GradientButton
      style={{marginLeft:18,marginRight:18,marginTop:18,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      text="Edit"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#18E3DD"
      gradientEnd="#3282F4"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      impact
      impactStyle='Light'
      onPressAction={() => {
        this.setState({
          defaultAnimationDialog: true,
        });
      }}
    /> */}
     <View style={styles.centeredView}>
      <Modal
        animationType="slide"
     
        transparent={true}
        visible={this.state.defaultAnimationDialog}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection:"row"}}><FontAwesome name="pencil" size={22}></FontAwesome><Text style={styles.modalText}> Edit Personal Information</Text></View>
<View style={{width:normalize(250),height:normalize(450)}}>
            <TextInput
        label='Name'
        mode="outlined"
        value={this.state.name}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({name:text})}
     
      />
        


      <TextInput
        label='Email'
        mode="outlined"
        value={this.state.email}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({email:text})}
     
      />
            
            <TextInput
        label='Phone'
        mode="outlined"
        value={this.state.phone_number}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({phone_number:text})}
     
      />
             <TextInput
        label='Licence'
        mode="outlined"
        value={this.state.licence}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({licence:text})}
     
      />
          <TextInput
        label='Hospital/Clinic'
        mode="outlined"
        value={this.state.hospital}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({hospital:text})}
     
      />
      <Picker
        selectedValue={this.state.qualification}
        style={{ height: 50,borderWidth:2,borderColor:"gray" }}
        onValueChange={(itemValue, itemIndex) => this.setState({qualification:itemValue})}
      >
        {/* MBBS, BMBS, MBChB, MBBCh MD, Dr.MuD, Dr.Med DO MD(Res), DM PhD, DPhil MCM MMSc, MMedSc
MM, MMed
MPhil
MS, MSurg, MChir, MCh, ChM, CM
MSc
DCM
DClinSurg
DMSc, DMedSc
DS, DSurg)*/}
        <Picker.Item label="MBBS" value="MBBS" />
        <Picker.Item label="BMBS" value="BMBS" />
        <Picker.Item label="MBChB" value="MBChB" />
        <Picker.Item label="MBChB" value="MBChB" />
        <Picker.Item label="MD" value="MD" />
        <Picker.Item label="Dr.MuD" value="Dr.MuD" />
        <Picker.Item label="Dr.Med" value="Dr.Med" />
        <Picker.Item label="DO" value="DO" />
        <Picker.Item label="MD(Res)" value="MD(Res)" />
        <Picker.Item label="DM" value="DM" />
        <Picker.Item label="PhD" value="PhD" />
        <Picker.Item label="DPhil" value="DPhil" />
        <Picker.Item label="MCM" value="MCM" />
        <Picker.Item label="MMSc" value="MMSc" />
        <Picker.Item label="MMedSc" value="MMedSc" />
        <Picker.Item label="MM" value="MM" />
        <Picker.Item label="MMed" value="MMed" />
        <Picker.Item label="MPhil" value="MPhil" />
        <Picker.Item label="MS" value="MS" />
        <Picker.Item label="MSurg" value="MSurg" />
        <Picker.Item label="MChir" value="MChir" />
        <Picker.Item label="MCh" value="MCh" />
        <Picker.Item label="ChM" value="ChM" />
        <Picker.Item label="CM" value="CM" />
        <Picker.Item label="MSc" value="MSc" />
        <Picker.Item label="DCM" value="DCM" />
        <Picker.Item label="DClinSurg" value="DClinSurg" />
        <Picker.Item label="DMSc" value="DMSc" />   
        <Picker.Item label="DMedSc" value="DMedSc" />
        <Picker.Item label="DS" value="DS" />
        <Picker.Item label="DSurg" value="DSurg" />


      </Picker>
{/* <Text>{this.state.qualification}</Text> */}
      <View style={{marginTop:5, borderWidth:1,borderColor:'gray',borderColor:"black",paddingRight:60,paddingTop:10,paddingLeft:57,borderRadius:3,height:45}}>
        <CountryPicker 
          withEmoji
          onSelect={(value)=>{this.setState({licence_country2:value.name})}}
        />
</View>
      <Text style={{color:"red",marginTop:5,marginBottom:5}}>{"*Click on the text to select country: "}</Text>
<Text style={{color:"red",marginTop:-5,marginBottom:-5}}>{" "}{this.state.licence_country2}</Text>
            
            </View>

            
            <View style={{flexDirection:"row",marginTop:35}}>
            {/* <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "red",marginTop:25,justifyContent:"flex-start" }}
              onPress={() => {
                this.setState({defaultAnimationDialog:!this.state.defaultAnimationDialog});
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
           */}
           <GradientButton
      style={{fontWeight:"bold", borderWidth:1,borderColor:'black',borderRadius:4,marginLeft:-50,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13},}}
      text="Cancel"
      textStyle={{ fontSize: 16,color:'black' }}
      gradientBegin="white"
      gradientEnd="white"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      width={90}
      impact
      impactStyle='Light'
      onPressAction={() => {
        this.setState({defaultAnimationDialog:!this.state.defaultAnimationDialog});
      }}
    />
            <Text>{"                "}</Text>
        <GradientButton
      style={{fontWeight:"bold", borderWidth:1,borderRadius:6,borderColor:"#3282F4",marginRight:-50,
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
      width={90}
      impact
      impactStyle='Light'
      onPressAction={() => {
        this.Confirm()
      }}
    />
            </View>
          </View>
        </View>
      </Modal>
{/* 
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          this.setState({defaultAnimationDialog:true});
        }}
      >
        {/* pencil-square */}
        {/* <Text style={styles.textStyle}>Edit</Text>
      </TouchableHighlight> */}
       {/* */} 
       <GradientButton
      style={{fontWeight:"bold", borderWidth:1,borderColor:'black',borderRadius:4,marginTop:-10,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13},}}
      text="Edit Profile"
      textStyle={{ fontSize: 16,color:'black' }}
      gradientBegin="white"
      gradientEnd="white"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      width={"90%"}
      impact
      impactStyle='Light'
      onPressAction={() => {
        this.setState({defaultAnimationDialog:true});
      }}
    />



    </View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              {/* <Text style={styles.name}>{"Dr."+this.state.result[0].name}</Text>    */}
              {/* <Divider style={{ backgroundColor: '#161924',width:"100%" }} />      */}
              {/* <View>  
                <View>
                <Text style={styles.info}>Email: </Text>     
                <Text style={{padding:"50%"}}>{this.state.result[0].email}</Text>     

                </View>
               
              <Text style={styles.text}>Contact:
            
              </Text>
              <Text> {this.state.result[0].phone_number}
              </Text>
              <Text style={styles.text}>Qualification:
              <Text> {this.state.result[0].qualification}</Text>
              </Text>
    <Text style={styles.text}>CNIC:
    
    </Text>
    <Text>{this.state.result[0].cnic}</Text>
    <Text style={styles.text}>Licence:
    
    </Text>
            </View> */}

<Card style={styles.bodyContent} >  

            <CardItem style={{marginTop:12}}>
              <Left>
              <FontAwesome name = "envelope" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>
                       Email
                </Text>
              </Left>

              <Right style={{marginLeft:50,flexDirection:'row'}}>

              <Text >
              {this.state.result[0].email}
            </Text>
              
              </Right>
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:12 }} />     
            <CardItem >
              <Left>
              <FontAwesome name = "phone" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Contact   </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.result[0].phone_number}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:12 }} />     
            <CardItem>
              <Left>
              <FontAwesome name = "certificate" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
                Qualification:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.result[0].qualification}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:12 }} />     
            <CardItem>
              <Left>
              <FontAwesome name = "id-card" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:9}}>              
                CNIC:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.result[0].cnic}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:12 }} />     
            <CardItem>
              <Left>
              <FontAwesome name = "address-card-o" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Licence:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.result[0].licence}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <FontAwesome name = "hospital-o" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Hopital/Clinic:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.result[0].hospital}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:12 }} />     
            <CardItem>
              <Left>
              <FontAwesome name = "globe" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Licence Country:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.result[0].licence_country}</Text>
              </Right>              
            </CardItem>

            </Card>






            </View> 
          
          </View>
      </View>
      {/* <LinearGradient 
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            Simple Linear Gradient Backgrount
          </Text>
        </LinearGradient> */}
    </View>
    </View>

  </ScrollView>
    )

}
    render(){        
            const { result, loading } = this.state;
            if(!loading) {
                return this.renderData(result);
            } else {
                return <ActivityIndicator style={styles.indicator} />
            }        
    }
}


const styles = StyleSheet.create ({
       container : {
         flex : 1,
        backgroundColor : "#FFF",
        width:"100%",
    

        },
        indicator:
        {flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
        },
        
        
        
        header:{
            backgroundColor: "#0AD4F8",
            height:300,
          },
          avatar: {
            width: 130,
            height: 130,
            borderRadius: 63,
            borderWidth: 4,
            borderColor: "white",
            marginBottom:10,
            alignSelf:'center',
            position: 'absolute',
            marginTop:90
          },
          name:{
            fontSize:22,
            color:"black",
            fontWeight:'bold',
          },
          body:{
            marginTop:5,
          },
          bodyContent: {
            flex: 1,
            alignItems: 'center',
            marginTop:0,
            width:"100%"
          },
          name:{
            fontSize:28,
            color: "#696969",
            fontWeight: "600"
          },
          info:{
            fontSize:16,
            color: "#00BFFF",
            marginTop:10,
            marginLeft:-110
          },
          text:{
            fontSize:18,
            color: "black",
            marginTop:10,
            marginLeft:-110
          },
          description:{
            fontSize:16,
            color: "#696969",
            marginTop:10,
            textAlign: 'center'
          },
          buttonContainer: {
            marginTop:10,
            height:45,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom:20,
            width:250,
            borderRadius:30,
            backgroundColor: "#00BFFF",
          },
          linearGradient: {
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
            marginTop:16,
            width:350,
          },
          buttonText: {
            fontSize: 18,
      
            textAlign: 'center',
            margin: 10,
            color: '#ffffff',
            backgroundColor: 'transparent',
          },
          centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          },
          openButton: {
            backgroundColor: "#F194FF",
            borderRadius: 4,
            padding: 10,
            elevation: 2
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
          modalText: {
            // marginBottom: 15,
            textAlign: "center",
            fontWeight:"bold",
            fontSize:20,
       
          }
});