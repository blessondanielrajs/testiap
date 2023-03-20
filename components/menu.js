import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Home from './home.js';
import Sleep from './sleep.js';
import Favourite from './favourite.js';
import Meditation from './simple_sleep_journey.js';
import Relax from './sleep_and_recharge.js';
import Refer from './refer.js';
import Rating from './rating.js';
import MusicPlayer from './musicplayer.js';
import VideoPlayer from './videoplayer.js';
import SplashScreen from './SplashScreen.js';
import Subscription from './subscription.js';
import SubscriptionDetails from './SubscriptionDetails.js';
import FeedBack from './feedback.js';
import Profile from './Profile.js';
import SimpleSleepJourney from './simple_sleep_journey.js';
import SleepandRecharge from './sleep_and_recharge.js';
import SleepandRediscoveryou from './Sleep_and_Rediscover_you.js';
import FitBit from './fitbit.js';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import {Button} from '@rneui/themed';


import {Text, VStack, Divider} from '@react-native-material/core';
import {Colors} from 'react-native-ios-kit';
const {width, height} = Dimensions.get('window');
class App extends React.Component {
  state = {
    status: 0,
    Email: this.props.data.Email,
    UniqueId: '',
  };

  componentDidMount = () => {
    console.log(DeviceInfo.getUniqueId());
    this.setState({UniqueId: DeviceInfo.getUniqueId()});
  };

  Profile = () => {
    this.setState({status: 'profile'});
  };

  Home = () => {
    this.setState({status: 'home'});
  };

  Sleep = () => {
    this.setState({status: 'sleep'});
  };

  Learn = () => {
    this.setState({status: 'learn'});
  };

  Favourite = () => {
    this.setState({status: 'favourite'});
  };

  Meditation = () => {
    this.setState({status: 'meditation'});
  };

  Relax = () => {
    this.setState({status: 'relax'});
  };

  Rating = () => {
    this.setState({status: 'rateus'});
  };

  Feedback = () => {
    console.log('come');
    this.setState({status: 'feedback'});
  };

  Subscription = () => {
    console.log('come');
    this.setState({status: 'subscription'});
  };

  SubscriptionDetails = () => {
    this.setState({status: 'SubscriptionDetails'});
  };

  SimpleSleepJourney = () => {
    this.setState({status: 'SimpleSleepJourney'});
  };

  SleepandRecharge = () => {
    this.setState({status: 'SleepandRecharge'});
  };

  SleepandRediscoveryou = () => {
    this.setState({status: 'SleepandRediscoveryou'});
  };

  Refer = () => {
    this.setState({status: 'refer'});
  };

  Music = () => {
    this.setState({status: 'music'});
  };

  VideoPlayer = () => {
    this.setState({status: 'video'});
  };

  FitBit = () => {
    this.setState({status: 'fitbit'});
  };

  LogOut = async () => {
   // console.log('UniqueId-->' + this.state.UniqueId);
    await firestore()
      .collection('Sleep')
      .where('UniqueId', '==', this.state.UniqueId)
      .limit(1)
      .get()
      .then(query => {
        // console.log(query);
        const thing = query.docs[0];
        console.log(thing.data());
        let tmp = thing.data();
        tmp.switch = 'logout';
        console.log(tmp);
        thing.ref.update(tmp);
      });

    this.setState({status: 'splashScreen'});
  };

  render() {
    //console.log('this.props.data->' + this.props.data.back);
    return (
      <>
        {this.state.status === 'home' ? (
          <Home data={this.state.Email} />
        ) : this.state.status === 'profile' ? (
          <Profile data={this.state.Email} />
        ) : this.state.status === 'favourite' ? (
          <Favourite data={this.state.Email} />
        ) : this.state.status === 'meditation' ? (
          <Meditation data={this.state.Email} />
        ) : this.state.status === 'sleep' ? (
          <Sleep data={this.state.Email} />
        ) : this.state.status === 'relax' ? (
          <Relax data={this.state.Email} />
          ) : this.state.status === 'video' ? (
            <VideoPlayer data={this.state.Email} />
        ) : this.state.status === 'rateus' ? (
          <Rating data={this.state.Email} />
        ) : this.state.status === 'refer' ? (
          <Refer data={this.state.Email} />
        ) : this.state.status === 'feedback' ? (
          <FeedBack data={this.state.Email} />
        ) : this.state.status === 'subscription' ? (
          <Subscription data={this.state.Email} />
          ) : this.state.status === 'fitbit' ? (
            <FitBit data={this.state.Email} />
        ) : // ) : this.state.status === 'subscriptionDetails' ? (
        //   <SubscriptionDetails data={this.state.Email} />
        // ) : this.state.status === 'SimpleSleepJourney' ? (
        //   <SimpleSleepJourney data={this.state.Email} />
        // ) : this.state.status === 'SleepandRecharge' ? (
        //   <SleepandRecharge data={this.state.Email} />
        // ) : this.state.status === 'SleepandRediscoveryou' ? (
        //   <SleepandRediscoveryou data={this.state.Email} />
        this.state.status === 'music' ? (
          <MusicPlayer data={this.state.Email} />
        ) : this.state.status === 'splashScreen' ? (
          <SplashScreen />
        ) : this.state.status === 'video' ? (
          <VideoPlayer
            data={this.props.data.VideoData}
            Email={this.state.Email}
          />
        ) : (
          <View style={{width: 400}}>
            <View style={{backgroundColor: '#FAFAFA', height: height}}>
              <VStack
                m={6}
                spacing={1}
                divider={true}
                style={{marginTop: Platform.OS === 'ios' ? 60 : 30}}>
                <TouchableOpacity
                  //   style={{marginLeft:1,alignContent:'center',alignSelf:'center'}}
                  onPress={
                    this.props.data.back === 'home'
                      ? this.Home
                      : this.props.data.back === 'music'
                      ? this.Music
                      : this.props.data.back === 'profile'
                      ? this.Profile
                      : this.props.data.back === 'rating'
                      ? this.Rating
                      : this.props.data.back === 'refer'
                      ? this.Refer
                      : this.props.data.back === 'favourite'
                      ? this.Favourite
                      : this.props.data.back === 'sleep'
                      ? this.Sleep
                      : this.props.data.back === 'meditation'
                      ? this.Meditation
                      : this.props.data.back === 'relax'
                      ? this.Relax
                      : this.props.data.back === 'videoplayer'
                      ? this.VideoPlayer
                      : this.props.data.back === 'learn'
                      ? this.Learn
                      : this.props.data.back === 'feedback'
                      ? this.Feedback
                      : this.props.data.back === 'subscription'
                      ? this.Subscription
                      : this.props.data.back === 'subscriptionDetails'
                      ? this.SubscriptionDetails
                      : this.props.data.back === 'SimpleSleepJourney'
                      ? this.SimpleSleepJourney
                      : this.props.data.back === 'SleepandRecharge'
                      ? this.SleepandRecharge
                      : this.props.data.back === 'SleepandRediscoveryou'
                      ? this.SleepandRediscoveryou
                      : ''
                  }>
                  <Text
                    style={{
                      left: '80%',
                      fontSize: Platform.OS === 'ios' ? 30 : 20,
                      color: '#343434',
                    }}>
                    ✖️
                  </Text>
                </TouchableOpacity>
              </VStack>
              <VStack m={4} spacing={20} divider={true} style={{margin: 30}}>
                <Button
                  variant="text"
                  title={
                    <Text style={{left: -110, color: '#343434'}}>Profile</Text>
                  }
                  uppercase={false}
                  onPress={this.Profile}
                  type="clear"
                />
                <Button
                  variant="text"
                  title={
                    <Text style={{left: -90, color: '#343434'}}>
                      Subscription
                    </Text>
                  }
                  uppercase={false}
                  onPress={this.Subscription}
                  type="clear"
                />
                <Button
                  variant="text"
                  title={
                    <Text style={{left: -110, color: '#343434'}}>Favorite</Text>
                  }
                  uppercase={false}
                  onPress={this.Favourite}
                  type="clear"
                />
                <Button
                  variant="text"
                  title={
                    <Text style={{left: -120, color: '#343434'}}>Sleep</Text>
                  }
                  uppercase={false}
                  onPress={this.Sleep}
                  type="clear"
                />

                <Button
                  variant="text"
                  title={
                    <Text style={{left: -110, color: '#343434'}}>Rate Us</Text>
                  }
                  uppercase={false}
                  onPress={this.Rating}
                  type="clear"
                />
                <Button
                  variant="text"
                  title={
                    <Text style={{left: -105, color: '#343434'}}>Feedback</Text>
                  }
                  uppercase={false}
                  onPress={this.Feedback}
                  type="clear"
                />
                 {/* <Button
                  variant="text"
                  title={
                    <Text style={{left: -122, color: '#343434'}}>fitbit</Text>
                  }
                  uppercase={false}
                  onPress={this.FitBit}
                  type="clear"
                /> */}
                <Button
                  type="clear"
                  variant="text"
                  title={
                    <Text style={{left: -110, color: '#343434'}}>Log Out</Text>
                   
                  }
                  uppercase={false}
                  onPress={this.LogOut}
                />
               
              </VStack>
            </View>
          </View>
        )}
      </>
    );
  }
}

export default App;