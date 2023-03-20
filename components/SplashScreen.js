import React from 'react';
import {VStack} from '@react-native-material/core';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import Home from './home.js';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import momenttimezone from 'moment-timezone';
momenttimezone.tz.setDefault('America/Los_Angeles');
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import SignUp from './signup.js';
import Login from './login.js';
import firestore from '@react-native-firebase/firestore';
import Feedback from './feedback.js';
import {Button} from '@rneui/themed';
import {Spinner} from 'react-native-ios-kit';

import * as StoreReview from 'react-native-store-review';
//global paymentRequest
global.PaymentRequest = require('react-native-payments').PaymentRequest;
if (Platform.OS === 'ios') {
  GoogleSignin.configure({
    webClientId:
      '565691215957-8bk54e181n2ldtca6a9htvt9pf0ghnj5.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });
} else {
  GoogleSignin.configure({
    webClientId:
      '565691215957-6pc7ihfnjkr5don9dnv9tm7dtcciihm1.apps.googleusercontent.com',
    // client ID of type WEB for your server (needed to verify user ID and offline access)
  });
}

const {width, height} = Dimensions.get('window');
var SpinnerView = 2;
class App extends React.Component {
  state = {
    screen: '',
    Email: '',
    count: 0,
    uid: false,
    user: '',
    UniqueId: '',
    switch: '',
    VideoData: {},
    visible: false,
    subscriptionPrice: 0,
    toatalSubscriptionPrice: 0,
    Spinner: true,
  };

  componentDidMount = async () => {
    //set UniqueId Device
    setInterval(() => {
      this.setState({Spinner: false});
    }, 3000);

    this.setState({UniqueId: DeviceInfo.getUniqueId()});
    var alreadyUser = false;
    var statusUser = '';
    var viewVideo = false;
    var videoData = [];
    var FeedbackData = [];
    var VideoCount = [];
    //check if already user or logout user
    var doc = firestore()
      .collection('Sleep')
      .where('UniqueId', '==', DeviceInfo.getUniqueId())
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
        alreadyUser = true;
       // console.log(data);
        statusUser = data.switch;
        this.setState({Email: data.Email, statusUser: data.switch});
      });
    });
   // console.log('alreadyUser->' + alreadyUser);
    if (statusUser == 'logout') {
      this.setState({screen: 'splashScreen'});
    } else {
      //check already user
      if (alreadyUser == true) {
        var doc = firestore()
          .collection('Video')
          .where('User', '==', this.state.Email)
          .get();
        await doc.then(querySnapshot => {
          querySnapshot.forEach(snapshot => {
            data = snapshot.data();
            viewVideo = true;
          });
        });
      //  console.log('viewVideo->' + viewVideo);
        //check a if user play or not
        if (viewVideo == true) {
          var doc = firestore()
            .collection('Video')
            .where('User', '==', this.state.Email)
            .get();
          await doc.then(querySnapshot => {
            querySnapshot.forEach(snapshot => {
              data = snapshot.data();
              Data = {
                MilliSeconds: data.MilliSeconds,
              };
              videoData.push(Data);
            });
          });
          //check user submit feedback or not
          var doc = firestore()
            .collection('Feedback')
            .where('Email', '==', this.state.Email)
            .get();
          await doc.then(querySnapshot => {
            querySnapshot.forEach(snapshot => {
              data = snapshot.data();
              Data = {
                Seconds: data.Seconds,
              };
            // console.log(Data);
              FeedbackData.push(Data);
            });
          });

          let sortedVideoTime = videoData
            .slice()
            .sort((a, b) => b.MilliSeconds - a.MilliSeconds);
        //  console.log(sortedVideoTime);

          let sortedFeedbackTime = FeedbackData.slice().sort(
            (a, b) => b.Seconds - a.Seconds,
          );
          //config a user after 9 hrs triger a feedback page
        //  console.log('sortedFeedbackTime-' + sortedFeedbackTime.length);
          if (sortedFeedbackTime.length > 0) {
            var plussortedFeedbackTime = sortedFeedbackTime[0].Seconds + 86400;
          } else {
            var plussortedFeedbackTime = 0 + 32400;
          }

          var plussortedVideoTime = sortedVideoTime[0].MilliSeconds + 32400;

          var t1 = moment();
          var t2 = moment(t1).unix();
          if (t2 > plussortedVideoTime && t2 > plussortedFeedbackTime) {
           // console.log('shown feedback');
            this.setState({screen: 'feedback'});
          } else {
            this.setState({screen: 'home'});
          }
        } else if (viewVideo == false) {
          this.setState({screen: 'home'});
        }
      } else if (alreadyUser == false) {
        this.setState({screen: 'splashScreen'});
      }
    }
    //check a user watch 5 videos
    var doc = firestore()
      .collection('Video')
      .where('User', '==', this.state.Email)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
        VideoCount.push(data);
      });
    });
   // console.log(VideoCount.length);
    if (VideoCount.length > 5) {
      var flag = 0;
      var doc = firestore()
        .collection('Sleep')
        .where('User', '==', this.state.Email)
        .where('ReviewTiger', '==', false)
        .get();
      await doc.then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          data = snapshot.data();
          flag = 1;
        });
      });
      if (StoreReview.isAvailable && flag === 1) {
        StoreReview.requestReview();
        firestore()
          .collection('Sleep')
          .where('Email', '==', this.props.data)
          .limit(1)
          .get()
          .then(query => {
            // console.log(query);
            const thing = query.docs[0];
           // console.log(thing.data());
            let tmp = thing.data();
            tmp.ReviewTiger = true;
            thing.ref.update(tmp);
          });
      } else {
        // Linking.openURL(
        //   'https://itunes.apple.com/us/app/moonwalk-rocket-launches/id1439376174',
        // );
      }
    }
  };

  

  //GoogleSignIn
  GoogleSignIn = async () => {
    var d1 = moment();
    var d2 = moment(d1).unix();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign = auth().signInWithCredential(googleCredential);
    user_sign.then(async res => {
    //  console.log(res.user.given_name);
      let data = {
        Email: res.user.email,
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        uid: res.user.uid,
        SignIn: 'Google',
        UniqueId: this.state.UniqueId,
        switch: 'login',
        Feeling: '',
        FeelSad: '',
        Rating: 0,
        FeelingTime: '',
        FeelSadTime: '',
        subscription: false,
        viewCount: 0,
        LoginTime: d2,
        Language: 'ENGLISH',
        ReviewTiger: false,
      };
    //  console.log(data);
      if (this.state.statusUser === 'logout') {
        firestore()
          .collection('Sleep')
          .where('Email', '==', res.user.email)
          .get()
          .then(query => {
           // console.log('query');
            const thing = query.docs[0];
           // console.log(thing.data());
            let tmp = thing.data();
            tmp.switch = 'login';
            tmp.SignIn = 'Google';
           // console.log(tmp);
            thing.ref.update(tmp);
          });
        this.setState({screen: 'signin_google'});
      } else {
       // console.log('come');
        const users = firestore()
          .collection('Sleep')
          .add(data)
          .then(() => {
            console.log('User added!');
            this.setState({screen: 'signin_google', Email: res.user.email});
          });
        // console.log("users")
      }
    });
  };

  //FaceBookSignIn
  FaceBookSignIn = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const user_sign = auth().signInWithCredential(facebookCredential);
    user_sign.then(res => {
     // console.log(res.user);
      this.setState({uid: res.user.uid});
    });
  };
  //Apple Sign IN
  onAppleButtonPress = async () => {
    var d1 = moment();
    var d2 = moment(d1).unix();
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    const name = appleAuthRequestResponse.fullName;
    const fullName = `${name?.givenName} ${name?.familyName}`;
    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    // Sign the user in with the credential
    const authenticate = await auth().signInWithCredential(appleCredential);
    authenticate.user = {...authenticate.user, displayName: fullName};
   // console.log(authenticate.additionalUserInfo.profile.email);

    let data = {
      Email: authenticate.additionalUserInfo.profile.email,
      FirstName:'',
      LastName:'',
      SignIn: 'Apple',
      UniqueId: this.state.UniqueId,
      switch: 'login',
      Feeling: '',
      FeelSad: '',
      Rating: 0,
      FeelingTime: '',
      FeelSadTime: '',
      subscription: false,
      viewCount: 0,
      LoginTime: d2,
      Language: 'ENGLISH',
      ReviewTiger: false,
    };

    if (this.state.statusUser === 'logout') {
      firestore()
        .collection('Sleep')
        .where('Email', '==', authenticate.additionalUserInfo.profile.email)
        .get()
        .then(query => {
          const thing = query.docs[0];
        //  console.log(thing.data());
          let tmp = thing.data();
          tmp.switch = 'login';
          tmp.SignIn = 'Apple';
         // console.log(tmp);
          thing.ref.update(tmp);
        });
      this.setState({screen: 'signin_apple'});
    } else {
      const users = firestore()
        .collection('Sleep')
        .add(data)

        .then(() => {
        //  console.log('User added!');
          this.setState({
            screen: 'signin_apple',
            Email: authenticate.additionalUserInfo.profile.email,
          });
        });
    }
  };
  //Redirect SignUp Page
  SignUp = () => {
    if (this.state.statusUser) {
      this.setState({visible: true});
    } else {
      this.setState({screen: 'email'});
    }
  };
  //Redirect Login Page
  Login = async () => {
    this.setState({screen: 'login'});
  };

  render() {
    return (
      <>
        {this.state.Spinner === true ? (
          <View style={{height: height, width: width, marginTop: '80%'}}>
            <Spinner
              animating={true}
              size={'large'}
              theme={{primaryColor: '#D0942A'}}
            />
          </View>
        ) : (
          <View
            style={{height: height, width: width, backgroundColor: '#FAFAFA'}}>
            {this.state.screen === 'signin_google' ? (
              <Home data={this.state.Email} />
            ) : this.state.screen === 'signin_apple' ? (
              <Home data={this.state.Email} />
            ) : this.state.screen === 'email' ? (
              <SignUp />
            ) : this.state.screen === 'home' ? (
              <Home data={this.state.Email} />
            ) : this.state.screen === 'login' ? (
              <Login />
            ) : this.state.screen === 'feedback' ? (
              <Feedback data={this.state.Email} />
            ) : this.state.screen === 'splashScreen' ? (
              <View style={{backgroundColor: '#FAFAFA', height: height}}>
                <View>
                  <View>
                    <Dialog
                      visible={this.state.visible}
                      onTouchOutside={() => {
                        this.setState({visible: false});
                      }}>
                      <DialogContent style={{padding: 20}}>
                        <Text>Already User Please login</Text>
                      </DialogContent>
                    </Dialog>
                    <Image
                      source={require('../Images/new2.png')}
                      style={styles.logo}
                    />
                  </View>
                  <VStack spacing="1%">
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 26,
                        fontWeight: 'bold',
                        color: '#343434',
                      }}>
                      Welcome to Original Sleep
                    </Text>
                    <Text
                      variant="subtitle1"
                      style={{
                        textAlign: 'center',
                        color: '#343434',
                        marginTop: '3%',
                      }}>
                      We help you to be better you!
                    </Text>
                  </VStack>
                </View>
                <View style={{marginTop: '10%'}}>
                  <VStack spacing={'6%'}>
                    {/* <Button
                      title="Continue with Facebook"
                      icon={{
                        name: 'facebook',
                        type: 'font-awesome',
                        size: 25,
                        color: 'white',
                      }}
                      iconContainerStyle={{marginRight: 10}}
                      titleStyle={{fontWeight: '700'}}
                      buttonStyle={{
                        backgroundColor: '#007AFF',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 10,
                        height: 48,
                      }}
                      containerStyle={{
                        width: '94%',
                        marginHorizontal: '3%',
                        marginVertical: 1,
                      }}
                      onPress={this.FaceBookSignIn}
                    /> */}

                    <Button
                      title="Continue with Google"
                      icon={{
                        name: 'google',
                        type: 'font-awesome',
                        size: 25,
                        color: 'white',
                      }}
                      iconContainerStyle={{marginRight: 10}}
                      titleStyle={{fontWeight: '700'}}
                      buttonStyle={{
                        backgroundColor: '#d34836',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 10,
                        height: 48,
                      }}
                      containerStyle={{
                        width: '94%',
                        marginHorizontal: '3%',
                        marginVertical: Platform.OS === 'ios' ? 1 : 12,
                      }}
                      onPress={this.GoogleSignIn}
                    />
                    <Button
                      title="Continue with Apple"
                      icon={{
                        name: 'apple',
                        type: 'font-awesome',
                        size: 25,
                        color: 'white',
                      }}
                      iconContainerStyle={{marginRight: 10}}
                      titleStyle={{fontWeight: '700'}}
                      disabled={Platform.OS === 'android' ? true : false}
                      buttonStyle={{
                        backgroundColor: '#000000',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 10,
                        height: 48,
                      }}
                      containerStyle={{
                        width: '94%',
                        marginHorizontal: '3%',
                        marginVertical: 1,
                      }}
                      onPress={this.onAppleButtonPress}
                    />
                  </VStack>
                </View>

                <View style={{marginTop: '7%'}}>
                  <VStack>
                    <Button
                      containerStyle={{
                        width: '94%',
                        marginHorizontal: 10,
                        marginVertical: 1,
                      }}
                      title="Sign up with email"
                      type="clear"
                      titleStyle={{color: '#343434', fontWeight: 'bold'}}
                      onPress={this.SignUp}
                    />

                    <Button
                      containerStyle={{
                        width: '94%',
                        marginHorizontal: 10,
                        marginVertical: Platform.OS === 'ios' ? '5%' : '2%',
                      }}
                      title="Already have an account? Login"
                      type="clear"
                      titleStyle={{color: '#343434', fontWeight: 'bold'}}
                      onPress={this.Login}
                    />
                  </VStack>
                </View>
              </View>
            ) : (
              ''
            )}
          </View>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
   // left: '15%',
    marginTop: Platform.OS === 'ios' ? '8%' : '10%',
    width: '100%',
    height: 300,
    paddingBottom:'100%'
  },
});

export default App;