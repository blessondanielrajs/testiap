import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  StatusBar,
  AsyncStorage
} from 'react-native';
import {HStack, VStack, Box} from '@react-native-material/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from './menu.js';
import VideoPlayer from './videoplayer.js';
import Home from './home.js';
import Sleep from './sleep.js';
import Favourite from './favourite.js';
import SimpleSleepJourney from './simple_sleep_journey.js';
import SleepandRecharge from './sleep_and_recharge.js';
import SleepandRediscoveryou from './Sleep_and_Rediscover_you.js';
import firestore from '@react-native-firebase/firestore';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import ModalSelector from 'react-native-modal-selector';
import {Spinner} from 'react-native-ios-kit';
import {Platform} from 'react-native';
import ImageBlurLoading from 'react-native-image-blur-loading';

const {width, height} = Dimensions.get('window');
class App extends React.Component {
  state = {
    status: '',
    back: 'home',
    Email: this.props.data,
    Language: '',
    SimpleSleepJourney_data: [],
    SleepandRecharge_data: [],
    SleepandRediscoveryou_data: [],
    VideoData: {},
    isLoading: '',
    videoSimpleSleepJourney: [],
    videoSleepandRecharge: [],
    videoSleepandRediscoveryou: [],
    
  };
  //Redirect menu page
  Menu = () => {
    this.setState({status: 'menu'});
  };

  Music = () => {
    this.setState({status: 'music'});
  };
  //Video trigger
  Video = item => {
    console.log(item);
    let data = {
      User: this.props.data,
      Link: item.Link,
      Tittle: item.Tittle,
      Id: item.Id,
      Duration: item.Duration,
      Type: item.Type,
      Thumbnail: item.Thumbnail,
      VideoDescription:item.VideoDescription,
    };
    this.setState({status: 'video', VideoData: data});
  };

  // Language = e => {
  //   console.log(e);
  // };
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

  SimpleSleepJourney = async () => {
    this.setState({status: 'SimpleSleepJourney'});
    var data2 = [];
    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Simple Sleep Journey')
      .where('Language', '==', this.state.Language)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        data1 = {
          User: this.props.data,
          Tittle: data.VideoTittle,
          Link: data.VideoLink,
          Id: snapshot.id,
          Duration: data.Duration,
          Type: data.Type,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data2.push(data1);
      });
      this.setState({videoSimpleSleepJourney: data2});
    });
  };

  SleepandRecharge = async () => {
    this.setState({status: 'SleepandRecharge'});
    var data2 = [];
    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Sleep and Recharge')
      .where('Language', '==', this.state.Language)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        data1 = {
          User: this.props.data,
          Tittle: data.VideoTittle,
          Link: data.VideoLink,
          Id: snapshot.id,
          Duration: data.Duration,
          Type: data.Type,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data2.push(data1);
      });
      this.setState({videoSleepandRecharge: data2});
    });
  };

  SleepandRediscoveryou = async () => {
    this.setState({status: 'SleepandRediscoveryou'});
    var data2 = [];
    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Sleep and Rediscover you')
      .where('Language', '==', this.state.Language)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        data1 = {
          User: this.props.data,
          Tittle: data.VideoTittle,
          Link: data.VideoLink,
          Id: snapshot.id,
          Duration: data.Duration,
          Type: data.Type,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data2.push(data1);
      });
      this.setState({videoSleepandRediscoveryou: data2});
    });
  };

  componentDidMount = async () => {
   console.log(this.props.data)
    var doc = firestore()
      .collection('Sleep')
      .where('Email', '==', this.props.data)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
      });
      this.setState({Language: data.Language});
    });

    var data1 = [];
    var data2 = [];
    var data3 = [];

    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Simple Sleep Journey')
      .where('Language', '==', this.state.Language)
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        Data1 = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data1.push(Data1);
      });
      this.setState({SimpleSleepJourney_data: data1});
    });

    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Sleep and Recharge')
      .where('Language', '==', this.state.Language)
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        Data2 = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data2.push(Data2);
      });
     // console.log(data2);
      this.setState({SleepandRecharge_data: data2});
    });

    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Sleep and Rediscover you')
      .where('Language', '==', this.state.Language)
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
      //  console.log(data);
        Data3 = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data3.push(Data3);
      });
      this.setState({SleepandRediscoveryou_data: data3});
     // console.log(data3);
    });
  };

  trigger = async e => {
    this.setState({isLoading: 'trigger'});
  //  console.log(e);
    var data1 = [];
    var data2 = [];
    var data3 = [];

    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Simple Sleep Journey')
      .where('Language', '==', e)
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        Data1 = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data1.push(Data1);
      });
      this.setState({SimpleSleepJourney_data: data1});
    });

    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Sleep and Recharge')
      .where('Language', '==', e)
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
       // console.log(data);
        Data2 = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data2.push(Data2);
      });
     // console.log(data2);
      this.setState({SleepandRecharge_data: data2});
    });

    var doc = firestore()
      .collection('Vimeo')
      .where('Category', '==', 'Sleep and Rediscover you')
      .where('Language', '==', e)
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
      //  console.log(data);
        Data3 = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail: data.Thumbnail,
          VideoDescription:data.VideoDescription
        };
        data3.push(Data3);
      });
      this.setState({SleepandRediscoveryou_data: data3});
     // console.log(data3);
      this.setState({isLoading: false});
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
          tmp.Language = e;
         // console.log(tmp);
          thing.ref.update(tmp);
        });
    });
  };

  render() {
    let index = 0;
    const data = [
      {
        key: index++,
        label: 'ENGLISH',
        component: (
          <Text
            style={{color: '#343434', textAlign: 'center', fontWeight: '500'}}
            value="ENGLISH">
            ENGLISH
          </Text>
        ),
      },
      {
        key: index++,
        label: 'VIETNAMESE',
        component: (
          <Text
            style={{color: '#343434', textAlign: 'center', fontWeight: '500'}}
            value="VIETNAMESE">
            VIETNAMESE
          </Text>
        ),
      },
    ];

    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'SleepandRediscoveryou' ? (
          <SleepandRediscoveryou
            data={this.props.data}
            video={this.state.videoSleepandRediscoveryou}
          />
        ) : this.state.status === 'video' ? (
          <VideoPlayer data={this.state.VideoData} Email={this.state.Email} />
        ) : this.state.status === 'favourite' ? (
          <Favourite data={this.props.data} />
        ) : this.state.status === 'SimpleSleepJourney' ? (
          <SimpleSleepJourney
            data={this.props.data}
            video={this.state.videoSimpleSleepJourney}
          />
        ) : this.state.status === 'sleep' ? (
          <Sleep data={this.props.data} Language={this.state.Language} />
        ) : // ) : this.state.status === 'learn' ? (
        //   <Learn data={this.props.data} />
        this.state.status === 'SleepandRecharge' ? (
          <SleepandRecharge
            data={this.props.data}
            video={this.state.videoSleepandRecharge}
          />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : (
          <View>
            <View
              style={{
                backgroundColor: '#FAFAFA',
                width: width,
                height: height,
              }}>
              {/* <View style={{backgroundColor:'rgba( 255, 255, 255, 1 )'}}> */}

              <View
                style={{
                  flexDirection: 'row',
                  height: 60,
                  // backgroundColor:'rgba( 255, 255, 255, 1 )',
                  marginTop: Platform.OS === 'ios' ? '10%' : '1%',
                }}>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
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
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Welcome
                </Text>
              </View>
              <ScrollView>
                <Text
                  style={{
                    color: '#343434',
                    // alignContent: 'center',
                    // alignSelf: 'center',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Sleep
                </Text>
                <HStack m={13} spacing={1}>
                  <View
                    style={{
                      width: 70,
                      height: 40,
                      left: '14%',
                      alignContent: 'center',

                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#343434',
                        left: -30,
                        marginTop: 8,
                        left: -40,
                      }}>
                      Language
                    </Text>

                    <ModalSelector
                      data={data}
                      supportedOrientations={['portrait', 'landscape']}
                      accessible={true}
                      scrollViewAccessibilityLabel={'Scrollable options'}
                      animationType={'none'}
                      cancelButtonAccessibilityLabel={'Cancel Button'}
                      cancelContainerStyle={{backgroundColor: 'white'}}
                      optionContainerStyle={{backgroundColor: 'white'}}
                      cancelText	={<Text
                        style={{color: '#343434', textAlign: 'center', fontWeight: '400',fontSize:14}}
                         >
                       CANCEL
                      </Text>}
                      onChange={option => {
                        this.setState({imageShow: true});

                        this.setState({Language: option.label});

                        this.trigger(option.label);
                        setInterval(() => {
                          this.setState({imageShow: false});
                        }, 3000);
                      }}>
                      <TextInput
                        style={{
                          width: 240,
                          backgroundColor: '#FFFFFF',
                          borderWidth: 1,
                          // borderColor: '#FFFFFF',
                          left: -20,
                          height: Platform.OS === 'ios' ? 30 : 36,
                          borderRadius: 12,
                          color: '#343434',
                        }}
                        editable={true}
                        value={'      ' + this.state.Language}
                      />
                    </ModalSelector>
                  </View>
                </HStack>
                {/* </View> */}
                {/* {this.state.isLoading && (
                  <View
                    style={{
                      backgroundColor: '#FAFAFA',
                      width: width,
                      height: height,
                    }}>
                    <Spinner
                      animating={this.state.loading}
                      size="large"
                      theme={{primaryColor: '#D0942A'}}
                    />
                  </View>
                )} */}

                <VStack m={4} spacing={1} divider={false}>
                  <TouchableOpacity>
                    <Box h={40}></Box>
                  </TouchableOpacity>
                </VStack>
                {this.state.isLoading === true ||
                this.state.isLoading === 'trigger' ? (
                  <Spinner
                    animating={this.state.loading}
                    size="large"
                    theme={{primaryColor: '#D0942A'}}
                  />
                ) : (
                  <>
                    {this.state.SimpleSleepJourney_data.length ? (
                      <Text
                        style={{
                          color: '#343434',
                          marginLeft: 20,
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: -40,
                          width: width,
                        }}>
                        Simple Sleep Journey{' '}
                        <TouchableOpacity onPress={this.SimpleSleepJourney}>
                          <Text
                            style={{
                              left: Platform.OS === 'ios' ? '180%' : 60,
                              color: '#343434',
                            }}>
                            See All
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    ) : (
                      ''
                    )}

                    <FlatGrid
                      itemDimension={130}
                      data={this.state.SimpleSleepJourney_data}
                      style={styles.gridView}
                      spacing={20}
                      renderItem={({item}) => (
                        <View style={[styles.itemContainer]}>
                          <View
                            style={{
                              width: '100%',
                              height: '120%',
                              borderRadius: 14,
                              // backgroundColor:'black'
                            }}>
                            <TouchableOpacity
                              onPress={this.Video.bind(this, item)}>
                              {/* <Image
                                source={
                                  this.state.imageShow === true
                                    ? require('../Images/test.jpeg')
                                    : {uri: item.Thumbnail}
                                }
                                style={styles.image}></Image> */}
                              <ImageBlurLoading
                                thumbnailSource={{
                                  uri: 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png',
                                }}
                                source={{uri: item.Thumbnail}}
                                style={styles.image}
                              />

                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 13,
                                  marginTop: 10,
                                  color: '#343434',
                                }}>
                                {item.Tittle} {'\n'}
                                <Ionicons name="ios-volume-medium-sharp"></Ionicons>{' '}
                                {item.Type} .{item.Duration}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                    {this.state.SleepandRecharge_data.length ? (
                      <Text
                        style={{
                          color: '#343434',
                          marginLeft: 20,
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: '-5%',
                        }}>
                        Sleep and Recharge
                        <TouchableOpacity onPress={this.SleepandRecharge}>
                          <Text
                            style={{
                              left: Platform.OS === 'ios' ? '230%' : 80,
                              color: '#343434',
                            }}>
                            See All
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    ) : (
                      ''
                    )}

                    <FlatGrid
                      itemDimension={130}
                      data={this.state.SleepandRecharge_data}
                      style={styles.gridView}
                      spacing={20}
                      renderItem={({item}) => (
                        <View style={[styles.itemContainer]}>
                          <View
                            style={{
                              width: '100%',
                              height: '120%',
                              borderRadius: 14,
                              // backgroundColor:'black'
                            }}>
                            <TouchableOpacity
                              onPress={this.Video.bind(this, item)}>
                              {/* <Image
                                source={
                                  this.state.imageShow === true
                                    ? require('../Images/test.jpeg')
                                    : {uri: item.Thumbnail}
                                }
                                style={styles.image}></Image> */}
                              <ImageBlurLoading
                                thumbnailSource={{
                                  uri: 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png',
                                }}
                                source={{uri: item.Thumbnail}}
                                style={styles.image}
                              />
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 13,
                                  marginTop: 10,
                                  color: '#343434',
                                }}>
                                {item.Tittle} {'\n'}
                                <Ionicons name="ios-volume-medium-sharp"></Ionicons>{' '}
                                {item.Type} .{item.Duration}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                    {this.state.SleepandRediscoveryou_data.length ? (
                      <Text
                        style={{
                          color: '#343434',
                          marginLeft: 20,
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginTop: '-5%',
                        }}>
                        Sleep and Rediscover you
                        <TouchableOpacity onPress={this.SleepandRediscoveryou}>
                          <Text
                            style={{
                              left: Platform.OS === 'ios' ? '110%' : 30,
                              color: '#343434',
                            }}>
                            See All
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    ) : (
                      ''
                    )}

                    <FlatGrid
                      itemDimension={130}
                      data={this.state.SleepandRediscoveryou_data}
                      style={styles.gridView}
                      spacing={20}
                      renderItem={({item}) => (
                        <View style={[styles.itemContainer]}>
                          <View
                            style={{
                              width: '100%',
                              height: '120%',
                              borderRadius: 14,
                            }}>
                            <TouchableOpacity
                              onPress={this.Video.bind(this, item)}>
                              {/* <Image
                                source={
                                  this.state.imageShow === true
                                    ? require('../Images/test.jpeg')
                                    : {uri: item.Thumbnail}
                                }
                                style={styles.image}></Image> */}
                              <ImageBlurLoading
                                thumbnailSource={{
                                  uri: 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png',
                                }}
                                source={{uri: item.Thumbnail}}
                                style={styles.image}
                              />
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 13,
                                  marginTop: 10,
                                  color: '#343434',
                                }}>
                                {item.Tittle} {'\n'}
                                <Ionicons name="ios-volume-medium-sharp"></Ionicons>{' '}
                                {item.Type} .{item.Duration}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    />
                  </>
                )}
                <VStack m={4} spacing={1} divider={false}>
                  <TouchableOpacity>
                    <Box h={40}></Box>
                  </TouchableOpacity>
                </VStack>

                <VStack m={4} spacing={1} divider={false}>
                  <TouchableOpacity>
                    <Box h={20}></Box>
                  </TouchableOpacity>
                </VStack>
              </ScrollView>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomControls}>
                  <TouchableOpacity onPress={this.Favourite}>
                    <Image
                      source={{
                        uri: 'https://img.icons8.com/ios-filled/344/hearts.png',
                      }}
                      style={{
                        width: 30,
                        height: 30,
                        left: 17,
                        color: '#343434',
                      }}
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
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },

  bottomContainer: {
    // borderTopColor: '#F2F1EE',
    // borderTopWidth:2 ,
    // width: width,
    // alignItems: 'center',
    // paddingVertical: 14,
    // position: 'absolute',
    // backgroundColor: 'rgba( 255, 255, 255, 1 )',
    // left: 0,
    // bottom: -10,
    // right: 0,
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

  gridView: {
    marginTop: '1%',
    flex: 1,
  },
  itemContainer: {
    // justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
});

export default App;