import * as React from 'react';
import { Button, Image, View,Alert,AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    fruit:'',
    disease:''
  };
  colors = ['blue', 'green', 'red', 'purple'];



  componentDidMount() {
    
    this.getPermissionAsync();
    console.log('hi');
  }

  


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  uploadPhoto = (data) =>{
   
    console.log('Sending Image'+Date.now().toString());
   
    fetch('http://10.113.59.49:3004/predict/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        user:'123',
        base64Data:data.base64
      }),
    
    }).then(response=>response.json())
    .then(responseJson=>{
    //   this.setState({fruit:responseJson.fruit,disease:responseJson.disease})
    //  this.AlertPro.open()
      Alert.alert('Upload Successfull',JSON.stringify(responseJson));
    })
    .catch(err=>{
      Alert.alert('Error',err.toString());
    });
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });

  
    this.uploadPhoto(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    let { image } = this.state;
   

    return (
      <View style={{flex:1}}>
       
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      
      </View>
    );
  }
}