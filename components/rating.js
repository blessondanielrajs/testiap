import React from 'react';
//import { Button ,Text} from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  Image,
  NativeModules,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Menu from './menu.js';
import Home from './home.js';
import {Text, VStack, HStack, Button} from '@react-native-material/core';
import {AirbnbRating, Rating} from 'react-native-ratings';
const {width, height} = Dimensions.get('window');

class App extends React.Component {
  state = {
    status: '',
    Rating: '',
    data: this.props.data,
    back: 'rating',
    Email: this.props.data,
  };

  ratingCompleted = rating => {
    console.log(StoreKit)
    // console.log(rating);
    // this.setState({Rating: rating});
  };

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
    console.log('->' + this.props.data);
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
                  height:Platform.OS==='android'?60: 100,
                  marginTop:Platform.OS==='ios'? '10%':'1%',
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
                    style={{width: 25, height: 25, marginLeft: 6, color: '#343434',}}
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
                  Rate our app
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: '35%',
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}
                  onPress={this.Menu}>
                  <Image
                    source={{
                      uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png',
                    }}
                    style={{width: 25, height: 25, marginLeft: '1%', color: '#343434',}}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    left: '5%',
                    fontSize: 28,
                    color: '#343434',
                  }}>
                  Are you enjoying?
                </Text>
                <Text style={{left: 5, margin: 15, fontSize: 13, color: '#343434',}}>
                  Give us a rating to serve you a better experiance
                </Text>
                {/* <HStack m={29} spacing={6}></HStack> */}
                <AirbnbRating
                  count={5}
                  reviews={['1/5', '2/5', '3/5', '4/5', '5/5']}
                  defaultRating={0}
                  size={40}
                  showRating
                  onFinishRating={this.ratingCompleted}
                />
                <Button
                  title="Submit"
                  uppercase={false}
                  style={{
                    backgroundColor: '#D0942A',
                    width: '88%',
                    right: '4%',
                    margin: '10%',
                    marginTop:'20%'
                  }}
                  onPress={this.Submit}
                />
              </View>
            </View>
          </View>
        )}
      </>
    );
  }
}

export default App;


