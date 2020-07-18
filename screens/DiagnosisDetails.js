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
import { AuthSession } from 'expo';
import {Linking} from 'react-native';
export default class DiagnosisDetails extends React.Component{

constructor(props){

    super(props);
    this.state={
        Patient_ID:"",
        Doctor_ID:"",
        DiseaseName:"",
        Tests:[],
        Medicines:[],
        Medicine_Notes:"",
        Symptoms:[],
        Findings:[],
        Recommended_Foods:[],
        Preventive_Foods:[],
        Diet_Note:"",
        Comments:"",
        Date:"",
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
        this.setState({mydata:data,DiseaseName:data.DiseaseName,Tests:data.Tests,Findings:data.Findings,Symptoms:data.Symptoms,Recommended_Foods:data.Recommended_Foods,Preventive_Foods:data.Preventive_Foods,Medicine_Notes:data.Medicine_Notes,
        Diet_Note:data.Diet_Note,Comments:data.Comments,Date:data.Date,Medicines:data.Medicines
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
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{this.props.navigation.navigate('diagnosis')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
        
    <Body>
    <Text style={{fontSize:25,color:"white"}} >Diagnosis Details</Text>
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
                name="stethoscope"
                style={styles.avatar}
              />
<View style={styles.body}>
            <View style={styles.bodyContent}>
           

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
}}> <FontAwesome raised name = "info" size = {20}  color = "white" />  Diagnosis Information </Text>
{/* <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:0 }} />      */}
            <CardItem style={{marginTop:0}}>
              <Left  >
              {/* <FontAwesome raised name = "envelope" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>Symptoms</Text>
              </Left>

              <Right  style={{marginLeft:50,flexDirection:'row'}}>

                <Text >{this.state.Symptoms.map((item,index)=>{return (index ? ', ': '') + item })}{"    "}</Text>
              
              </Right>
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem >
              <Left >
              {/* <FontAwesome name = "phone" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:14}}  >              
               Findings  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text  >{this.state.Findings.map((item,index)=>{return (index ? ', ': '') + item })}{"   "}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem>
              <Left>
              {/* <FontAwesome name = "id-card-o" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:8}}>              
                Comments:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.Comments}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
            <CardItem>
              <Left>
              {/* <FontAwesome name = "calendar-o" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
                Recommended Tests:  </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
               <Text>{this.state.Tests.map((item,index)=>{return (index ? ', ': '') + item })}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
      
        
            <Text style={{textAlign:"center",marginLeft:0,width:"100%",borderLeftWidth:8,borderWidth:2,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOpacity: 0.8,
              elevation: 5,
              shadowRadius: 60 ,
              shadowOffset : { width: 4, height: 13},
        borderRightWidth:8,
            
            
            borderRightWidth:8,borderColor:"white",fontSize:20,color:"white",backgroundColor:"#18E3DD"}}><FontAwesome raised name = "plus-square" size = {18}  color = "white" />  Medicination</Text>
           {/* <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:0 }} />    */}
           <CardItem>
              <Left>
              {/* <FontAwesome name = "users" size = {22} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:9}}>              
               Medicines</Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>    
          <Text>{this.state.Medicines.map((item,index)=>{return (index ? ', ': '') + item })}</Text>
              </Right>              
            </CardItem>
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8}} />    
            <CardItem>
              <Left>
              {/* <FontAwesome name = "address-card-o" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Medicine Suggestions  </Text>
              </Left>              
              <Body style={{marginLeft:40,flexDirection:'row'}}>    
               <Text>{this.state.Medicine_Notes}</Text>
              </Body>              
            </CardItem> 
            <Divider style={{ backgroundColor: '#161924',width:"100%",marginTop:8 }} />     
      
        
      <Text style={{textAlign:"center",marginLeft:0,width:"100%",borderLeftWidth:8,borderWidth:2,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 5,
        shadowRadius: 60 ,
        shadowOffset : { width: 4, height: 13},
  borderRightWidth:8,
      
      
      borderRightWidth:8,borderColor:"white",fontSize:20,color:"white",backgroundColor:"#18E3DD"}}><FontAwesome raised name = "cutlery" size = {18}  color = "white" />  Diet Plan Instructions</Text>
      <CardItem>
              <Left>
              {/* <FontAwesome name = "address-card-o" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Recommended Foods  </Text>
              </Left>              
              <Body style={{marginLeft:40,flexDirection:'row'}}>    
               <Text>{this.state.Recommended_Foods.map((item,index)=>{return (index ? ', ': '') + item })}</Text>
              </Body>              
            </CardItem> 
            <CardItem>
              <Left>
              {/* <FontAwesome name = "address-card-o" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Foods To Avoid  </Text>
              </Left>              
              <Body style={{marginLeft:40,flexDirection:'row'}}>    
               <Text>{this.state.Preventive_Foods.map((item,index)=>{return (index ? ', ': '') + item })}</Text>
              </Body>              
            </CardItem> 
            <CardItem>
              <Left>
              {/* <FontAwesome name = "address-card-o" size = {20} color = "#0AD4F8" /> */}
                <Text style={{fontWeight:"bold",fontSize:17,marginLeft:12}}>              
               Foods Instructions  </Text>
              </Left>              
              <Body style={{marginLeft:40,flexDirection:'row'}}>    
               <Text>{this.state.Diet_Note}</Text>
              </Body>              
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