import React from 'react';
//import { Button ,Text} from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  AppRegistry,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Menu from './menu.js';
import Home from './home.js';
import {Text, VStack, HStack, Button} from '@react-native-material/core';
import {AirbnbRating, Rating} from 'react-native-ratings';
import WebView from 'react-native-webview';
import axios from 'axios';

const {width, height} = Dimensions.get('window');

class App extends React.Component {
  state = {
    status: '',
    Rating: '',
    data: this.props.data,
    back: 'rating',
    Email: this.props.data,
    webviewStatus:''
  };

  ratingCompleted = rating => {
    console.log(rating);
    this.setState({Rating: rating});
  };

 componentDidMount=()=>{
  const access_token="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhWOFYiLCJzdWIiOiJCRDdKSkMiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd3JlcyB3bG9jIiwiZXhwIjoxNjczNDUwOTY3LCJpYXQiOjE2NzM0MjIxNjd9.FJgKkAnoDF51-tan4lxQOsilIrqYIN_Y_n_wzmXGbIg";
  fetch('https://api.fitbit.com/1/user/-/profile.json',{
  method:'GET',
  headers:{'Authorization':"Bearer "+access_token}
  }).then(response=>response.json())
  .then(json=>console.log(json))
 }

  

  Submit = () => {
    console.log('come');
    firestore()
      .collection('Sleep')
      .where('Email', '==', this.props.data)
      .limit(1)
      .get()
      .then(query => {
        // console.log(query);
        const thing = query.docs[0];
        console.log(thing.data());
        let tmp = thing.data();
        tmp.Rating = this.state.Rating;

        console.log(tmp);
        thing.ref.update(tmp);
      });
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  Home = () => {
    this.setState({status: 'home'});
  };

  render() {
   //console.log('->' + this.props.data);
    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: Platform.OS === 'android' ? 60 : 100,
                  marginTop: Platform.OS === 'ios' ? '10%' : '1%',
                }}>
                <TouchableOpacity
                  style={{
                    marginLeft: '1%',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}
                  onPress={this.Home}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/318/318477.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 6,
                      color: '#343434',
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    color: '#343434',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginLeft: '5%',
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  fitbit connect
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: '30%',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}
                  onPress={this.Menu}>
                  <Image
                    source={{
                      uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png',
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: '1%',
                      color: '#343434',
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* <WebView
                source={{
                  uri: 'https://accounts.fitbit.com/',
                }}
                onLoad={this.onMessage}
                //  onEnd={this.onMessage}
                //onMessage={this.onMessage}
                // style={{marginTop: 20}}
              /> */}
             
               <WebView
                style={{flex: 1}}
                onNavigationStateChange={(e) => {
                    console.warn("current state is ", JSON.stringify(e, null, 2));
                    /** put your comdition here based here and close webview.
                     Like if(e.url.indexOf("end_url") > -1)
                     Then close webview
                     */
                  
                    if(e.title==='Fitbit Dashboard')
                    {
                     
                      this.setState({webviewStatus:true})
                      const access_token="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhWOFYiLCJzdWIiOiJCOE05SkgiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd2VjZyB3c29jIHdhY3Qgd294eSB3dGVtIHd3ZWkgd2NmIHdzZXQgd2xvYyB3cmVzIiwiZXhwIjoxNjczNDUwMTQzLCJpYXQiOjE2NzM0MjEzNDN9.TyTNLZuuX8bxmq8MjKymaHkVGcwWhiH7RhObyY5lg0o";
                      fetch('https://api.fitbit.com/1/user/-/profile.json',{
                      method:'GET',
                      headers:{'Authorization':"Bearer "+access_token}
                      }).then(response=>response.json())
                      .then(json=>console.log(json))
                    }

                }}
                source={{
                  uri: 'https://accounts.fitbit.com/',
                }}
                
              
                ref={(webView) => this.webView = webView}
            />
            </View>
          </View>
        )}
      </>
    );
  }
}

export default App;
