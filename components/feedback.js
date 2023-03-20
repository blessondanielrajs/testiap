import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import firestore from '@react-native-firebase/firestore';
import {Stack} from '@react-native-material/core';
import SelectDropdown from 'react-native-select-dropdown';
import {Text, Button} from '@react-native-material/core';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {AirbnbRating} from 'react-native-ratings';
import moment from 'moment';
import Home from './home.js';
import momenttimezone from 'moment-timezone';
momenttimezone.tz.setDefault('America/Los_Angeles');
const {width, height} = Dimensions.get('window');
const fall_Sleep = ['5-10 min', 'under 30 min', ' 1 hour'];
const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
class App extends React.Component {
  state = {
    status: '',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    data: this.props.data,
    back: 'feedback',
    Email: this.props.data,
    visible: false,
  };

  two = rating => {
    console.log(rating);
    this.setState({two: rating});
  };

  three = rating => {
    console.log(rating);
    this.setState({three: rating});
  };

  four = rating => {
    console.log(rating);
    this.setState({four: rating});
  };
  five = rating => {
    this.setState({five: rating});
  };

  six = rating => {
    console.log(rating);
    this.setState({six: rating});
  };

  CommentSleep = e => {
    this.setState({CommentSleep: e});
  };

  Health = e => {
    this.setState({Health: e});
  };

  Realize = e => {
    this.setState({Realize: e});
  };

  Submit = () => {
    if (
      this.state.one === '' ||
      this.state.two === '' ||
      this.state.three === '' ||
      this.state.four === '' ||
      this.state.five === '' ||
      this.state.six === ''
    ) {
      this.setState({visible: true});
    } else {
      var d1 = moment();
      var d2 = moment(d1).unix();
      let data = {
        Email: this.props.data,
        one: this.state.one,
        two: this.state.two,
        three: this.state.three,
        four: this.state.four,
        five: this.state.five,
        six: this.state.six,
        Seconds: d2,
      };

      const users = firestore()
        .collection('Feedback')
        .add(data)

        .then(() => {
          console.log('feedback added!');
          this.setState({status: 'home'});
        });
    }
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };
  render() {
    //console.log('->' + this.props.data);
    let index1 = 0;
    const fall_Sleep = [
      {key: index1++, label: '5-10 min'},
      {key: index1++, label: 'under 30 min'},
      {key: index1++, label: '1 hour'},
    ];

    let index2 = 0;
    const hours = [
      {key: index2++, label: '1'},
      {key: index2++, label: '2'},
      {key: index2++, label: '3'},
      {key: index2++, label: '4'},
      {key: index2++, label: '5'},
      {key: index2++, label: '6'},
      {key: index2++, label: '7'},
      {key: index2++, label: '8'},
      {key: index2++, label: '9'},
    ];
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
              
                <View
                  style={{
                    flexDirection: 'row',
                    height: 50,

                    marginTop:Platform.OS==='ios'? '10%':'1%',
                  }}>
                  <Text
                    style={{
                      color: '#343434',
                      alignContent: 'center',
                      alignSelf: 'center',
                      marginLeft: '30%',

                      fontWeight: 'bold',
                      fontSize: 30,
                    }}>
                    Feedback
                  </Text>
                </View>
                <ScrollView>
                <Dialog
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({visible: false});
                  }}>
                  <DialogContent>
                    <Text style={{marginTop: '10%', color: '#343434',}}>
                      Please fill all the inputs
                    </Text>
                  </DialogContent>
                </Dialog>
                <View>
                  <Stack spacing={'6%'} style={{marginTop: '2%', left: '4%'}}>
                    <Text
                      style={{
                        fontWeight: '500',
                        left: '5%',
                        fontSize: 22,
                        paddingRight: '10%',
                        color: '#343434',
                      }}>
                      How long did it take you to fall alseep last night?
                    </Text>
                    <View style={{marginTop: '1%', left: '5%'}}>
                      <ModalSelector
                        data={fall_Sleep}
                        supportedOrientations={['portrait', 'landscape']}
                        accessible={true}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        animationType={'none'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        cancelContainerStyle={{backgroundColor:'white'}}
                      optionContainerStyle={{backgroundColor:'white'}}
                      optionTextStyle={{color:'#343434',fontWeight:'500'}}
                        onChange={option => {
                          this.setState({one: option.label});

                          // this.trigger(option.label);
                        }}>
                        <TextInput
                          style={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderWidth: 2,
                            height: 40,
                            borderRadius: 10,
                            borderColor: '#D0942A',
                            textAlign: 'center',
                            color: '#343434',
                          }}
                          editable={true}
                          placeholder={
                            this.state.one.length ? '' : 'select an option'
                          }
                          placeholderTextColor="#343434"
                          value={this.state.one.length ? this.state.one : ''}
                        />
                      </ModalSelector>
                    </View>

                    <Text
                      style={{
                        fontWeight: '500',
                        left: '5%',
                        fontSize: 22,
                        paddingRight: '10%',
                        color: '#343434',
                      }}>
                      Do you like the sleep story?
                    </Text>
                    <View style={{marginTop: '1%', right: '5%'}}>
                      <AirbnbRating
                        defaultRating={0}
                        size={30}
                        onFinishRating={this.two}
                        showRating={false}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: '500',
                        left: '5%',
                        fontSize: 22,
                        paddingRight: '15%',
                        color: '#343434',
                      }}>
                      Did you find it easy to fall asleep?
                    </Text>
                    <View style={{marginTop: '1%', right: '5%'}}>
                      <AirbnbRating
                        defaultRating={0}
                        size={30}
                        onFinishRating={this.three}
                        showRating={false}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: '500',
                        left: '5%',
                        fontSize: 22,
                        paddingRight: '20%',
                        color: '#343434',
                      }}>
                      How did you feel when you wake up this morning?
                    </Text>
                    <View style={{marginTop: '1%', right: '5%'}}>
                      <AirbnbRating
                        defaultRating={0}
                        size={30}
                        onFinishRating={this.four}
                        showRating={false}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: '500',
                        left: '5%',
                        fontSize: 22,
                        paddingRight: '15%',
                        color: '#343434',
                      }}>
                      Do you feel sleepy during the day?
                    </Text>
                    <View style={{marginTop: '1%', right: '5%'}}>
                      <AirbnbRating
                        defaultRating={0}
                        size={30}
                        onFinishRating={this.five}
                        showRating={false}
                      />
                    </View>
                    <Text
                      style={{
                        fontWeight: '500',
                        left: '5%',
                        fontSize: 22,
                        paddingRight: '10%',
                        color: '#343434',
                      }}>
                      How many hours did you sleep last night?
                    </Text>
                    <View
                      style={{
                        marginTop: '1%',
                        left: '5%',
                        paddingBottom: '5%',
                      }}>
                      
                      <ModalSelector
                        data={hours}
                        supportedOrientations={['portrait', 'landscape']}
                        accessible={true}
                        animationType={'none'}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        cancelContainerStyle={{backgroundColor:'white'}}
                        optionTextStyle={{color:'#343434',fontWeight:'500'}}
                      optionContainerStyle={{backgroundColor:'white'}}
                        onChange={option => {
                          this.setState({six: option.label});
                        }}>
                        <TextInput
                          style={{
                            width: '80%',
                            backgroundColor: 'white',
                            borderWidth: 2,
                            height: 40,
                            borderRadius: 10,
                            borderColor: '#D0942A',
                            textAlign: 'center',
                            color: '#343434',
                          }}
                          placeholder={
                            this.state.six.length ? '' : 'select an option'
                          }
                          placeholderTextColor="#343434"
                          value={this.state.six.length ? this.state.six : ''}
                          editable={true}
                        />
                      </ModalSelector>
                    </View>
                  </Stack>
                  <View style={{paddingBottom: '20%'}}>
                    <View style={styles.row}>
                      <Button
                        title="Next"
                        uppercase={false}
                        style={{
                          backgroundColor: '#D0942A',
                          width: '48%',
                          marginLeft: '25%',
                        }}
                        onPress={this.Submit}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    margin: 2,
    borderWidth: 2,
    padding: 10,
    paddingRight: '10%',
    height: 98,
    left: '5%',
    borderRadius: 10,
    borderinlinecolor: 'red',
    //#32a1ce
    borderColor: '#D0942A',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingBottom: '20%',
    marginTop: '1%',
    paddingLeft: '5%',
    paddingRight: '4%',
  },
});
export default App;
