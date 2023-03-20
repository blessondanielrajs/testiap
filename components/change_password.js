import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Stack, Button} from '@react-native-material/core';
import Login from './login.js';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const Hide =
  'https://cdn-icons.flaticon.com/png/512/2767/premium/2767146.png?token=exp=1660907642~hmac=d411d92110c145ca9cbd8c8e9b029c66';
const NotHide = 'https://cdn-icons-png.flaticon.com/512/709/709612.png';

class App extends React.Component {
  state = {
    status: '',
    Password: '',
    NewPassword: '',
    Next: '',
    Account: false,
    Hide_Pass: true,
    Hide_RePass: true,
  };

  Password = e => {
    this.setState({Password: e});
  };

  NewPassword = e => {
    console.log(e);
    this.setState({NewPassword: e});
  };

  Next = () => {
    let flag = 0;
    console.log(this.state.Password);
    if (this.state.Password == '') {
      console.log('come');
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
    } else if (this.state.NewPassword == '') {
      Alert.alert('Invaild Input New Password', [
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
      firestore()
        .collection('Sleep')
        .where('Email', '==', this.props.data)
        .limit(1)
        .get()
        .then(query => {
          console.log(query);
          const thing = query.docs[0];
          console.log(thing.data());
          let tmp = thing.data();
          tmp.Password = this.state.Password;

          // console.log(tmp);
          thing.ref.update(tmp);
        });
      this.setState({status: 'login'});
    }
  };

  Login = () => {
    console.log(this.state);
    this.setState({status: 'login'});
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
        {this.state.status === 'login' ? (
          <Login />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <Stack spacing={-20}>
                <Text variant="h5" style={styles.ChangePassword}>
                  Change Password
                </Text>
                <Text style={{left: '23%', color: '#343434',}}>Create your new password</Text>
              </Stack>
              <Stack spacing={40} style={{margin: 40}}>
                <View style={this.Password}>
                  <TextInput
                    placeholder="Enter your password"
                    secureTextEntry={this.state.Hide_Pass}
                    style={styles.input}
                    placeholderTextColor="#343434"
                    onChangeText={this.Password}
                  />
                  <TouchableOpacity onPress={this.Visable_Password}>
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
                <View style={this.Password}>
                  <TextInput
                    placeholder="Re-enter your new password"
                    secureTextEntry={this.state.Hide_RePass}
                    style={styles.input}
                    placeholderTextColor="#343434"
                    onChangeText={this.NewPassword}
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
                  title="Next"
                  uppercase={false}
                  style={{backgroundColor: '#D0942A', width: 356, left: -21}}
                  onPress={this.Next}
                />
                <Button
                  variant="text"
                  title={<Text style={{ color: '#343434',}}>Already have an account? Login</Text>}
                  uppercase={false}
                  style={{}}
                  onPress={this.Login}
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
  ChangePassword: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 30,
    padding: 50,
    color: '#343434',
    fontWeight: 'bold',
    size: 38,
    letterSpacing: 1.5,
  },
  input: {
    height: 40,
    width: 350,
    margin: 3,
    borderWidth: 2,
    padding: 10,
    height: 48,
    left: -25,
    borderRadius: 10,
    borderinlinecolor: '#32a1ce',
    borderColor: '#D0942A',
  },
});

export default App;
