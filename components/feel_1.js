import React from 'react';
//import { Button ,Text} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {Text, Stack, HStack, Button} from '@react-native-material/core';
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
//import { MaterialCommunityIcons,Icon } from '@expo/vector-icons';
import Emoji from 'react-native-emoji';
import FeelTwo from './feel_2.js';

const {width, height} = Dimensions.get('window');

class App extends React.Component {
  state = {
    status: 0,
    UserDetails: '',
    feel: '',
    error: false,
  };

  Next = () => {
    if (this.state.feel === '') {
      // Alert.alert('Please Select Your Mood', [
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
          tmp.Feeling = this.state.feel;
          tmp.FeelingTime = dateTime;
          console.log(tmp);
          thing.ref.update(tmp);
        });
      this.setState({status: 'feeltwo'});
    }
  };
  Skip = () => {
    this.setState({status: 'feeltwo'});
  };

  Feel = e => {
    console.log(e);
    this.setState({feel: e, error: false});
  };

  render() {
    console.log('1=>' + this.props.data);

    return (
      <>
        {this.state.status === 'feeltwo' ? (
          <FeelTwo data={this.props.data} />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <Stack spacing={1}>
                <Text variant="h5" style={styles.FeelOne}>
                  How are you feeling?
                </Text>

                <Text style={{left: '10%', margin: '3%'}}>
                  Tell us how you are feeling right now
                </Text>
              </Stack>
              {this.state.error === true ? (
                <Text style={{left: '20%', color: 'red'}}>
                  ❌ Please Select Your Mood
                </Text>
              ) : (
                ''
              )}

              <Stack
                spacing={'10%'}
                style={{margin: '10%', marginBottom: '100%'}}>
                <HStack m={5} spacing={15} style={{left: -35}}>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel == 'Happy' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Happy')}>
                      <Text style={{fontSize: 50, left: 13}}>😀</Text>
                      <Text style={{fontSize: 11, left: 21}}>Happy</Text>
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
                        this.state.feel == 'Sad' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Sad')}>
                      <Text style={{fontSize: 50, left: 13}}>😞</Text>
                      <Text style={{fontSize: 11, left: 28}}>Sad</Text>
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
                        this.state.feel == 'Dissappoint'
                          ? '#D0942A'
                          : '#F3F3F3',
                    }}>
                    <TouchableOpacity
                      onPress={this.Feel.bind(this, 'Dissappoint')}>
                      <Text style={{fontSize: 50, left: 14}}>😥</Text>
                      <Text style={{fontSize: 11, left: 6}}>Dissappoint</Text>
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
                        this.state.feel == 'Sleepless' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity
                      onPress={this.Feel.bind(this, 'Sleepless')}>
                      <Text style={{fontSize: 50, left: 14}}>😴</Text>
                      <Text style={{fontSize: 11, left: 14}}>Sleepless</Text>
                    </TouchableOpacity>
                  </View>
                </HStack>
                💁🏼
                <HStack m={5} spacing={15} style={{left: -35}}>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel == 'Betrayed' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity
                      onPress={this.Feel.bind(this, 'Betrayed')}>
                      <Text style={{fontSize: 50, left: 16}}>💁🏼</Text>
                      <Text style={{fontSize: 11, left: 14}}>Betrayed</Text>
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
                        this.state.feel == 'Nervous' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Nervous')}>
                      <Text style={{fontSize: 50, left: 14}}>😨</Text>
                      <Text style={{fontSize: 11, left: 16}}>Nervous</Text>
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
                        this.state.feel == 'Angry' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Angry')}>
                      <Text style={{fontSize: 50, left: 14}}>😡</Text>
                      <Text style={{fontSize: 11, left: 24}}>Angry</Text>
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
                        this.state.feel == 'Anxious' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Anxious')}>
                      <Text style={{fontSize: 50, left: 14}}>😰</Text>
                      <Text style={{fontSize: 11, left: 20}}>Anxious</Text>
                    </TouchableOpacity>
                  </View>
                </HStack>
                😙
                <HStack m={5} spacing={15} style={{left: -35}}>
                  <View
                    style={{
                      width: 80,
                      height: 82,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      borderRadius: 14,
                      borderColor:
                        this.state.feel == 'Failed' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Failed')}>
                      <Text style={{fontSize: 50, left: 14}}>😙</Text>
                      <Text style={{fontSize: 11, left: 23}}>Failed</Text>
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
                        this.state.feel == 'Excited' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Excited')}>
                      <Text style={{fontSize: 50, left: 14}}>🤩</Text>
                      <Text style={{fontSize: 11, left: 20}}>Excited</Text>
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
                        this.state.feel == 'Crying' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Crying')}>
                      <Text style={{fontSize: 50, left: 14}}>😭</Text>
                      <Text style={{fontSize: 11, left: 22}}>Crying</Text>
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
                        this.state.feel == 'Sick' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <TouchableOpacity onPress={this.Feel.bind(this, 'Sick')}>
                      <Text style={{fontSize: 50, left: 13}}>😮‍💨</Text>
                      <Text style={{fontSize: 11, left: 28}}>Sick</Text>
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
                marginTop: '-35%',
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

const styles = StyleSheet.create({
  FeelOne: {
    justifyContent: 'center',
    alignItems: 'center',
    left: '15%',
    // padding: 50,
    marginTop: '10%',

    fontWeight: 'bold',
    fontSize: 28,
  },
});

export default App;
