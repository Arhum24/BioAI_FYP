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
    ScrollView
} from 'react-native';
import { Name } from 'react-native-elements'
import axios from 'axios';
import {FontAwesome} from '@expo/vector-icons';
import moment from 'moment';
import { Icon,Tooltip} from 'react-native-elements'
import { Card,Container,Button, Header, Left,Right,Body, Content,DatePicker, CardItem } from 'native-base';
import { Input } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import Svg, {

  LinearGradient,Rect,Defs,Stop,Ellipse

} from 'react-native-svg';
import GradientButton from 'react-native-gradient-buttons';
import { AuthSession } from 'expo';
import {Linking} from 'react-native';
export default class PatientDetails extends React.Component{

constructor(props){

    super(props);
    this.state={
        Name:'',
        Date:'',
        Time:'',
        Email:'',
        CNIC:'',
        Height:"",
        Weight:"",
        Gender:"",
        Maritial_Status:"",
        Blood_Group:"",
        Pulse:"",
        Blood_Pressure:"",
        Allergies:"",
        Operation:"",
        Comorbidity:"",
        Address:"",
        DOB:"",
        Phone_Number:'',
        loading: true,
        result:[],
        chosenDate:'',
        mydata:[],

    }


}

getData = async ()=>{
    try{
       const {data} = this.props.route.params
        console.log("Parsed data"+ data.id)
        var value = this.state.mydata
        value.push(data)
        this.setState({mydata:data,CNIC:data.CNIC,Name:data.Name,Date:data.DateReg,Email:data.Email,Phone_Number:data.Phone_Number,Weight:data.Weight,Height:data.Height,
        Gender:data.Gender,Maritial_Status:data.Maritial_Status,Blood_Group:data.Blood_Group,Blood_Pressure:data.Blood_Pressure,Allergies:data.Allergies,Operation:data.Operation,
        Comorbidity:data.Comorbidity,Address:data.Address,DOB:data.DOB,Pulse:data.Pulse
        })
    }
catch(error){
    console.log("Async Storage Error "+error)
}
}
//Token 07adc86b73cef7ed1b94e3a1943a4b97d89e90dc
componentDidMount(){
console.log("Mounting");
this.getData();

}
setDate(newDate) {
    this.setState({ chosenDate: newDate });
}

// Delete = async()=>{

//     try{
//         const { token } = this.props.route.params;
//         const id = await AsyncStorage.getItem('profile');
//         const id_ = JSON.parse(id)
//         const del_id = this.props.route.params.data.id
//         alert(del_id+" "+token)
//        fetch("http://192.168.0.127:8000/main/appointment/"+del_id,{
//          method:"DELETE",
//          headers: {
//           'Content-Type':'application/json',
//           'Authorization':token
//         }}
//         )       
//          this.props.navigation.push('appointment')
//       }catch(err){
//         alert(err)
//       }




// }

Confirm=async()=>{
    
    
        const { token } = this.props.route.params;
        const {data} = this.props.route.params;
        const id = data._id;
        const name = data.Name 
        this.props.navigation.navigate('diagnosis',{id:id,token:token,name:name})
       
}






renderData(){
    return (
        <ScrollView>
      
            <Header style={{backgroundColor:"#2AB6D3"}}  transparent>
            <Left>
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{this.props.navigation.navigate('patient')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
        
    <Body>
    <Text style={{fontSize:25,color:"white"}} >Patient Details</Text>
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

   <Text style={{justifyContent:"center",marginTop:240,marginLeft: "auto", marginRight: "auto",fontSize:20,color:"white",fontWeight:"bold"}}>
  
       {this.state.Name}</Text>   

</Svg>
<FontAwesome
                name="heartbeat"
                style={styles.avatar}
              />
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
   
   <GradientButton
      style={{fontWeight:"bold", borderWidth:1,borderColor:'white',borderRadius:4,marginTop:0,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13},}}
      textStyle={{ fontSize: 16,color:'white' }}
      gradientBegin="#2AB6D3"
      gradientEnd="#3CDD9F"
      gradientDirection="diagonal"
      height={40}    
      radius={6}
      width={"80%"}
      impact
      impactStyle='Light'
      onPressAction={() => this.Confirm()}
    ><FontAwesome
    name="star"
    style={{ color: "white", fontSize: 16 }}
  />{"  "}
  View Patient's Diagnosis
</GradientButton>
<Card style={styles.bodyContent} >  
<Text style={{textAlign:"center",
marginLeft:0,
width:"100%",
borderLeftWidth:8,
borderWidth:2,
shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 5,
      shadowRadius: 60 ,
      shadowOffset : { width: 4, height: 13},
borderRightWidth:8,
borderColor:"white",
fontSize:20,
color:"white",
backgroundColor:"#18E3DD"
}}> <FontAwesome raised name = "info" size = {20}  color = "white" />  Personal Information </Text>
{/* <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:0 }} />      */}
            <CardItem style={{marginTop:0}}>
              <Left  >
              <FontAwesome  onPress={()=>{Linking.openURL(`mailto:${this.state.Email}`)}} raised name = "envelope" size = {20} color = "#0AD4F8" />
                <Text onPress={()=>{Linking.openURL(`mailto:${this.state.Email}`)}} style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>Email</Text>
              </Left>

              <Right  style={{marginLeft:50,flexDirection:'row'}}>

<Text onPress={()=>{Linking.openURL(`mailto:${this.state.Email}`)}}>{this.state.Email}{"    "}</Text>
              
              </Right>
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem >
              <Left >
              <FontAwesome name = "phone" size = {20} color = "#0AD4F8" onPress={()=>{Linking.openURL(`tel:${this.state.Phone_Number}`)}}/>
                <Text onPress={()=>{Linking.openURL(`tel:${this.state.Phone_Number}`)}} style={{fontWeight:"bold",fontSize:17,marginLeft:14}}  >              
               Contact  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text onPress={()=>{Linking.openURL(`tel:${this.state.Phone_Number}`)}} >{this.state.Phone_Number}{"   "}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem>
              <Left>
              <FontAwesome name = "id-card-o" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:8}}>              
                CNIC:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.CNIC}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem>
              <Left>
              <FontAwesome name = "calendar-o" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
                Date Of Birth:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{moment(this.state.DOB).format("DD-MMM-YYYY")}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
      
            <CardItem>
              <Left>
              <FontAwesome name = "users" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:9}}>              
               Gender</Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Gender}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8}} />    
            <CardItem>
              <Left>
              <FontAwesome name = "address-card-o" size = {20} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Address:  </Text>
              </Left>              
              <Body style={{marginLeft:40,flexDirection:'row'}}>    
               <Text>{this.state.Address}</Text>
              </Body>              
            </CardItem> 
            <Text style={{textAlign:"center",marginLeft:0,width:"100%",borderLeftWidth:8,borderWidth:2,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOpacity: 0.8,
              elevation: 5,
              shadowRadius: 60 ,
              shadowOffset : { width: 4, height: 13},
        borderRightWidth:8,
            
            
            borderRightWidth:8,borderColor:"white",fontSize:20,color:"white",backgroundColor:"#18E3DD"}}><FontAwesome raised name = "plus-square" size = {18}  color = "white" />   Medical Information</Text>
           {/* <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:0 }} />    */}
            <CardItem>
              <Left>
              <FontAwesome name = "gratipay" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Pulse  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Pulse}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <FontAwesome name = "tint" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:22}}>              
               Blood Group  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Blood_Group}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <FontAwesome name = "sort-numeric-desc" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Height  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
        <Text>{this.state.Height}{" cm"}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <FontAwesome name = "anchor" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Weight  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
        <Text>{this.state.Weight}{" Kg"}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <Icon name = "list" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Allergies  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Allergies}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <FontAwesome name = "list-alt" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Comorbidity  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Comorbidity}</Text>
              </Right>              
            </CardItem>
            <CardItem>
              <Left>
              <FontAwesome name = "signal" size = {22} color = "#0AD4F8" />
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:17}}>              
               Blood_Pressure  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Blood_Pressure}</Text>
              </Right>              
            </CardItem>

       
    

            </Card>




         

            </View> 
          
          </View>
      

    </ScrollView>
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
            marginBottom:10,
            alignSelf:'center',
            position: 'absolute',
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:160,
            fontSize:130,
            color:"white"
          },
          name:{
            fontSize:22,
            color:"#FFFFFF",
            fontWeight:'600',
          },
          body:{
            marginTop:0,
          },
          bodyContent: {
            flex: 1,
            alignItems: 'center',
            marginTop:5,
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
});