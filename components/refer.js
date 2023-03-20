import React from 'react';
//import { Button ,Text} from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  Share,
} from 'react-native';
import referralCodeGenerator from 'referral-code-generator';
import {Text, VStack, HStack, Button} from '@react-native-material/core';
import Clipboard from '@react-native-clipboard/clipboard';
//import Share from 'react-native-share';
import Menu from './menu.js';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '1%',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
  input: {
    height: 40,
    width: 280,
    margin: 3,
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white',
    left: -15,
    borderRadius: 10,
    borderinlinecolor: '#32a1ce',
    borderColor: '#D0942A',
  },
});
class App extends React.Component {
  state = {
    status: '',
    ReferalCode: '',
    Email: this.props.data,
    back: 'refer',
  };

  componentDidMount = () => {
    var ans = referralCodeGenerator.custom('lowercase', 3, 3, 'sdsffskjnnn');
    this.setState({ReferalCode: ans});
  };
  Copy = () => {
    Clipboard.setString(this.state.ReferalCode);
    this.setState({status: 'copy'});
  };
  onShare = async () => {
    var code = this.state.ReferalCode;
    try {
      const result = await Share.share({
        message: code,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  render() {
    console.log('refer' + this.props.data);
    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : (
          <View>
            <View
              style={{height: height, width: width, backgroundColor: 'white'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 120,
                  backgroundColor: '#ffffff',
                  marginTop: '10%',
                }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    alignContent: 'center',
                    alignSelf: 'center',
                  }}
                  //this.props.navigation.navigate('DrawerOpen');
                  onPress={this.Menu}>
                  <Image
                    source={{
                      uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png',
                    }}
                    style={{width: 25, height: 25, marginLeft: '1%'}}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    alignContent: 'center',
                    alignSelf: 'center',
                    marginLeft: '10%',
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Refer a friend{' '}
                </Text>
              </View>

              <View style={{backgroundColor: '#ffffff'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    left: '5%',
                    fontSize: 28,
                  }}>
                  Are you enjoying?
                </Text>
                <Text style={{left: '2%', margin: '4%', fontSize: 13}}>
                  Refer a friend to use our app
                </Text>
                <HStack m={29} spacing={6}></HStack>
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    onChangeText={this.onChangeText}
                    value={this.state.ReferalCode}
                  />
                  <TouchableOpacity onPress={this.Copy}>
                    {this.state.status === 'copy' ? (
                      <Text style={{color: 'green'}}>Copied</Text>
                    ) : (
                      <Text>Copy</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <Button
                  title="Share"
                  uppercase={false}
                  style={{
                    backgroundColor: '#D0942A',
                    width: '92%',
                    left: -45,
                    margin: 60,
                  }}
                  onPress={this.onShare}
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
