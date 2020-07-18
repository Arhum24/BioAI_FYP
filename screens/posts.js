import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import {View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Item,Input } from 'native-base';
import Expo from 'expo';
import * as Font from 'expo-font';

export default class Posts extends Component {

    constructor() {
        super();
        this.state = {
          todos: [],
          comments: [],
          commentUsername: "",
          commentText: "",
          countup:'',
          countdown:'',
        };
      }

      

     async  componentDidMount(){
      Font.loadAsync({
        'Roboto_Medium': require('../assets/fonts/Roboto_Medium.ttf'),
      });
        this.getData()
    
      }
     
    

      getData = async()=>{

        const id = await AsyncStorage.getItem('post')

          const response = await fetch('http://10.113.61.228:3000/community/post/'+id);
          const data  = await response.json();
          
          this.setState({
            todos: data.results,
            countup:data.results.upvotes,
            countdown:data.results.downvotes,
            comments: data.results.comments
          }   
          ,
          
        
          
          )
          
        }
 upvotes=async()=>{
   const a =this.state.todos.upvotes;
   this.setState({
    countup:this.state.countup + 1
   })
   fetch("http://10.113.61.228:3000/community/upvote/",{
      method:"PUT",
      headers: {
       'Content-Type': 'application/json'
     }, body:JSON.stringify({
      postID:this.state.todos._id
    })
  
    })
      .then(res => {
      
        if(res.data.status == 1){
         console.log('done')
        }
      })
      .catch(error => {
        console.log(error);
      });
 }
 downvotes(){
   this.setState({
     countdown:this.state.countdown +1
     
   })
   this.down();

 }
 down = async()=>{
   const{postID} = this.state.todos
   console.log(postID)
   let data = {
    postID: this.state.todos.postID
  };
  fetch("http://10.113.61.228:3000/community/downvote/",{
    method:"PUT",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     'postID':this.state.todos._id
   })
  })
    .then(res => {
    
      if(res.data.status == 1){
        alert("Downvoted Successfully")
        this.props.navigation.navigate('PostDetails')
      }
    })
    .catch(error => {
      console.log(error);
    });

  }
 

 uploadComment=async()=>{
  var user  = await AsyncStorage.getItem('profile')
  var userDetails = JSON.parse(user)
  const username = userDetails.name;
  // alert(username);
  // console.log("UserName "+username)
  var data = {
    username: username,
    text: this.state.commentText,
    date: Date.now,
    postID: this.state.todos._id
  };
 alert(data)
  fetch("http://10.113.61.228:3000/community/comment",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     }, body:JSON.stringify({
      'username': username,
      'text': this.state.commentText,
      'date': Date.now,
      'postID': this.state.todos._id
    })
  
    })
      .then(res => {
      
        if(res.data.status == 1){
          alert("Comment Posted Successfully")
          this.props.navigation.navigate('PostDetails')
        }
      })
      .catch(error => {
        console.log(error);
      });
 }

 isImage(){
   console.log(this.state.todos.image)
   if(this.state.todos.image == null){
    console.log('1')
    return(
      <Body>
      <Text>
      {this.state.todos.postDescription}
    </Text>
    </Body>
    )
   }
   else{
    console.log('2')
     return(
     <Body>
        <Image source={require('../assets/background.jpg')} style={{height: 200, width: 200, flex: 1}}/>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
        <Text style={{marginLeft:-50}}>Description: </Text>
        
        <Text>
                 {this.state.todos.postDescription}
        </Text>
        </Body>
        )   }
 }

  render() {
    
    
     
      const comm = this.state.comments
      
      const {datePosted} = this.state.todos

      

    
    
     const commentss=  comm.map(function(comment){
                    
       return( 

        
           <Card >
             
             
       <CardItem >
    <Text>Username : {comment.username}</Text>
        </CardItem>
        <CardItem button>
          <Body>
            <Text>
            Comment: {comment.text}
            </Text>
          </Body>
        </CardItem>
        <CardItem footer button >
       <Text>{new Date(Number(comment.date)).toDateString()}</Text>
        </CardItem>
        </Card>
       )
     })
     
    return (
      <Container>
       
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                {/* <Thumbnail source={require('../assets/person.png')} /> */}
                <Body>
                <Text>{this.state.todos.postedBy}</Text>
                  <Text>{this.state.todos.postTitle}</Text>
    <Text note>{new Date(Number(datePosted)).toDateString()}</Text>
                </Body>
              </Left>
            </CardItem>
           {this.isImage()}
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.upvotes()}>
                  <Icon name="thumbs-up" />
    <Text>{this.state.countup}</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>this.downvotes()}>
                  <Icon name="thumbs-down" />
                  <Text>{this.state.countdown}</Text>
                </Button>
              </Left>
            </CardItem>
            <Text style={{textAlign:'center',fontSize:30}}>Comments Section</Text>
            {commentss}
            <Item rounded>
            <Input style={{marginTop:10}} onChangeText={(text)=>this.setState({commentText:text})} placeholder='Add a Comment'/>
          </Item>
          <Button rounded style={{width:100,marginLeft:130,marginTop:15,backgroundColor:'#006400'}} onPress={()=>this.uploadComment()}>
            <Text style={{marginLeft:15}}>Post</Text>
          </Button>
          </Card>
        </Content>
  
    
      </Container>
    );
  }
}