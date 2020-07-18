import React from 'react';
import {View,
    FlatList,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    AsyncStorage,
    Modal,
} from 'react-native';
import axios from 'axios';
import {FontAwesome} from '@expo/vector-icons';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card,Container,Button, Header, Left,Right,Body, Content,DatePicker, CardItem } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-paper';
import Svg, {

  LinearGradient,Rect,Defs,Stop,Ellipse

} from 'react-native-svg';
import { Divider } from 'react-native-elements';
import GradientButton from 'react-native-gradient-buttons';
import normalize from "react-native-normalize";
export default class AppointmentDetails extends React.Component{

constructor(props){

    super(props);
    this.state={
        Name:'',
        Date:'',
        Time:'',
        Email:'',
        Phone:'',
        loading: true,
        result:[],
        chosenDate:'',
        mydata:[],
        dateSelected:false,
        isDateTimePickerVisible:false,
        Doctor_ID:'',
        defaultAnimationDialog: false,
        defaultDeleteDialog: false,

    }
 
 


}
_showDateTimePicker = () => this.setState({ isDateTimePickerVisible:true},()=>{console.log(this.state.isDateTimePickerVisible," Changed")});
  
_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible:false},()=>{console.log(this.state.isDateTimePickerVisible," Changed")});
_handleDatePicked = (date) => {
 console.log('A date has been picked: ', date);
 

 this._hideDateTimePicker();
 this.setState({Date:date})
 this.setState({dateSelected:true})
 console.log(this.state.Date,this.state.dateSelected,"Updated States")
}
getData = async ()=>{
    try{
       const {data} = this.props.route.params
        console.log("Parsed data"+ data.Phone_Number)
        var value = this.state.mydata
        value.push(data)
        this.setState({mydata:data,Name:data.Name,Date:data.DateAppoi,Email:data.Email,Phone:Number(data.Phone_Number),Doctor_ID:data.Doctor_ID},() => {
            console.log(this.state.Phone, 'Phone');
            console.log(this.state.Doctor_ID, 'Doc ID');
          })
        
    }
catch(error){
    console.log("Async Storage Error "+error)
}
}

//Token 07adc86b73cef7ed1b94e3a1943a4b97d89e90dc
async componentDidMount(){
console.log("Mounting");
await this.getData();

}
setDate(newDate) {
    this.setState({ chosenDate: newDate });
}

Delete = async function del(){

    try{
        const { token } = this.props.route.params;
        const id = await AsyncStorage.getItem('profile');
        const id_ = JSON.parse(id)
        const del_id = this.props.route.params.data._id
       fetch("http://192.168.10.4:8000/api/auth/appointment/"+del_id,{
         method:"DELETE",
         headers: {
          'Content-Type':'application/json',
          'x-access-token': token,
        }}
        ) .then(res=>res.json())
        .then(async (data)=>{
          console.log(data);      
           this.setState({defaultDeleteDialog:false});
          
          }
          )
          this.props.route.params.refresh();
         this.props.navigation.push('appointment')
        
      }catch(err){

        alert(err)
      }




}

 Confirm = async function name() {

    
    try{
        const { token } = this.props.route.params;
        const id = await AsyncStorage.getItem('profile');
        const id_ = JSON.parse(id)
      
       fetch("http://192.168.10.4:8000/api/auth/appointment/"+this.state.mydata._id,{
         method:"PUT",
         headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body:JSON.stringify({
          
          "Email":this.state.Email,
          "Name" : this.state.Name,
          "Phone_Number" : Number(this.state.Phone),
          "DateAppoi" : new Date(this.state.Date).toISOString(),
          "Time" : this.state.Time,
          "Doctor_ID":this.state.Doctor_ID
        })
       })
       .then(res=>res.json())
       .then(async (data)=>{
         console.log(data);
          
       this.setState({defaultAnimationDialog:false})
       var data2 = this.state.mydata;
       data2.Email = this.state.Email;
       data2.Name = this.state.Name;
       data2.Phone_Number = this.state.Phone;
       data2.DateAppoi = this.state.Date;
  
       this.setState({mydata:data2});
      
        //  this.props.navigation.push('appointment')
      })}catch(err){
        alert(err)
      }

}





renderData(){
    return (
        <Container style={{}}>
            <Header style={{backgroundColor:"#2AB6D3"}}  transparent>
    {/* <View style = {styles.container}>
        {/* onPress = {this.props.navigation.openDrawer */}
    {/* <SafeAreaView style = {{flex:1}}> */}
    <Left>
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{ this.props.route.params.refresh();this.props.navigation.navigate('appointment')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
    <Body>
    <Text style={{fontSize:25,marginLeft:-20,color:"white"}}>Appointment's Detail</Text>
    </Body>  
    </Header>
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
    height="305"
    fill="url(#grad)"

  />
  <FontAwesome name="calendar" size={50} color="white" style={{justifyContent:"center",marginTop:150,marginLeft: "auto", marginRight: "auto"}}></FontAwesome>
   <Text style={{justifyContent:"center",marginTop:10,marginLeft: "auto", marginRight: "auto",fontSize:20,color:"white",fontWeight:"bold"}}>
  
       {"Appointment's Detail"}</Text>   

</Svg>


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
            <View style={{flexDirection:"row"}}><FontAwesome name="pencil" size={19}></FontAwesome><Text style={styles.modalText}> Edit Appointment</Text></View>
<View style={{width:normalize(250),height:normalize(250)}}>
<TextInput
        label='Name'
        mode="outlined"
        value={this.state.Name}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({Name:text})}
     
      />
      <TextInput
        label='Email'
        mode="outlined"
        type="email"
        value={this.state.Email}
        style={{marginTop:10,height:50}}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({Email:text})}
     
      />
      <TextInput
        label='Phone Number'
        mode="outlined"
        type="number"
     
        value={""+this.state.Phone}
        style={{marginTop:10,height:50}}
        keyboardType={'numeric'}
        theme={{colors:{primary:"blue"}}}
        onChangeText={(text)=>this.setState({Phone:text})}
     
      />
                   
       <TouchableOpacity style={{marginLeft:0,marginTop:10,borderWidth:1.5,borderRadius:5,borderColor:"gray",width:"100%",height:50,paddingTop:15,paddingLeft:14}} onPress={this._showDateTimePicker}>
       {this.state.dateSelected ? <Text style={{color:"gray"}}>{moment(this.state.Date).format('MMMM Do YYYY, h:mm A')}</Text>:<Text style={{color:"gray"}}>Select Date and Time</Text>}
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />

      </View>



      <View style={{flexDirection:"row",marginTop:35}}>
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
      onPressAction={() => this.Confirm()}
    />
            </View>
          </View>
        </View>
      </Modal>




      <Modal
        animationType="slide"
     
        transparent={true}
        visible={this.state.defaultDeleteDialog}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection:"row"}}><Text style={styles.modalText}> Are You sure you want to delete this appointment?</Text></View>
<View style={{width:normalize(250),height:normalize(100)}}>




      <View style={{flexDirection:"row",marginTop:35,justifyContent:"center"}}>
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
        this.setState({defaultDeleteDialog:!this.state.defaultDeleteDialog});
      }}
    />
            <Text>{"    "}</Text>
        <GradientButton
      style={{fontWeight:"bold", borderWidth:1,borderRadius:6,borderColor:"black",marginRight:-50,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13},}}
      text="Confirm"
      textStyle={{ fontSize: 16,color:"black" }}
      gradientBegin="white"
      gradientEnd="white"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      width={90}
      impact
      impactStyle='Light'
      onPressAction={() => this.Delete()}
    />
            </View>
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
















        <Content>

        <GradientButton
      style={{marginTop:0,fontWeight:"bold", marginTop:5,borderWidth:1,borderColor:"white",
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 1,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      // text="Edit Appointment"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#2AB6D3"
      gradientEnd="#3CDD9F"
      gradientDirection="diagonal"
      height={normalize(45)}    
      radius={normalize(6)}
      width={"95%"}
      impact
      impactStyle='Light'
      onPressAction={()=>{this.setState({defaultAnimationDialog:true})}}>
        <FontAwesome name="pencil" size={18}></FontAwesome>
        <Text>  Edit Appointment</Text>

      </GradientButton>
         <GradientButton
      style={{marginTop:0,fontWeight:"bold", marginTop:5,borderWidth:1,borderColor:"white",
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 1,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      // text="Delete Appointment"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#D54E93"
      gradientEnd="#FF516C"
      gradientDirection="diagonal"
      height={normalize(45)}    
      radius={normalize(6)}
      width={"95%"}
      impact
      impactStyle='Light'
      onPressAction={()=>{this.setState({defaultDeleteDialog:true})}}>
         <FontAwesome name="trash-o" size={18}></FontAwesome>
        <Text>  Delete Appointment</Text>

      </GradientButton>
           <Card style={{ shadowColor: 'gray',borderColor:"white",borderWidth:1,marginTop:10,
      shadowOpacity: 1,
      elevation: 10,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 5}}}>
        <CardItem style={{marginTop:0}}>
              <Left  >
              {/* <FontAwesome raised name = "envelope" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:0}}>   <FontAwesome name="clipboard" size={18} color="#3CDD9F"></FontAwesome>  Name</Text>
              </Left>

              <Right  style={{marginLeft:50,flexDirection:'row'}}>

                <Text >{this.state.mydata.Name}{"    "}</Text>
              
              </Right>
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem >
              <Left >
              {/* <FontAwesome name = "phone" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:14}}  >              
                <FontAwesome name="envelope-o" size={18} color="#3CDD9F"/>  Email  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text  >{this.state.mydata.Email}{"   "}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem >
              <Left >
              {/* <FontAwesome name = "phone" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:14}}  >              
                <FontAwesome name="phone" size={18} color="#3CDD9F"/>  Contact  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text  >{this.state.mydata.Phone_Number}{"   "}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem >
              
              <Left >
              {/* <FontAwesome name = "phone" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:14}}  >              
                <FontAwesome name="calendar" size={18} color="#3CDD9F"/>  Date  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text  >{moment(this.state.mydata.DateAppoi).format('MMMM Do YYYY')}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem >
              
              <Left >
              {/* <FontAwesome name = "phone" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:14}}  >              
                <FontAwesome name="clock-o" size={18} color="#3CDD9F"/>  Time  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text  >{moment(this.state.mydata.DateAppoi).format('h:mm A')}</Text>
              </Right>              
            </CardItem>
            </Card>
            </Content>
            
                {/* <CardItem>
                    <Left style={{flexDirection:'column'}}>
                        <Text>Date: </Text>
                    </Left>
                    
                    <Body>  
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                          <Text>{moment(this.state.Date).format('MMMM Do YYYY, h:mm a')}</Text>
                    </TouchableOpacity>
                   <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode="datetime"
                    />
                        </Body>
                            </CardItem> */}
{/*                       
                    </Card> */}
        
        
        
        {/* </Content> */}
        {/* <Button primary onPress={this.Confirm} style={{width:80,marginLeft:270,backgroundColor:'blue'}}><Text style={{marginLeft:20,color:'white'}}>Confirm Changes</Text></Button>
        <Button onPress = {this.Delete} style={{width:80,marginLeft:270,backgroundColor:'red'}}><Text style={{marginLeft:20,color:'white'}}>Delete</Text></Button> */}
    </Container>
    
    )

}


    render(){
         const {mydata} = this.state
         console.log("Shared Data :"+mydata);
         return this.renderData();
    }
}

const styles = StyleSheet.create ({
    Seperator:{shadowOffset: {
        width: 0,
        height: 3},
        shadowRadius: 5,
        shadowOpacity: 1.0,
        height: 1,
        width: "95%",
        backgroundColor: "#CED0CE",
        marginLeft: "0%",
        marginTop:-12,
    },
       container : {
         flex : 1,
        backgroundColor : "#FFF",
        width:'100%',
        marginLeft:'7%',
        

        },
        indicator:
        {flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
        },
        item:{
            height:40

        },
        
        
        
        header:{
            backgroundColor: "#00BFFF",
            height:200,
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
            marginTop:130
          },
          name:{
            fontSize:22,
            color:"#FFFFFF",
            fontWeight:'600',
          },
          body:{
            marginTop:40,
          },
          bodyContent: {
            flex: 1,
            alignItems: 'center',
            padding:30,
          },
          name:{
            fontSize:28,
            color: "#696969",
            fontWeight: "600"
          },
          info:{
            fontSize:16,
            color: "#00BFFF",
            marginTop:10
          },
          text:{
            fontSize:16,
            color: "black",
            marginTop:10
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