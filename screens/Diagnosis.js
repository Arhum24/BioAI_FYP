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
import {Button,SearchBar, normalize} from 'react-native-elements'
import axios from 'axios';
import {FontAwesome} from '@expo/vector-icons';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from 'react-native-gradient-buttons';
import { Card,Container, Header, Left,Right,Body, Content, CardItem } from 'native-base';
import Svg, {

  LinearGradient,Rect,Defs,Stop,Ellipse

} from 'react-native-svg';

export default class Diagnosis extends React.Component{

constructor(props){
    super(props);
    this.state={
        DateReg: "",
        Doctor_ID: '',
        id: '',
        FirstName: "",
        LastName: "",
        Email: "",
        CNIC: '',
        Phone_Number: '',
        Address: "",
        DOB: "",
        loading: true,
        result:[],
        Name:"",
      
    }
    this.arrayholder = [];
}

async componentDidMount(){
    try {
      var {token} = this.props.route.params;
      var {id} = this.props.route.params;
      var {name} = this.props.route.params;
      var profile = await AsyncStorage.getItem('profile');
    var doctor_id = JSON.parse(profile)._id
      console.log(name+" "+token+" "+id)
        //Assign the promise unresolved first then get the data using the json method. 
      await axios.get("http://192.168.10.4:8000/api/auth/diagnosis/" + doctor_id + "/" + id, {
        headers: { 'x-access-token': token, "Access-Control-Allow-Origin": "*",}})
          .then((response) => {
            return response
          }).then((responsejson)=>{
              console.log(responsejson.data)
              var returned = this.state.result;
              returned.push(responsejson.data)
              this.setState({result:returned,loading:false,Name:name})
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
        const itemData = `${item.DiseaseName.toUpperCase()}`;
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
        this.props.navigation.push('diagnosisDetail',{token:Token,data:data})
        
    }catch(error){this.console.log("Async Storage Error"+error)}


}
renderHeader = () => {    
  return (      
    <SearchBar        
      placeholder="Type Here..."        
      lightTheme        
      round        
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
    <TouchableOpacity style = {{width:50,alignItems :"flex-start"}} onPress = {()=>{this.props.navigation.navigate('patient')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "white" />
    </TouchableOpacity>
    </Left>
    <Body>
    <Text style={{fontSize:20,color:"white",textAlign:"center",alignItems:"center",marginLeft:normalize(-30)}}>Medical Diagnosis History</Text>
   
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
  </Svg>
    <Text style={{position:"absolute",marginTop:"48%",marginLeft: normalize(120),marginRight: "auto",fontSize:20,color:"white",fontWeight:"bold"}}>{"       "}<Icon name="stethoscope" color="white" size={60}></Icon>{"\n\n"}All Diagnosis</Text>   
        {/* <View style = {{flex:1,width:'100%',alignItems: "center", justifyContent : "center"}}>
        <View style={styles.container}> */}
        <Content>

        <View style={{marginTop:0}}>
        <FlatList
        data={this.state.result[0]}
        keyExtractor={item => item.id}
        renderItem={({ item,index }) => (
            // <TouchableOpacity onPress={()=>{this.passData(item)}}>
            <Card >  
            <CardItem>
              <Left style={{marginLeft:0,flexDirection:'column'}}>
              <Icon name="stethoscope" color="#18E3DD" size={40}></Icon>
              <Text style={{fontWeight:"bold",color:"gray"}}>{"Diagnosis Date:"}</Text>    
              <Text>{moment(item.Date).format('DD MMM YYYY')}</Text>            
              
              </Left>
              <Body style={{borderLeftWidth:1,paddingLeft:10}}>

              {/* <Text>
                {"Date:"+moment(item.Date).format('dddd, DD, MMM YYYY')}
                </Text> */}
                <Text style={{color:"gray",fontWeight:"bold"}}>{"Symptoms:"}</Text>
                <Text>{item.Symptoms.map((item,index)=>{return (index ? ', ': '') + item })}</Text>
                <Text style={{color:"gray",fontWeight:"bold"}}>
                {/* <Icon name="medic" size={15} color="blue" />  */}
                {"Findings:"}
                </Text>
              <Text>{item.Findings.map((item,index)=>{return (index ? ', ': '') + item })}</Text>

              </Body>
              <Right>
              
              <GradientButton
      style={{marginTop:0,fontWeight:"bold", 
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 1,
      elevation: 6,
      shadowRadius: 40 ,
      shadowOffset : { width: 1, height: 13}}}
      text="Details"
      textStyle={{ fontSize: 16 }}
      gradientBegin="#2AB6D3"
      gradientEnd="#3CDD9F"
      gradientDirection="diagonal"
      height={normalize(45)}    
      radius={normalize(6)}
      width={"80%"}
      impact
      impactStyle='Light'
      onPressAction={()=>{this.passData(item)}}/>
              </Right>
              </CardItem>
            {/* <CardItem>
              <Left>
                <Text>
                <Icon name="calendar-plus-o" size={15} color="blue" />{moment(item.Date).format("dddd, MMM DD")}
                </Text>
              </Left>              
              <Right style={{marginLeft:50,flexDirection:'row'}}>
                   
              </Right>
            </CardItem> */}
            </Card>
            // </TouchableOpacity>
        
        )
        
    }
    // ListHeaderComponent={this.renderHeader} 
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