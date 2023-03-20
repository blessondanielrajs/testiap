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
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Menu from './menu.js';
import {Button} from '@rneui/themed';
import Home from './home.js';
import moment from 'moment';
import SubscriptionDetails from './SubscriptionDetails.js';
import {Text, VStack, HStack} from '@react-native-material/core';

const {width, height} = Dimensions.get('window');

class App extends React.Component {
  state = {
    status: '',
    data: this.props.data,
    back: 'subscription',
    Email: this.props.data,
    Mode: '',
  };

  Mode = e => {
    this.setState({Mode: e});
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  Home = () => {
    this.setState({status: 'home'});
  };

  Pay = async () => {
    if (this.state.Mode === 'card') {
      Linking.openURL(this.props.url);
      this.setState({status: 'home'});
    }
  };

  render() {
    //console.log('->' + this.props.data);

    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : this.state.screen === 'SubscriptionDetails' ? (
          <SubscriptionDetails data={this.props.data} />
        ) : this.state.status === 'otherPayment' ? (
          <OtherPayment data={this.props.data} />
        ) : (
          <View
            style={{height: height, width: width, backgroundColor: '#FAFAFA'}}>
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
                  fontSize: 22,
                }}>
                Other Payment Mode
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: '15%',
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

            <View style={styles.container}>
              <View
                style={{
                  width: '90%',
                  // height: 82,
                  marginLeft: '4%',

                  backgroundColor: '#FFFFFF',
                  borderWidth: 2,
                  borderRadius: 14,
                  borderColor: '#F3F3F3',
                  marginTop: '5%',
                  paddingBottom: '10%',
                }}>
                <Text
                  style={{
                    color: '#343434',
                    fontSize: 22,
                    paddingLeft: '4%',
                    fontWeight: '600',
                    paddingTop: '3%',
                    paddingBottom: '3%',
                  }}>
                  Payment mode
                </Text>

                {/* <Text
                  style={{
                    color: '#343434',
                    fontSize: 17,
                    paddingLeft: '4%',
                    fontWeight: '500',
                    paddingTop: '4%',
                    color: this.state.Mode == 'net' ? '#D0942A' : '#343434',
                  }}
                  onPress={this.Mode.bind(this, 'net')}>
                  Net banking
                </Text> */}
                <Text
                  style={{
                    color: '#343434',
                    fontSize: 17,
                    paddingLeft: '4%',
                    fontWeight: '500',
                    paddingTop: '4%',
                    color: this.state.Mode == 'card' ? '#D0942A' : '#343434',
                  }}
                  onPress={this.Mode.bind(this, 'card')}>
                  Debit or Credit card
                </Text>
              </View>
            </View>
            <Button
              title="Pay"
              iconContainerStyle={{marginRight: 10}}
              titleStyle={{fontWeight: '700'}}
              buttonStyle={{
                backgroundColor: '#D0942A',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              containerStyle={{
                width: '94%',
                marginHorizontal: 10,
                marginVertical: 1,
                paddingTop: '1%',
              }}
              onPress={this.Pay}
            />
          </View>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,

    flexDirection: 'row',
    marginTop: '3%',
    paddingBottom: '10%',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
  input: {
    height: 40,
    width: '72%',
    marginLeft: '1%',
    borderWidth: 2,
    padding: 10,
    backgroundColor: 'white',
    left: -15,
    borderRadius: 10,
    borderinlinecolor: '#32a1ce',
    borderColor: '#D0942A',
    marginTop: '5%',
  },
});

export default App;