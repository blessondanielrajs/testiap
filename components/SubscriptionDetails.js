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

import firestore from '@react-native-firebase/firestore';
import Menu from './menu.js';
import {Button} from '@rneui/themed';
import Home from './home.js';
import moment from 'moment';
import Subscription from './subscription.js';

import {Text, VStack, Box} from '@react-native-material/core';
const {width, height} = Dimensions.get('window');
const dateFormatList = 'DD-MM-YYYY';
class App extends React.Component {
  state = {
    status: '',
    data: this.props.data,
    back: 'subscriptionDetails',
    Email: this.props.data,
    Peroid: '',
    MonthAmount: 0,
    AnnualAmount: 0,
    Amount: 0,
    code: '',
    Expired: '',
    Started: '',
    Notes: '',
    Percentage: '',
    VisableNotes: false,
    disabled: false,
    applePay: true,
    methodName: '',
    network: '',
    paymentData: '',
    start: '',
    Renewal: '',
    MembershipDetails: '',
    sortedSubscription: '',
    ViewBillDetails: false,
  };

  componentDidMount = async () => {
    //take Subscription Details
    var SubscriptionData = [];
    var doc = firestore()
      .collection('SubscriptionDetails')
      .where('email', '==', this.state.Email)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
        SubscriptionData.push(data);
      });
    });
    let sortedSubscription = SubscriptionData.slice().sort(
      (a, b) => b.time - a.time,
    );
    console.log(sortedSubscription[0].amount);

    this.setState({
      Amount: sortedSubscription[0].amount,
      Expired: sortedSubscription[0].expired,
      methodName: sortedSubscription[0].methodName,
      network: sortedSubscription[0].network,
      paymentData: sortedSubscription[0].paymentData,
      Peroid: sortedSubscription[0].peroid,
      start: sortedSubscription[0].time,
      Renewal: sortedSubscription[0].expired + 86400,
      sortedSubscription: sortedSubscription,
    });
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  Home = () => {
    this.setState({status: 'home'});
  };

  ViewBillDetails = () => {
    this.setState({ViewBillDetails: true});
  };

  cancelSubscription = () => {
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
        tmp.subscription = false;
        console.log(tmp);
        thing.ref.update(tmp);
      });
    this.setState({status: 'subscription'});
  };

  render() {
    //console.log('->' + this.state.Peroid);

    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : this.state.status === 'subscription' ? (
          <Subscription data={this.props.data} />
        ) : (
          <View
            style={{height: height, width: width, backgroundColor: '#FAFAFA'}}>
            <ScrollView>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    height: Platform.OS === 'android' ? 60 : 100,

                    marginTop: '10%',
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
                      fontSize: 25,
                    }}>
                    Subscription Details
                  </Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: '10%',
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

                <View>
                  <View
                    style={{
                      width: '90%',
                      // height: 82,
                      marginLeft: '4%',
                      marginTop: '10%',
                      backgroundColor: '#FFFFFF',
                      borderWidth: 2,
                      borderRadius: 14,
                      borderColor: '#F3F3F3',
                      //  this.state.Peroid == 'Month' ? '#D0942A' : '#F3F3F3',
                    }}>
                    <Text
                      style={{
                        color: '#343434',
                        fontSize: 17,
                        paddingLeft: '4%',
                        fontWeight: 'bold',
                        paddingTop: '4%',
                      }}>
                      Your membership
                    </Text>

                    <View style={styles.container}>
                      <Text
                        style={{
                          color: '#343434',
                          fontSize: 17,
                          paddingLeft: '4%',
                          fontWeight: 'bold',
                          paddingTop: '4%',
                        }}>
                        {this.state.Peroid}
                      </Text>
                      <Text
                        style={{
                          color: '#343434',
                          fontSize: 17,
                          paddingLeft: '56%',
                          fontWeight: 'bold',
                          paddingTop: '4%',
                          paddingRight: '1%',
                        }}>
                        ${this.state.Amount}/
                        {this.state.Peroid === 'month' ? 'm' : 'yr'}
                      </Text>
                    </View>

                    <View style={styles.container}>
                      <Text
                        style={{
                          color: '#343434',
                          fontSize: 17,
                          paddingLeft: '4%',
                          fontWeight: 'bold',
                          paddingTop: '4%',
                        }}>
                        Next renewal
                      </Text>
                      <Text
                        style={{
                          color: '#343434',
                          fontSize: 17,
                          paddingLeft: '30%',
                          fontWeight: 'bold',
                          paddingTop: '4%',
                          alignItems: 'flex-end',
                          paddingRight: '10%',
                        }}>
                        {moment.unix(this.state.Renewal).format(dateFormatList)}
                      </Text>
                    </View>
                    <View style={styles.container}>
                      <Text
                        style={{
                          color: '#343434',
                          fontSize: 17,
                          paddingLeft: '4%',
                          fontWeight: 'bold',
                          paddingTop: '4%',
                        }}>
                        Expiry date
                      </Text>
                      <Text
                        style={{
                          color: '#343434',
                          fontSize: 17,
                          paddingLeft: '34%',
                          fontWeight: 'bold',
                          paddingTop: '4%',
                        }}>
                        {moment.unix(this.state.Expired).format(dateFormatList)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={this.ViewBillDetails}>
                    <View style={styles.container}>
                      <View
                        style={{
                          width: '90%',
                          marginLeft: '4%',
                          backgroundColor: '#FFFFFF',
                          borderWidth: 2,
                          borderRadius: 14,
                          borderColor: '#F3F3F3',
                          marginTop: '5%',
                        }}>
                        <Text
                          style={{
                            color: '#343434',
                            fontSize: 17,
                            paddingLeft: '4%',
                            fontWeight: 'normal',
                            paddingTop: '3%',
                            paddingBottom: '3%',
                          }}>
                          View billing details
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {this.state.ViewBillDetails ? (
                    <VStack
                      m={4}
                      spacing={1}
                      divider={true}
                      style={{
                        marginTop: '2%',
                        paddingRight: '5%',
                        paddingLeft: '5%',
                      }}>
                      {Object.entries(this.state.sortedSubscription).map(
                        ([key, value]) => {
                          return (
                            <>
                              <View style={styles.container}>
                                <View
                                  style={{
                                    width: '90%',
                                    marginTop: '1%',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#343434',
                                      fontSize: 17,
                                      paddingLeft: '4%',
                                      fontWeight: 'normal',
                                      paddingTop: '3%',
                                      paddingBottom: '3%',
                                    }}>
                                    {value.peroid} subscription
                                  </Text>

                                  <Text
                                    style={{
                                      color: '#343434',
                                      fontSize: 17,
                                      paddingLeft: '4%',
                                      fontWeight: 'normal',
                                      paddingTop: '3%',
                                      paddingBottom: '3%',
                                      fontWeight: 'bold',
                                    }}>
                                    {moment
                                      .unix(value.time)
                                      .format(dateFormatList)}{' '}
                                    -{' '}
                                    {moment
                                      .unix(value.expired)
                                      .format(dateFormatList)}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#343434',
                                      fontSize: 17,
                                      paddingLeft: '4%',
                                      fontWeight: 'normal',
                                      paddingTop: '3%',
                                      paddingBottom: '3%',
                                      fontWeight: 'bold',
                                    }}>
                                    <Text style={{fontSize: 23}}></Text> Apple
                                    Pay &emsp; &emsp;
                                    <Text style={{color: '#4ECA3A'}}>
                                      {' '}
                                      ${value.amount}/
                                      {value.peroid === 'Month' ? 'm' : 'yr'}
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            </>
                          );
                        },
                      )}
                    </VStack>
                  ) : (
                    ''
                  )}
                </View>
              </View>
              <VStack m={4} spacing={1} divider={false}>
                <TouchableOpacity>
                  <Box h={80}></Box>
                </TouchableOpacity>
              </VStack>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <Button
                title="Cancel subscription"
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
                }}
                onPress={this.cancelSubscription}
              />
            </View>
          </View>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '1%',
    paddingBottom: '3%',
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
  bottomContainer: {
    borderTopColor: '#F2F1EE',
    borderTopWidth: 2,
    width: width,
    alignItems: 'center',
    paddingVertical: 25,
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    bottom: -10,
    right: 0,
    flex: 0.1,
    height: 100,
  },
});

export default App;
