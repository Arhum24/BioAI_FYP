import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Textarea, Left, Button, Icon, Body, Right } from 'native-base';
import { TouchableOpacity, StatusBar, Text ,Image,AsyncStorage} from 'react-native';


export default class ContactUs extends Component {
  constructor(){
    super()
    this.state={
      postedBy:'Umer',
      postTitle:'',
      postDescription:'',
      category:'question',
      
    }
  }


 
  sendCred= async ()=>{
    
    
    fetch("http://10.113.61.228:8000/community",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
       "postTitle":this.state.postTitle,
       "postDescription":this.state.postDescription,
       "category":this.state.category,
       "postedBy":this.state.postedBy
     })
    })
    .then(res=>res.json())
    .then(async (data)=>{
           try {
            
             alert("Your Post has been sent!")
             this.props.navigation.navigate('community')
           } catch (e) {
             Alert("error hai",e)
           }
    })
  
 }




  render() {
   

 
    return (
      <Container style={{backgroundColor:''}}>
   
        <Content>
        <Label style={{marginTop:20, textAlign:'center', fontSize: 24}}>Write a Post</Label>
       
          <Form>
            <Item floatingLabel rounded>
              <Label style={{marginLeft:10,marginTop:-15}}>Post Title</Label>
              <Input style={{marginLeft:10}} onChangeText={(text)=>this.setState({postTitle:text})}/>
            </Item>
           
            <Label style={{marginTop:20, textAlign:'center', fontSize: 20}}>Post Description</Label>   
            <Textarea rowSpan={5} bordered placeholder="Textarea" style={{marginLeft:10, marginRight:10}} onChangeText={(text)=>this.setState({postDescription:text})}/>
            
         
        <Button 
        
        
        onPress={()=>this.sendCred()}
        style={{width:130,marginLeft:18,marginRight:18,marginTop:18, backgroundColor:'#006400', alignItems:'center', alignContent:'center',justifyContent:'center'}}
       >
        <Icon name='ios-send'/>
        
        <Label style={{textAlign:'center',color:'white'}}>Post </Label>
        <Right></Right>
      </Button>

      
          </Form>
          
        </Content>
      </Container>
    );
  }
}