import React from 'react';
import {StyleSheet, View, Dimensions, TextInput, Alert} from 'react-native';
import {Text, Stack, Button} from '@react-native-material/core';
import Login from './login.js';
import ChangePassword from './change_password.js';
const {width, height} = Dimensions.get('window');
class App extends React.Component {
  state = {
    status: 0,
    Email: '',
    Next: false,
    Account: '',
  };

  Email = e => {
    console.log(e);
    this.setState({Email: e});
  };

  Next = () => {
    if (this.state.Email == '') {
      Alert.alert('Invaild Input Email', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return false;
    } else {
      this.setState({status: 'changepassword'});
    }
  };

  Login = () => {
    console.log(this.state);
    this.setState({status: 'login'});
  };

  render() {
    return (
      <>
        {this.state.status === 'changepassword' ? (
          <ChangePassword data={this.state.Email} />
        ) : this.state.status === 'login' ? (
          <Login />
        ) : (
          <View>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <Stack spacing={1}>
                <Text variant="h5" style={styles.ForgotPassword}>
                  Forgot Password
                </Text>
                <Text style={{left: '2%', margin: '3%', color: '#343434',}}>
                  Please enter your e-mail to recover password
                </Text>
              </Stack>
              <Stack spacing={'6%'} style={{marginTop: '8%', left: '4%'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={this.Email}
                  uppercase={false}
                  autoCapitalize="none"
                  placeholderTextColor="#343434"
                  placeholder="Enter your e-mail"
                />
                <Button
                  title="Next"
                  uppercase={false}
                  style={{backgroundColor: '#D0942A', width: '93%'}}
                  onPress={this.Next}
                />
                <Button
                  variant="text"
                  title={<Text style={{ color: '#343434',}}>Already have an account? Login</Text>}
                  uppercase={false}
                  onPress={this.Login}
                  style={{right: '5%'}}
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
  ForgotPassword: {
    left: '25%',
    marginTop:Platform.OS==='ios'? '20%':'10%',
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
    borderRadius: 10,
    borderinlinecolor: 'red',
    borderColor: '#D0942A',
    backgroundColor: '#FFFFFF',
  },
});
export default App;
