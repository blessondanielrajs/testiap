import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Text, Stack, Button} from '@react-native-material/core';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from './SplashScreen';
import DeviceInfo from 'react-native-device-info';
import Home from './home.js';
import moment from 'moment';

import momenttimezone from 'moment-timezone';
momenttimezone.tz.setDefault('America/Los_Angeles');
const dateFormatList = 'DD/MM/YYYY HH:mm:ss';
const {width, height} = Dimensions.get('window');

const Hide =
  'https://cdn-icons.flaticon.com/png/512/2767/premium/2767146.png?token=exp=1660907642~hmac=d411d92110c145ca9cbd8c8e9b029c66';
const NotHide = 'https://cdn-icons-png.flaticon.com/512/709/709612.png';

class App extends Component {
  state = {
    status: '',
    Email: '',
    Password: '',
    RePassword: '',
    Account: false,
    Hide_Pass: true,
    Hide_RePass: true,
    UniqueId: '',
  };

  componentDidMount = () => {
    console.log(DeviceInfo.getUniqueId());
    this.setState({UniqueId: DeviceInfo.getUniqueId()});
  };

  SignUp = () => {
    let flag = 0;
    if (this.state.Email == '') {
      Alert.alert('Invaild Input Email', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      flag = 1;
      return false;
    } else if (this.state.Password == '') {
      Alert.alert('Invaild Input Password', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      flag = 1;
      return false;
    } else if (
      this.state.Password != this.state.RePassword ||
      this.state.RePassword == ''
    ) {
      console.log(this.state.RePassword);
      Alert.alert('Password Dismatch', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      flag = 1;
      return false;
    } else if (flag == 0) {
      var d1 = moment();
      var d2 = moment(d1).unix();
      let data = {
        Email: this.state.Email,
        Password: this.state.Password,
        RePassword: this.state.RePassword,
        SignIn: 'Email',
        Rating: 0,
        Feeling: '',
        FeelingTime: '',
        FeelSad: '',
        FeelSadTime: '',
        UniqueId: this.state.UniqueId,
        switch: 'login',
        subscription: false,
        viewCount: 0,
        LoginTime: d2,
        Language: 'ENGLISH',
        ReviewTiger: false,
        FirstName: '',
        LastName: '',
      };

      const users = firestore()
        .collection('Sleep')
        .add(data)

        .then(() => {
          console.log('User added!');
          this.setState({status: 'home'});
        });
    }
  };

  Already = () => {
    this.setState({status: 'already'});
  };

  Email = e => {
    this.setState({Email: e});
  };

  Password = e => {
    this.setState({Password: e});
  };

  RePassword = e => {
    this.setState({RePassword: e});
  };

  Visable_Password = () => {
    this.setState({Hide_Pass: false});
  };

  Visable_RePassword = () => {
    this.setState({Hide_RePass: false});
  };

  render() {
    var pass_image = this.state.Hide_Pass == false ? NotHide : Hide;
    var repass_image = this.state.Hide_RePass == false ? NotHide : Hide;
    return (
      <>
        {this.state.status === 'already' ? (
          <SplashScreen />
        ) : this.state.status === 'home' ? (
          <Home data={this.state.Email} />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <Stack spacing={1}>
                <Text variant="h5" style={styles.Signup}>
                  SignUp
                </Text>

                <Text style={{left: '4%', margin: '3%', color: '#343434'}}>
                  Please enter the required details to signup
                </Text>
              </Stack>
              <Stack spacing={'6%'} style={{marginTop: '8%', left: '4%'}}>
                <TextInput
                  placeholder="Enter your e-mail"
                  style={styles.input}
                  onChangeText={this.Email}
                  uppercase={false}
                  autoCapitalize="none"
                  placeholderTextColor="#343434"
                />

                <View style={this.Password}>
                  <TextInput
                    placeholder="Enter your password"
                    secureTextEntry={this.state.Hide_Pass}
                    style={styles.input}
                    onChangeText={this.Password}
                    placeholderTextColor="#343434"
                  />
                  <TouchableOpacity onPress={this.Visable_Password}>
                    <Image
                      source={{uri: pass_image}}
                      style={{
                        width: 30,
                        height: 25,
                        marginLeft: 279,
                        marginTop: -37,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={this.Password}>
                  <TextInput
                    placeholder="Re-enter password"
                    secureTextEntry={this.state.Hide_RePass}
                    style={styles.input}
                    onChangeText={this.RePassword}
                    placeholderTextColor="#202020"
                  />
                  <TouchableOpacity onPress={this.Visable_RePassword}>
                    <Image
                      source={{uri: repass_image}}
                      style={{
                        width: 30,
                        height: 25,
                        marginLeft: 279,
                        marginTop: -37,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <Button
                  title="Signup"
                  uppercase={false}
                  style={{backgroundColor: '#D0942A', width: '93%'}}
                  onPress={this.SignUp}
                />
                <Button
                  variant="text"
                  title={
                    <Text style={{size: 17, color: '#343434'}}>
                      Already have an account? Login
                    </Text>
                  }
                  uppercase={false}
                  style={{right: '3%'}}
                  onPress={this.Already}
                />
              </Stack>
            </View>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  Signup: {
    left: '37%',
    //  padding: 50,
    marginTop: Platform.OS === 'ios' ? '20%' : '10%',
    fontWeight: 'bold',
    size: 38,
    color: '#343434',
  },
  input: {
    width: '92%',
    margin: 2,
    borderWidth: 2,
    padding: 10,
    height: 48,
    //left: -25,
    borderRadius: 10,
    borderinlinecolor: 'red',
    //#32a1ce
    borderColor: '#D0942A',
    backgroundColor: '#FFFFFF',
  },
  password: {
    flexDirection: 'row',
    left: 1000,
  },
});
export default App;
