import React from 'react';
//import { Button ,Text} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Emoji from 'react-native-emoji';
import Home from './home.js';
import firestore from '@react-native-firebase/firestore';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

import {Text, Stack, HStack, Button} from '@react-native-material/core';
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
//import { MaterialCommunityIcons,Icon } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  FeelTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    left: '6%',
    // padding: 50,
    marginTop: '12%',

    fontWeight: 'bold',
    fontSize: 28,
  },
});
class App extends React.Component {
  state = {
    status: 0,
    feel_sad: '',
    error: false,
  };

  Next = () => {
    if (this.state.feel_sad === '') {
      // Alert.alert('Please Select Which One Makes You Feel Sad', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => console.log('Cancel Pressed'),
      //     style: 'cancel',
      //   },
      //   {text: 'OK', onPress: () => console.log('OK Pressed')},
      // ]);
      // return false;
      this.setState({error: true});
    } else {
      var today = new Date();
      var date = today.toISOString().slice(0, 10);
      var time = today.toLocaleTimeString('en-US', {hour12: false});
      console.log('Time->' + time);
      var dateTime = date + ' ' + time;

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
          tmp.FeelSad = this.state.feel_sad;
          tmp.FeelSadTime = dateTime;
          console.log(tmp);
          thing.ref.update(tmp);
        });
      this.setState({status: 'home'});
    }
  };

  Feel = e => {
    console.log(e);
    this.setState({feel_sad: e, error: false});
  };

  Skip = () => {
    this.setState({status: 'home'});
  };

  render() {
    console.log('2 -> ' + this.props.data);
    return (
      <>
        {this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <Stack spacing={1}>
                <Text variant="h5" style={styles.FeelTwo}>
                  What makes you feel sad?
                </Text>

                <Text style={{left: '15%', margin: '3%'}}>
                  Tell us what makes you feel sad
                </Text>
              </Stack>
              {this.state.error === true ? (
                <Text style={{left: '10%', color: 'red'}}>
                  ❌ Please Select Which One Makes Sad
                </Text>
              ) : (
                ''
              )}

              <Stack spacing={'10%'} style={{margin: '10%'}}>
                <HStack m={5} spacing={15} style={{left: -35}}>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Family' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Family')}>
                      <Text style={{fontSize: 50, left: 12}}>👨‍👧‍👦</Text>
                      <Text style={{fontSize: 11, left: 21}}>Family</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Kids' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Kids')}>
                      <Text style={{fontSize: 50, left: 13}}>👨‍👩‍👧‍👦</Text>
                      <Text style={{fontSize: 11, left: 28}}>Kids</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Parents'
                          ? '#D0942A'
                          : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Parents')}>
                      <Text style={{fontSize: 50, left: 13}}>👫🏻</Text>
                      <Text style={{fontSize: 11, left: 21}}>Parents</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Work' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Work')}>
                      <Text style={{fontSize: 50, left: 13}}>🛠️</Text>
                      <Text style={{fontSize: 11, left: 25}}>Work</Text>
                    </TouchableOpacity>
                  </View>
                </HStack>
                <HStack m={5} spacing={15} style={{left: -35}}>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Exam' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Exam')}>
                      <Text style={{fontSize: 50, left: 13}}>📝</Text>
                      <Text style={{fontSize: 11, left: 25}}>Exam</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Finance'
                          ? '#D0942A'
                          : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Finance')}>
                      <Text style={{fontSize: 50, left: 13}}>💰</Text>
                      <Text style={{fontSize: 11, left: 21}}>Finance</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Love' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Love')}>
                      <Text style={{fontSize: 50, left: 13}}>🥰</Text>
                      <Text style={{fontSize: 11, left: 27}}>Love</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel_sad == 'Friend' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Friend')}>
                      <Text style={{fontSize: 50, left: 13}}>🤝</Text>
                      <Text style={{fontSize: 11, left: 23}}>Friend</Text>
                    </TouchableOpacity>
                  </View>
                </HStack>
              </Stack>
            </View>
            <Button
              title="Skip"
              uppercase={false}
              style={{
                backgroundColor: '#D0942A',

                width: '48%',
                left: '1%',
                //marginTop: "10%",
                marginTop: '-25%',
              }}
              onPress={this.Skip}
            />
            <Button
              title="Next"
              uppercase={false}
              style={{
                backgroundColor: '#D0942A',

                width: '48%',
                left: '50.5%',
                marginTop: '-9.4%',
              }}
              onPress={this.Next}
            />
          </View>
        )}
      </>
    );
  }
}

export default App;
