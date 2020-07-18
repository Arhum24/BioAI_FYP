import React from 'react';
import {View,
    FlatList,
    Text,
  
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    AsyncStorage
} from 'react-native';
import {Button,SearchBar} from 'react-native-elements'
import axios from 'axios';
import {FontAwesome} from '@expo/vector-icons';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card,Container, Header, Left,Right,Body, Content, CardItem } from 'native-base';
import { ScrollView, RefreshControl } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import GradientButton from 'react-native-gradient-buttons';
export default class Appointment extends React.Component{

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
        loading: true,
        result:[],
        refreshing: false,
        open:false,
        today:false,
        all:true,
        Tomorrow:false
      
    }
    console.disableYellowBox = true;
    const { state2 } = this.state.open;
    this.arrayholder = [];
}

closeFAP=(open)=>{
  this.setState({open})
  
  }
_onRefresh = () => {
  
  // this.setState({refreshing: true});
  this.fetchDate();
  
}
componentDidMount(){
  console.disableYellowBox= true;
    this.fetchDate();
}
fetchDate = async ()=>{

  try {
    var Tok = await AsyncStorage.getItem('token')
    var Token = JSON.parse(Tok)
    var profile = await AsyncStorage.getItem('profile');
    var doctor_id = JSON.parse(profile)._id
    console.log(Token)
      //Assign the promise unresolved first then get the data using the json method. 
    await axios.get('http://192.168.10.4:8000/api/auth/allappointment/'+doctor_id, {
      headers: {'x-access-token': Token, "Access-Control-Allow-Origin": "*"}})
        .then((response) => {
          return response
        }).then((responsejson)=>{
            console.log(responsejson.data)
            var returned = this.state.result;
            returned.push(responsejson.data)
            this.setState({result:returned,loading:false})
            this.arrayholder = responsejson.data;    
            this.setState({refreshing:false});
        });
    } catch(err) {
      console.log("Error fetching data-----------", err);
      alert(err);
      this.setState({loading:false});
      this.setState({refreshing:false});
  }

}
searchFilterFunction = text => {  
   this.setState({
      value: text,
    });
       const newData_ =[]
       const newData = this.arrayholder.map((item) => {      
        const itemData = `${item.Name.toUpperCase()}`;
        
        const textData = text.toUpperCase();
          
        if(itemData.indexOf(textData) > -1){newData_.push(item)}    
      });
  console.log("new data "+typeof(newData_))
  this.setState({ result: [newData_] });  
};

searchFilterAll = text => {  

 
   
 var data = this.arrayholder
 this.setState({ result:[data],today:false,all:true,Tomorrow:false });  
};
searchFilterToday = text => {  

      const newData_ =[]
      const newData = this.arrayholder.map((item) => {      
        if (moment().format("dddd, MMM DD")===moment(item.DateAppoi).format("dddd, MMM DD")) {
          newData_.push(item)   
        }
       
     });
 console.log("new data "+typeof(newData_))
 this.setState({ result: [newData_],today:true,all:false,Tomorrow:false });  
};
searchFilterTomorrow = text => {  

      const newData_ =[]
      const newData = this.arrayholder.map((item) => {      
        if(moment().add(1,'days').format("dddd, MMM DD")===moment(item.DateAppoi).format("dddd, MMM DD")) {
          newData_.push(item)  
        }
      
     });
 console.log("new data "+typeof(newData_))
 this.setState({ result: [newData_] ,today:false,all:false,Tomorrow:true});  
};

passData = async(item)=>{
    console.log("Inside PassData "+item)
    try{
        var data = item
        var Tok = await AsyncStorage.getItem('token')
        var Token = JSON.parse(Tok)
        console.log('Data To send:'+data)
        this.props.navigation.navigate('appointmentDetail',{token:Token,data:data,refresh:this._onRefresh})
        
    }catch(error){this.console.log("Async Storage Error"+error)}


}
renderHeader = () => {    
  return (      
    <SearchBar        
      placeholder="Search..."        
      lightTheme
      containerStyle={{backgroundColor:"white"}}  
      inputContainerStyle=  {{backgroundColor:"white"}}      
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}  
      value={this.state.value}           
    />    
  );  
};

renderData(data){
    var variable = this.state.result[0];
    const deleteButton = (
        <Icon.Button name="facebook" backgroundColor="#3b5998">
          <Text style={{ fontFamily: 'Arial', fontSize: 15 }}>
            Login with Facebook
          </Text>
        </Icon.Button>
      );
    console.log(variable)
    return (
     
        <Container style={{}}>
            <Header style={{backgroundColor:"#2AB6D3"}} transparent><Left>
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{this.props.navigation.navigate('home')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
    <Body>
    <Text style={{fontSize:25,color:"white"}} >Appointments</Text>
   
    </Body>  
    </Header>
        {/* <View style = {{flex:1,width:'100%',alignItems: "center", justifyContent : "center"}}>
        <View style={styles.container}> */}
        <Content>

        <View style={{marginTop:1}}>
         {/* <Button
          icon={{name: 'add',fontSize:80,color:"white",width:90,height:90}}
          title='Schedule New Appointment'
          buttonStyle={{backgroundColor:"green",height:50}}
          onPress={async()=>{
            var Tok = await AsyncStorage.getItem('token')
            var Token = JSON.parse(Tok)
            var user  = await AsyncStorage.getItem('profile')
            var userDetails = JSON.parse(user)
            console.log(Token)
            console.log(userDetails)
            console.log(userDetails.id)
            this.props.navigation.navigate('addAppointment',{token:Token,user:userDetails})
          }}
        /> */}
         <GradientButton
      style={{marginLeft:-20,marginTop:0,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      // text="SIGNUP"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#2AB6D3"
      gradientEnd="#3CDD9F"
      gradientDirection="diagonal"
      height={60}    
      radius={6}
      width={"110%"}
      impact
      impactStyle='Light'
      onPressAction={async()=>{
        var Tok = await AsyncStorage.getItem('token')
        var Token = JSON.parse(Tok)
        var user  = await AsyncStorage.getItem('profile')
        var userDetails = JSON.parse(user)
        console.log(Token)
        console.log(userDetails)
        console.log(userDetails.id)
        this.props.navigation.navigate('addAppointment',{token:Token,user:userDetails})
      }}
    >

      <Icon name="plus" style={{fontSize:20,marginRight:10}}></Icon>
      <Text style={{fontSize:15,marginTop:-10}}>     Schedule New Appointment</Text>
    
    </GradientButton>

  {/* 2AB6D3 3CDD9F */}
  {/* <IconButton
    icon="plus"
    color={Colors.red500}
    size={40}
    onPress={() => console.log('Pressed')}
  /> */}
   {/* <ScrollView
      refreshControl={ 
      <RefreshControl 
      refreshing={this.state.refreshing} 
      onRefresh={this._onRefresh} 
      /> 
      } 
 > */}
 <View style={{flexDirection:"row"}}>

 <GradientButton
      style={{marginLeft:-20,marginTop:0,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
    
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      // text="SIGNUP"
      textStyle={{ fontSize: 16 }}
      gradientBegin="white"
      gradientEnd="white"
      gradientDirection="diagonal"
      height={60}    
      radius={6}
      width={135}
      impact
      impactStyle='Light'  
      onPressAction={()=>this.searchFilterAll()}
    >

   
     { this.state.all?<Text style={{fontSize:15,marginTop:-10,color:"black",fontWeight:"bold"}}> All</Text>:<Text style={{fontSize:15,marginTop:-10,color:"gray"}}> All</Text>}
    
    </GradientButton>
      
    <GradientButton
      style={{marginLeft:-20,marginTop:0,fontWeight:"bold",
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
     
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      // text="SIGNUP"
      textStyle={{ fontSize: 16 }}
      gradientBegin="white"
      gradientEnd="white"
      gradientDirection="diagonal"
      height={60}    
      radius={6}
      width={135}
      impact
      impactStyle='Light'  
      onPressAction={()=>this.searchFilterToday()}
    >

     
{ this.state.today?<Text style={{fontSize:15,marginTop:-10,color:"black",fontWeight:"bold"}}> Today </Text>:<Text style={{fontSize:15,marginTop:-10,color:"gray"}}> Today </Text>}
    
    </GradientButton>
      
    <GradientButton
      style={{marginLeft:-20,marginTop:0,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      // text="SIGNUP"
      textStyle={{ fontSize: 16 }}
      gradientBegin="white"
      gradientEnd="white"
      gradientDirection="diagonal"
      height={60}    
      radius={6}
      width={135}
      impact
      impactStyle='Light'  
      onPressAction={()=>this.searchFilterTomorrow()}
    >

     
{ this.state.Tomorrow?<Text style={{fontSize:15,marginTop:-10,color:"black",fontWeight:"bold"}}> Tomorrow</Text>:<Text style={{fontSize:15,marginTop:-10,color:"gray"}}> Tomorrow</Text>}
    
    </GradientButton>
 </View>
        <FlatList
        data={this.state.result[0]}
        keyExtractor={item => item._id}
        extraData={this.state}
        // refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{this.passData(item)}}>
            <Card >  
            <CardItem>
              <Left>
                <Text >
        <Icon name="user" size={15} color="#3CDD9F" /> {"   "}{item.Name}
                </Text>
              </Left>

              <Right style={{marginLeft:50,flexDirection:'row'}}>

              <Text >
                <Icon name="phone" size={15} color="#3CDD9F" />
                </Text>
                <Text style={{marginLeft:8}}>{"   "}{ item.Phone_Number} </Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text>
                <Icon name="calendar-plus-o" size={15} color="#3CDD9F" />{"  "} { moment(item.DateAppoi).format("dddd, MMM DD")}
                
                {/* {(() => {
                 
          return (
          moment(item.DateAppoi).format("dddd, MMM DD")
          )
        
      })()} */}
                
                {/* {moment(item.DateAppoi).format("dddd, MMM DD")} */}
                </Text>
              </Left>
              
              <Right style={{marginLeft:50,flexDirection:'row'}}>
                    <Text style={{marginRight:10}}>
                    <Icon name="clock-o" size={15} color="#3CDD9F"/>
                    </Text>
                 
                    <Text>{"   "}{ moment(item.DateAppoi).format("hh:mm A")} </Text>
              </Right>
              
            </CardItem>
            </Card>
            </TouchableOpacity>
        
        )
        
    }
    ListHeaderComponent={this.renderHeader} 
      />
          {/* </ScrollView> */}
        {/* </View>
        </View> */}
        </View>
        </Content>
    {/* </SafeAreaView>
    </View> */}
    </Container>

    )

}


    render(){
        
            const { result, loading } = this.state;
            if(!loading) {
               
                return this.renderData(result);
               
            } else {
                return <ActivityIndicator color="#3CDD9F"  size= "large" style={styles.indicator} />
            }
        
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
        height: 100,
        color:"red",
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
});