import React, {useState, useCallback, useRef} from 'react';
import {
  Button,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Vimeo} from 'react-native-vimeo-iframe';
import Menu from './menu.js';
import Home from './home.js';
import Sleep from './sleep.js';
import Favourite from './favourite.js';
import Meditation from './simple_sleep_journey.js';
import Relax from './sleep_and_recharge.js';
import {WebView} from 'react-native-webview';
import Video from 'react-native-video';
import {Spinner} from 'react-native-ios-kit';

import moment from 'moment';
import momenttimezone from 'moment-timezone';
momenttimezone.tz.setDefault('America/Los_Angeles');
const {width, height} = Dimensions.get('window');
const OutHeart = 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png';
const Heart = 'https://cdn-icons-png.flaticon.com/512/833/833472.png';
const videoStyle = {
  position: 'absolute',
  top: 0,
  left: '2%',
  // bottom: 0,
  right: 0,
  height: 250,
};

const viewStyle = {height: 250};
class App extends React.Component {
  state = {
    status: 0,
    Video: false,
    Main: false,
    VimeoId: '',
    back: 'videoplayer',
    VideoData: {},
    heart: OutHeart,
    Tittle: '',
    data: [],
    Email: this.props.data.User,
    MilliSeconds: '',
    isLoading: '',
  };
  componentDidMount = () => {
    this.Video();
    //set video link
     var match = /vimeo.*\/(\d+)/i.exec(this.props.data.Link);
     this.setState({VimeoId: match[1], Tittle: this.props.data.Tittle});
    

    firestore()
      .collection('Favourite')
      .where('Link', '==', this.props.data.Link)
      .where('Email', '==', this.props.data.User)
      .get()

      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
          console.log(data);

          this.setState({heart: Heart});
        });
      });
   
  };

 
  Menu = () => {
    let data = {
      Link: this.props.data.Link,
      back: 'videoplayer',
      Tittle: this.state.Tittle,
      User: this.props.data.User,
    };
    this.setState({status: 'menu', VideoData: data});
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

  Video = () => {
    //capture video details
   // console.log('come');
    var d1 = moment();
    var d2 = moment(d1).unix();
    this.setState({Video: true});
    var today = new Date();
    var date = today.toISOString().slice(0, 10);
    var time = today.toLocaleTimeString('en-US', {hour12: false});
    //console.log('Time->' + time);
    var dateTime = date + ' ' + time;
    let data = {
      Id: this.props.data.Id,
      User: this.props.data.User,
      ContentTittle: this.props.data.Tittle,
      ContentType: 'Video',
      DateTime: dateTime,
      MilliSeconds: d2,
    };
    const users = firestore()
      .collection('Video')
      .add(data)

      .then(() => {
        console.log('added!');
        firestore()
          .collection('Sleep')
          .where('Email', '==', this.props.data.User)
          .limit(1)
          .get()
          .then(query => {
            const thing = query.docs[0];
            console.log(thing.data());
            let tmp = thing.data();
            tmp.viewCount = tmp.viewCount + 1;
            thing.ref.update(tmp);
          });
      });
  };

  Main = () => {
    this.setState({Video: false});
  };

  Heart = async () => {
    //add favourite
    this.setState({heart: Heart});
    let flag = 0;
    await firestore()
      .collection('Favourite')
      .where('Link', '==', this.props.data.Link)
      .where('Email', '==', this.props.data.User)
      .get()

      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          let data = snapshot.data();
         // console.log('data->' + data);
          flag = 1;
          querySnapshot.forEach(function (data) {
            data.ref.delete();
          });
          this.setState({heart: OutHeart});
        });
      });

    if (flag === 0) {
      console.log('come');
      let data1 = {
        Email: this.props.data.User,
        Link: this.props.data.Link,
        Tittle: this.props.data.Tittle,
        Duration: this.props.data.Duration,
        Type: this.props.data.Type,
        Thumbnail: this.props.data.Thumbnail,
        VideoDescription:this.props.data.VideoDescription
      };
    //  console.log('data1 ->' + data1.Email);

      const users = firestore()
        .collection('Favourite')
        .add(data1)

        .then(() => {
          console.log('Favourite added!');
        });
    }
  };

  render() {
    console.disableYellowBox = true;
    //console.log('Video-->' + this.props.data.User);

    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'favourite' ? (
          <Favourite data={this.props.Email} />
        ) : this.state.status === 'meditation' ? (
          <Meditation data={this.props.data} />
        ) : this.state.status === 'sleep' ? (
          <Sleep data={this.props.data} />
        ) : this.state.status === 'relax' ? (
          <Relax data={this.props.data} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data.User} />
        ) : (
          <View
            style={{backgroundColor: '#FAFAFA', width: width, height: height}}>
            <View
              style={{
                flexDirection: 'row',
                height: 60,

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
                  marginLeft: '4%',
                  fontWeight: 'bold',
                  fontSize: 25,
                }}>
                Now Playing
              </Text>
              {/* <TouchableOpacity
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
                  style={{width: 25, height: 25, color: '#343434'}}
                />
              </TouchableOpacity> */}
            </View>
            {/* <TouchableOpacity onPress={this.Video}>
              <View style={styles.playing}>
                <Vimeo
                  style={{marginTop: '1%', left: '2%'}}
                  onPress={this.Video}
                  //ref="video"
                  videoId={this.state.VimeoId} // Vimeo video ID
                  //  onReady={  console.log('Video is ready') }
                  //onPlay={  console.log('Video is playing') }
                  // onPlayProgress={console.log('Video progress data:', data)}
                  // onFinish={console.log('Video is finished')}
                  playInBackground={true}
                  Playback={true}
                  controls={true}
                  playWhenInactive={true}
                  fullscreen={true}
                  muted={false}
                  ignoreSilentSwitch="obey"
                  resizeMode="cover"
                  paused={false}
                  allow="autoplay"
                />

                <WebView
                  style={{marginTop: '1%', left: '2%'}}
                  // javaScriptEnabled={true}
                  //  allowsFullscreenVideo

                  originWhitelist={['*']}
                  source={{
                    html: `<iframe src="https://player.vimeo.com/video/${this.state.VimeoId}" width="100%" height="100%"   autoplay=1&amp; fullscreen="allowfullscreen" frameBorder="0" type="video/mp4" ></iframe>`,
                  }}
                /> 
                 <WebView
                  style={{marginTop: '1%', left: '2%'}}
                  // javaScriptEnabled={true}
                  //  allowsFullscreenVideo

                  originWhitelist={['*']}
                  source={{
                    html: `<iframe src="https://player.vimeo.com/video/${this.state.VimeoId}"
                    allowfullscreen=""
                    allow="encrypted-media"
                    width="960" height="540"></iframe>`,
                  }}
                />
              </View>
            </TouchableOpacity> */}
            {this.state.isLoading === true ? (
              <Spinner
                animating={this.state.loading}
                size="large"
                theme={{primaryColor: '#D0942A'}}
              />
            ) : (
              <>
                <TouchableOpacity onPress={this.Video}>
                  <View style={styles.playing}>
                    {/* <Video
                      source={{
                        uri: this.props.data.Link,
                        // uri:'https://player.vimeo.com/progressive_redirect/playback/779140364/rendition/720p/file.mp4?loc=external&signature=0a415e3569a061f2829d58e519fe5b943666b2f3cd2db25b667deb0e6b4bec63'
                      }}
                      style={videoStyle}
                      controls={true}
                      resizeMode="cover"
                      hideShutterView={true}
                      //paused={true}
                      playInBackground={true}
                      playWhenInactive={true}

                      fullscreen={true}
                      resizeMode="cover"
                      disableFocus={true}
                      audioOnly={true}
                      preventsDisplaySleepDuringVideoPlayback={false}
                      pictureInPicture={true}
                      ignoreSilentSwitch={'ignore'}

                    /> */}
                    <Vimeo
                  style={{marginTop: '1%', left: '2%'}}
                  onPress={this.Video}
                  //ref="video"
                  videoId={this.state.VimeoId} // Vimeo video ID
                  //  onReady={  console.log('Video is ready') }
                  //onPlay={  console.log('Video is playing') }
                  // onPlayProgress={console.log('Video progress data:', data)}
                  // onFinish={console.log('Video is finished')}
                  playInBackground={true}
                  Playback={true}
                  controls={true}
                  playWhenInactive={true}
                  fullscreen={true}
                  muted={false}
                  ignoreSilentSwitch="obey"
                  resizeMode="cover"
                  paused={false}
                  allow="autoplay"
                />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: Platform.OS === 'android' ? '-35%' : '-45%',
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      left: 10,
                      fontWeight: 'bold',
                      color: '#343434',
                      width: '83%',
                    }}>
                    {this.props.data.Tittle}
                  </Text>
                  <TouchableOpacity onPress={this.Heart}>
                    <Image
                      source={{uri: this.state.heart}}
                      style={{
                        width: 25,
                        height: 25,
                        display: 'flex',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      left: '3%',
                      color: '#343434',
                      marginTop: '7%',
                      fontSize: 13,
                      width: '95%',
                      paddingRight:'3%'
                    }}>
                    {/* This audio explains the power of meditations and benifits in
                    life */}
                     {this.props.data.VideoDescription}
                  </Text>
                </View>
                <View style={{marginTop: '8%'}}>
                  <Text style={{left: '4%', color: '#343434'}}>
                    Rate the content
                  </Text>
                </View>
                <View style={{left: '20%', marginTop: '-7%'}}>
                  <AirbnbRating
                    // reviews={['1/5', '2/5', '3/5', '4/5', '5/5']}
                    defaultRating={0}
                    size={30}
                    onFinishRating={this.ratingCompleted}
                    showRating={false}
                  />
                </View>
              </>
            )}
            <View style={styles.bottomContainer}>
              <View style={styles.bottomControls}>
                <TouchableOpacity onPress={this.Favourite}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/ios-filled/344/hearts.png',
                    }}
                    style={{width: 30, height: 30, left: 17, color: '#343434'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.Home}>
                  <Image
                    source={{
                      uri: 'https://img.icons8.com/material-rounded/344/home-page.png',
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      paddingLeft: 19,
                      color: '#343434',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.Sleep}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/835/835503.png',
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      paddingLeft: 19,
                      color: '#343434',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  bottomContainer: {
    borderTopColor: '#F2F1EE',
    borderTopWidth: 2,
    width: width,
    alignItems: 'center',
    paddingVertical: 25,
    position: 'absolute',
    backgroundColor: 'rgba( 255, 255, 255, 1 )',
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  playing: {
    width: '97.5%',
    height: '55%',
    //marginBottom:140,
    //marginTop:-5,
    elevation: 5,
  },
});
export default App;