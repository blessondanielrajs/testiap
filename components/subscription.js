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
  LogBox,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Menu from './menu.js';
import {Button} from '@rneui/themed';
import Home from './home.js';
import moment from 'moment';
import momenttimezone from 'moment-timezone';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
momenttimezone.tz.setDefault('America/Los_Angeles');
import SubscriptionDetails from './SubscriptionDetails.js';
import {Text, VStack, HStack} from '@react-native-material/core';
import OtherPayment from './OtherPayment.js';
import {Spinner} from 'react-native-ios-kit';

const {width, height} = Dimensions.get('window');
const items = Platform.select({ios: ['com.temporary.id']});

class App extends React.Component {
  state = {
    status: '',
    data: this.props.data,
    back: 'subscription',
    Email: this.props.data,
    Peroid: '',
    MonthActual: 0,
    MonthOffer: 0,
    AnnualActual: 0,
    AnnualOffer: 0,
    Amount: 0,
    code: '',
    Expired: '',
    Started: '',
    Notes: '',
    Percentage: '',
    VisableNotes: false,
    disabled: false,
    applePay: true,
    screen: '',
    isLoading: '',
    url: '',
    DiscountDetails: '',
    DiscountApply: false,
    visible: false,
  };

  componentDidMount = async () => {
    if (Platform.OS === 'ios') {
      this.setState({isLoading: true});
    }

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      var doc = firestore().collection('Subscription').get();
      await doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();
          console.log(data);

          this.setState({
            MonthActual: data.MonthActual,
            MonthOffer: data.MonthOffer,
            AnnualActual: data.AnnualActual,
            AnnualOffer: data.AnnualOffer,
          });
        });
      });
      //  this.setState({isLoading: false});
    }
    var flag = 0;
    var doc = firestore()
      .collection('Sleep')
      .where('Email', '==', this.state.Email)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
        console.log('data');
        if (data.subscription === true) {
          flag = 1;
        }
      });
    });

    if (flag === 1) {
      var doc = firestore()
        .collection('SubscriptionDetails')
        .where('email', '==', this.state.Email)
        .get();
      await doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();
          console.log('data');
          var t1 = moment();
          var t2 = moment(t1).unix();
          if (t2 < data.expired) {
            console.log('screen');
            this.setState({screen: 'SubscriptionDetails', isLoading: false});
          }
        });
      });
    }
    this.setState({isLoading: false});
    const METHOD_DATA = [
      {
        supportedMethods: ['apple-pay'],
        data: {
          merchantIdentifier: 'merchant.com.theoriginalsleep',
          supportedNetworks: ['visa', 'mastercard', 'amex'],
          countryCode: 'US',
          currencyCode: 'USD',
        },
      },
    ];

    const DETAILS = {
      id: 'The Original Sleep',
      displayItems: [
        {
          label: 'The Original Sleep',
          amount: {currency: 'USD', value: this.state.Amount},
        },
      ],

      total: {
        label: 'The Original Sleep',
        amount: {currency: 'USD', value: this.state.Amount},
      },
    };

    const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);

    await paymentRequest.canMakePayments().then(canMakePayment => {
      if (canMakePayment) {
        console.log('Apple Pay', 'Apple Pay is available in this device');
        this.setState({applePay: false});
      }
    });
  };

  applePay = async () => {
    if (this.state.Amount === 0) {
      this.setState({visible: true});
    } else {
      const METHOD_DATA = [
        {
          supportedMethods: ['apple-pay'],
          data: {
            merchantIdentifier: 'merchant.com.theoriginalsleep',
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            countryCode: 'US',
            currencyCode: 'USD',
          },
        },
      ];

      const DETAILS = {
        id: 'basic-example',
        displayItems: [
          {
            label: 'The Original Sleep',
            amount: {currency: 'USD', value: this.state.Amount.toFixed(2)},
          },
        ],

        total: {
          label: 'The Original Sleep',
          amount: {currency: 'USD', value: this.state.Amount.toFixed(2)},
        },
      };

      const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);

      paymentRequest.canMakePayments().then(canMakePayment => {
        if (canMakePayment) {
          console.log('Can Make Payment');

          paymentRequest.show().then(paymentResponse => {
            // Your payment processing code goes here

            paymentResponse.complete('success');

            // console.log(paymentResponse);
            console.log('kjfjdfjf');
            var t1 = moment();
            var t2 = moment(t1).unix();
            var expMonth = t2 + 2630000;
            var expAnnual = t2 + 31536000;
            console.log(
              paymentResponse._details.paymentToken === undefined
                ? 'null'
                : paymentResponse._details.paymentToken,
            );
            let data = {
              billingContact: paymentResponse._details.billingContact,
              paymentData: paymentResponse._details.paymentData,
              displayName: paymentResponse._details.paymentMethod.displayName,
              network: paymentResponse._details.paymentMethod.network,
              type: paymentResponse._details.paymentMethod.type,
              paymentToken:
                paymentResponse._details.paymentToken === undefined
                  ? 'null'
                  : paymentResponse._details.paymentToken,
              transactionIdentifier:
                paymentResponse._details.transactionIdentifier,
              methodName: paymentResponse._methodName,
              email: this.props.data,
              discount: this.state.VisableNotes ? this.state.code : 'null',
              peroid: this.state.Peroid,
              amount: this.state.Amount,
              time: t2,
              expired: this.state.Peroid === 'Month' ? expMonth : expAnnual,
            };
            console.log(data);
            const SubscriptionDetails = firestore()
              .collection('SubscriptionDetails')
              .add(data)

              .then(() => {
                console.log('SubscriptionDetails added!');
                if (this.state.DiscountApply === true) var t1 = moment();
                var t2 = moment(t1).unix();
                let data = {
                  Email: this.props.data,
                  code: this.state.code,
                  Amount: this.state.Amount.toFixed(2),
                  Peroid: this.state.Peroid,
                  Time: t2,
                };
                const Discount = firestore()
                  .collection('DiscountDetails')
                  .add(data)

                  .then(() => {
                    console.log('added!');
                  });

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
                    tmp.subscription = true;
                    console.log(tmp);
                    thing.ref.update(tmp);
                  });

                this.setState({screen: 'SubscriptionDetails'});
              });
          });
        } else {
          console.log('Cant Make Payment');
        }
      });
    }
    console.log(this.state.DiscountApply);
  };

  Peroid = e => {
    console.log(e);
    this.setState({Peroid: e});
    if (e == 'Month') {
      this.setState({Amount: this.state.MonthOffer});
      var doc = firestore().collection('Subscription').get();
      doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();
          console.log(data);

          this.setState({
            url: data.MonthUrl,
          });
        });
      });
    } else if (e == 'Annual') {
      this.setState({Amount: this.state.AnnualOffer});
      var doc = firestore().collection('Subscription').get();
      doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();
          console.log(data);

          this.setState({
            url: data.AnnualUrl,
          });
        });
      });
    }
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  Home = () => {
    this.setState({status: 'home'});
  };
  code = e => {
    console.log(e);
    this.setState({code: e});
  };

  otherPayment = () => {
    if (this.state.Amount === 0) {
      this.setState({visible: true});
    } else {
      this.setState({status: 'otherPayment'});
    }
  };

  Apply = async () => {
    console.log('come');
    console.log(this.state.VisableNotes);
    var flag = 0;
    if (
      this.state.VisableNotes === false ||
      this.state.VisableNotes === 'Invalid'
    ) {
      console.log('come1');
      var doc = firestore()
        .collection('Discount')
        .where('Code', '==', this.state.code)
        .get();
      await doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();
          console.log(data);
          flag = 1;
          this.setState({
            Expired: data.Expired,
            Notes: data.Notes,
            Percentage: data.Percentage,
            Started: data.Started,
          });
        });
      });

      var t1 = moment();
      var t2 = moment(t1).unix();
      console.log(t2 > this.state.Started);
      //console.log(t2 >= this.state.Started-100)
      // console.log(this.state.Expired >= t2);
      if (t2 > this.state.Started && t2 <= this.state.Expired) {
        console.log('Discount valid');
        let num1 = this.state.MonthOffer;
        let num2 = this.state.AnnualOffer;
        let p = this.state.Percentage;

        let mon = (num1 / 100) * p;
        let anl = (num2 / 100) * p;
        mon = num1 - mon;
        anl = num2 - anl;
        var today = new Date();
        var date = today.toISOString().slice(0, 10);
        var time = today.toLocaleTimeString('en-US', {hour12: false});
        var dateTime = date + ' ' + time;

        this.setState({
          MonthOffer: mon,
          AnnualOffer: anl,
          VisableNotes: true,
          DiscountApply: true,
        });
        // this.monthUpload();
      }

      if (flag == 0) {
        console.log(this.state.VisableNotes);
        this.setState({VisableNotes: 'Invalid'});
      }
    }
  };

  render() {
    //  console.log('->' + this.props.data);

    return (
      <>
        {this.state.isLoading === true ? (
          <>
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: '#FAFAFA',
              }}>
              <View style={{marginTop: '80%'}}>
                <Spinner
                  animating={true}
                  size="large"
                  theme={{primaryColor: '#D0942A'}}
                />
              </View>
            </View>
          </>
        ) : (
          <>
            {this.state.status === 'menu' ? (
              <Menu data={this.state} />
            ) : this.state.status === 'home' ? (
              <Home data={this.props.data} />
            ) : this.state.screen === 'SubscriptionDetails' ? (
              <SubscriptionDetails data={this.props.data} />
            ) : this.state.status === 'otherPayment' ? (
              <OtherPayment data={this.props.data} Amount={this.state.Amount} />
            ) : (
              <View
                style={{
                  height: height,
                  width: width,
                  backgroundColor: '#FAFAFA',
                }}>
                <ScrollView>
                  <View>
                    <Dialog
                      visible={this.state.visible}
                      onTouchOutside={() => {
                        this.setState({visible: false});
                      }}>
                      <DialogContent style={{padding: 20}}>
                        <Text>Please Select Amount</Text>
                      </DialogContent>
                    </Dialog>
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
                          fontSize: 25,
                        }}>
                        Subscription
                      </Text>
                      <TouchableOpacity
                        style={{
                          marginLeft: '35%',
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
                      <Text
                        style={{
                          fontWeight: 'bold',
                          left: '5%',
                          fontSize: 28,
                          color: '#343434',
                        }}>
                        Are you enjoying?
                      </Text>
                      <Text
                        style={{
                          left: 5,
                          margin: 15,
                          fontSize: 13,
                          color: '#343434',
                        }}>
                        Get membership and enjoy premium content
                      </Text>
                      <Text
                        style={{
                          color: '#343434',

                          marginLeft: '5%',
                          paddingTop: '5%',
                          fontWeight: 'bold',
                          fontSize: 25,
                        }}>
                        Disount code
                      </Text>

                      <View style={styles.container}>
                        <TextInput
                          style={styles.input}
                          placeholder="Enter your code"
                          onChangeText={this.code}
                          uppercase={false}
                          autoCapitalize="none"
                          placeholderTextColor="#343434"
                        />
                        <TouchableOpacity onPress={this.Apply}>
                          <Text style={{marginTop: '30%', color: '#343434'}}>
                            Apply
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {this.state.VisableNotes === true ? (
                        <View
                          style={{
                            height: '6%',
                            width: '50%',
                            backgroundColor: '#CEFFC6',
                            padding: '1%',
                            marginTop: '-7%',
                            marginLeft: '5%',
                            borderRadius: 4,
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: '#4ECA3A',
                              fontWeight: 'bold',
                              padding: 3,
                            }}>
                            Discount Applied {this.state.Percentage}%
                          </Text>
                        </View>
                      ) : this.state.VisableNotes === 'Invalid' ? (
                        <View
                          style={{
                            height: '6%',
                            width: '50%',
                            backgroundColor: '#FFC6C6',
                            padding: '1%',
                            marginTop: '-7%',
                            marginLeft: '5%',
                            borderRadius: 4,
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: '#CA3A3A',
                              fontWeight: 'bold',
                              padding: 3,
                            }}>
                            Invalid discount code
                          </Text>
                        </View>
                      ) : (
                        ''
                      )}

                      <TouchableOpacity
                        onPress={this.Peroid.bind(this, 'Month')}>
                        <View
                          style={{
                            width: '90%',
                            // height: 82,
                            marginLeft: '4%',
                            marginTop: '2%',
                            backgroundColor: '#FFFFFF',
                            borderWidth: 2,
                            borderRadius: 14,
                            borderColor:
                              this.state.Peroid == 'Month'
                                ? '#D0942A'
                                : '#F3F3F3',
                          }}>
                          <Text
                            style={{
                              color: '#757575',
                              fontSize: 17,
                              paddingLeft: '4%',
                              fontWeight: 'bold',
                              paddingTop: '4%',
                            }}>
                            Monthly Subscription
                          </Text>
                          <Text
                            style={{
                              fontSize: 17,
                              paddingTop: '4%',
                              fontWeight: 'bold',
                              paddingLeft: '4%',
                              paddingTop: '4%',
                              paddingBottom: '4%',
                              color: '#343434',
                              // textDecorationLine: 'line-through',
                              // textDecorationStyle:'solid',
                            }}
                            // style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}
                          >
                            <Text style={{fontWeight: '700'}}>
                              ${this.state.MonthOffer.toFixed(2)}
                            </Text>{' '}
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                                fontWeight: '300',
                              }}>
                              ${this.state.MonthActual.toFixed(2)}/Month
                            </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{paddingTop: '5%'}}
                        onPress={this.Peroid.bind(this, 'Annual')}>
                        <View
                          style={{
                            width: '90%',
                            // height: 82,
                            marginLeft: '4%',

                            backgroundColor: '#FFFFFF',
                            borderWidth: 2,
                            borderRadius: 14,
                            borderColor:
                              this.state.Peroid == 'Annual'
                                ? '#D0942A'
                                : '#F3F3F3',
                          }}>
                          <Text
                            style={{
                              color: '#757575',
                              fontSize: 17,
                              paddingLeft: '4%',
                              fontWeight: 'bold',
                              paddingTop: '4%',
                            }}>
                            Anual Subscription
                          </Text>
                          <Text
                            style={{
                              fontSize: 17,
                              paddingTop: '4%',
                              fontWeight: 'bold',
                              paddingLeft: '4%',
                              paddingTop: '4%',
                              paddingBottom: '4%',
                              color: '#343434',
                            }}>
                            <Text style={{fontWeight: '700'}}>
                              ${this.state.AnnualOffer.toFixed(2)}
                            </Text>{' '}
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                                fontWeight: '300',
                              }}>
                              ${this.state.AnnualActual.toFixed(2)}/Month
                            </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <Button
                        title="Subscribe"
                        // icon={{
                        //   name: 'apple',
                        //   type: 'font-awesome',
                        //   size: 25,
                        //   color: 'white',
                        // }}
                        disabled={this.state.applePay}
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
                          paddingTop: '10%',
                        }}
                        onPress={this.applePay}
                      />
                      {/* <Button
                        containerStyle={{
                          width: '94%',
                          marginHorizontal: 10,
                          marginVertical: 2,
                          paddingTop: '3%',
                        }}
                        title="Other Payment Mode"
                        type="clear"
                        titleStyle={{
                          color: '#343434',
                          fontWeight: 'bold',
                          color: '#343434',
                        }}
                        onPress={this.otherPayment}
                      /> */}
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '1%',
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
