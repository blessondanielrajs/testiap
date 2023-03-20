import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  NativeModules,
  Platform,
} from 'react-native';
import {Text, Stack, Button} from '@react-native-material/core';
import firestore from '@react-native-firebase/firestore';
import SignUp from './signup.js';
import ForgotPassword from './forgot_password.js';
import DeviceInfo from 'react-native-device-info';
import Home from './home.js';

const {width, height} = Dimensions.get('window');
const Hide =
  'https://cdn-icons.flaticon.com/png/512/2767/premium/2767146.png?token=exp=1660907642~hmac=d411d92110c145ca9cbd8c8e9b029c66';
const NotHide = 'https://cdn-icons-png.flaticon.com/512/709/709612.png';
class App extends React.Component {
  state = {
    status: '',
    Email: '',
    Password: '',
    ForGotPassword: false,
    SignUp: false,
    UserDetails: '',
    Hide_Pass: true,
    UniqueId: '',
  };

  componentDidMount = () => {
    console.log(DeviceInfo.getUniqueId());
    this.setState({UniqueId: DeviceInfo.getUniqueId()});
  };

  Login = () => {
    let flag = 0;
    var mailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      Alert.alert(
        'Input Invalid Password'[
          ({
            text: 'Proceed ?',
            onPress: () => {},
          },
          {
            text: 'No',
            onPress: () => {},
            style: 'cancel',
          })
        ],
        {cancelable: false},
      );
    } else if (flag == 0) {
      var doc = firestore()
        .collection('Sleep')
        .where('Email', '==', this.state.Email)
        .where('Password', '==', this.state.Password)
        .get();
      doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();

          let user = {
            Email: data.Email,
            Password: data.Password,
            SignIn: data.SignIn,
          };
          this.setState({UserDetails: user, status: 'home'});
        });
      });
    }

    firestore()
      .collection('Sleep')
      .where('Email', '==', this.state.Email)
      .limit(1)
      .get()
      .then(query => {
        const thing = query.docs[0];
        console.log(thing.data());
        let tmp = thing.data();
        tmp.switch = 'login';
        tmp.UniqueId = this.state.UniqueId;
        console.log(tmp);
        thing.ref.update(tmp);
      });
  };

  Email = e => {
    console.log(e);
    this.setState({Email: e});
  };

  Password = e => {
    this.setState({Password: e});
  };

  ForGotPassword = () => {
    this.setState({status: 'forgotpassword'});
    console.log(this.state.UserDetails);
  };

  SignUp = e => {
    this.setState({status: 'signup'});
  };

  Visable_Password = () => {
    this.setState({Hide_Pass: false});
  };

  render() {
    var pass_image = this.state.Hide_Pass == false ? NotHide : Hide;
    return (
      <>
        {this.state.status === 1 ? (
          ''
        ) : this.state.status === 'home' ? (
          <Home data={this.state.UserDetails.Email} />
        ) : this.state.status === 'forgotpassword' ? (
          <ForgotPassword />
        ) : this.state.status === 'signup' ? (
          <SignUp />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <Stack spacing={1}>
                <Text variant="h5" style={styles.Login}>
                  Login
                </Text>

                <Text style={{left: '6%', margin: '3%', color: '#343434',}}>
                  Please enter the required details to login
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
                    uppercase={false}
                    style={styles.input}
                    onChangeText={this.Password}
                    placeholderTextColor="#343434"
                    autoCapitalize="none"
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
                <Button
                  title="Login"
                  uppercase={false}
                  style={{backgroundColor: '#D0942A', width: '93%',borderRadius:14}}
                  onPress={this.Login}
                />
                <Button
                  variant="text"
                  title={<Text style={{ color: '#343434',}}>Forgot Password?</Text>}
                  uppercase={false}
                  style={{right: '5%'}}
                  onPress={this.ForGotPassword}
                />
                <Button
                  variant="text"
                  title={<Text style={{ color: '#343434',}}>Dont have an account? Signup</Text>}
                  uppercase={false}
                  style={{right: '4%'}}
                  onPress={this.SignUp}
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
  Login: {
    left: '40%',
    // padding: 50,
    marginTop:Platform.OS==='ios'? '20%':'10%',
    fontWeight: 'bold',
    size: 38,
    letterSpacing: 1,
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
});

export default App;
