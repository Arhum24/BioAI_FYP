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
import normalize from 'react-native-normalize';
import { Divider } from 'react-native-elements';

import Svg, {

  LinearGradient,Rect,Defs,Stop,Ellipse

} from 'react-native-svg';
import { Card,Container, Header, Left,Right,Body, Content, CardItem } from 'native-base';
export default class Appointment extends React.Component{

constructor(props){
    super(props);
    this.state={
        DateReg: "",
        Doctor_ID: '',
        id: '',
        Name: "",
        LastName: "",
        Email: "",
        CNIC: '',
        Phone_Number: '',
        Address: "",
        DOB: "",
        loading: true,
        result:[]
      
    }
    this.arrayholder = [];
}

async componentDidMount(){
    try {
      console.disableYellowBox= true;
      var Tok = await AsyncStorage.getItem('token')
      var Token = JSON.parse(Tok)
      console.log(Token)
      var profile = await AsyncStorage.getItem('profile');
    var doctor_id = JSON.parse(profile)._id
        //Assign the promise unresolved first then get the data using the json method. 
      await axios.get("http://192.168.10.4:8000/api/auth/patient/" + doctor_id, {
        headers: { 'x-access-token': Token, "Access-Control-Allow-Origin": "*",}})
          .then((response) => {
            return response
          }).then((responsejson)=>{
              console.log(responsejson.data)
              var returned = this.state.result;
              returned.push(responsejson.data)
              this.setState({result:returned,loading:false})
              this.arrayholder = responsejson.data;    
          });

      }catch(err) {
        console.log("Error fetching data-----------", err);
        alert(err);
        this.setState({loading:false});
    }

}

searchFilterFunction = text => {  
   this.setState({
      value: text,
    });
       const newData_ =[]
        const newData = this.arrayholder.map((item) => {      
        const itemData = `${item.Name.toUpperCase()} ${item.Email.toUpperCase()}`;
        const textData = text.toUpperCase();
        if(itemData.indexOf(textData) > -1){newData_.push(item)}    
      });
  console.log("new data "+typeof(newData_))
  this.setState({ result: [newData_] });  
};

passData = async(item)=>{
    console.log("Inside PassData "+item)
    try{
        var data = item
        var Tok = await AsyncStorage.getItem('token')
        var Token = JSON.parse(Tok)
       
        this.props.navigation.push('patientDetail',{token:Token,data:data})
        
    }catch(error){this.console.log("Async Storage Error"+error)}


}
renderHeader = () => {    
  return (      
    <SearchBar        
      placeholder="Search by name or email....."        
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
   
    return (
        <Container style={{}}>
            <Header style={{backgroundColor:"#2AB6D3"}} transparent><Left>
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{this.props.navigation.navigate('home')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
    <Body>
    <Text style={{fontSize:25,color:"white"}} >Patient</Text>
   
    </Body>  
    </Header>
    <Svg height="200" width="100%">
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
    height="200"
    fill="url(#grad)"

  />
  </Svg>
    <Text style={{position:"absolute",marginTop:"30%",marginLeft: normalize(120),marginRight: "auto",fontSize:20,color:"white",fontWeight:"bold"}}>{"       "}<Icon name="heartbeat" color="white" size={60}></Icon>{"\n\n  "}All Patients</Text>   
     
        {/* <View style = {{flex:1,width:'100%',alignItems: "center", justifyContent : "center"}}>
        <View style={styles.container}> */}
        <Content>

        <View style={{marginTop:10}}>
        <FlatList
        data={this.state.result[0]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{this.passData(item)}}>
            <Card >  
            <CardItem>
              <Left style={{marginLeft:-80,flexDirection:'column'}}>
                  <Icon name="user-o" size={40} color="#3CDD9F" />
                  <Text style={{fontWeight:"bold",color:"gray"}}>{"Patient Name:"}</Text>    
                <Text >
               {""}{item.Name}
                </Text>
                <Text >
                {/* <Icon name="mail" size={15} color="#3CDD9F" /> {item.CNIC+" "} */}
                </Text>
              </Left>
              <Body style={{marginLeft:-50,marginTop:5,borderLeftWidth:1,paddingLeft:10,paddingBottom:20,flexDirection:'column'}}>
              <Text style={{marginBottom:12}}>
                <Icon name="phone" size={15} color="#3CDD9F"  />
                {"    "+item.Phone_Number}
                </Text>
                <View style={{flexDirection:"row"}}>
                <Icon name="envelope" size={15} color="#3CDD9F"/>
                    <Text style={{marginBottom:12}}>{"   "+item.Email}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <Icon name="calendar-plus-o" size={15} color="#3CDD9F" />
                <Text>
                {"   "}{moment(item.Date).format("dddd, MMMM YYYY")}
                </Text>
        </View>
              </Body>
            </CardItem>
            {/* <CardItem>
              <Left>
                <Text>
                <Icon name="calendar-plus-o" size={15} color="#3CDD9F" />{moment(item.Date).format("dddd, MMM DD")}
                </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>
                   
              </Right>
            </CardItem> */}
            </Card>
            </TouchableOpacity>
        
        )
        
    }
    ListHeaderComponent={this.renderHeader} 
      />
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
                return <ActivityIndicator style={styles.indicator} />
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
});