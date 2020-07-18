import React from 'react' ;
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TouchableHighlight,FlatList,Image,Alert,AsyncStorage, StatusBar} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,  Button, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontAwesome} from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

 export default class fetchimages extends React.Component{
    constructor(){
            super();
            this.state = {
              data : [],
              isLoading: true, 
              search: '' ,
              refreshing:false
            }
            this.arrayholder = [];
          }
          colors = ['blue', 'blue', 'red', 'purple'];
        componentDidMount(){
          alert("Mounted")
          this.getData()
          console.disableYellowBox = true;

        }

      
        getData = async()=>{
          console.log('hello1')
          try{
            const response = await fetch('http://10.113.61.228:3000/community/');
            const data  = await response.json();
              console.log('hello2')
            this.setState({
              data:data,
              isLoading: false,
              dataSource: data,
            },
            function() {
              this.arrayholder = data;
            }
            )}catch(err){alert(err)}
          }  
          search = text => {
            console.log(text);
          };
          clear = () => {
            this.search.clear();
          };
          SearchFilterFunction(text) {
            const newData = this.arrayholder.filter(function(item) {
              const itemData = item.postTitle ? item.postTitle.toUpperCase() : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            this.setState({
              dataSource: newData,
              search: text,
            });
          }
          getListViewItem = async(item) => {
            console.log(item._id)
         const res=   await AsyncStorage.setItem('post',item._id)
         
          this.props.navigation.navigate("Post")
        } 
      
         
     render(){
     
         return(
          
<Container style={{backgroundColor:'blue'}}>
<TouchableOpacity style = {{marginTop:30,width:50,alignItems :"flex-start",backgroundColor:'white'}} onPress = {()=>{this.props.navigation.navigate('home')}}>
            <FontAwesome name = "arrow-left" size = {30} color = "#161924" />
    </TouchableOpacity>
        <Button rounded success style={{position:'absolute',bottom:10,right:8,zIndex:10,width:100,backgroundColor:'blue'}} onPress={()=>this.props.navigation.navigate('write')}>
            <Text style={{margin:8}}>
            <Icon name='add' />
            </Text>
            <Text style={{textAlign:'center',justifyContent:'center',color:'white'}}>Add Post</Text>
            <Right></Right>
          </Button>
<Content>
    <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search Post"
          value={this.state.search}
        />
    <FlatList
     data = {this.state.dataSource}
     renderItem = {({item}) =>
          <Card onPress={this.getListViewItem.bind(this, item)} style={{borderColor:'#006400', borderRadius:30, borderBottomRightRadius:30, borderBottomLeftRadius:30,height:300}}>
            <CardItem onPress={this.getListViewItem.bind(this, item)} style={{backgroundColor:''}}>
              <Left>
                {/* <Thumbnail source={{uri:item.image}}/> */}
                <Body>
                  <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>{item.postTitle}</Text>
         <Text note numberOfLines={2} style={{marginTop:60}}>{item.postDescription}</Text>
                </Body>
              </Left>
            </CardItem> 
            
            <CardItem >
              <Left>
                <Button transparent>
                  <Icon active name="heart" />
         <Text  onPress={this.getListViewItem.bind(this, item)} style={{color:'red',fontSize:17}}> View Details</Text>
                </Button>
              </Left>
            </CardItem>
          </Card> 
    }
    
    keyExtractor={(item, index) => index.toString()}
     
     />

</Content>

</Container>

         )
     }
 }
 







