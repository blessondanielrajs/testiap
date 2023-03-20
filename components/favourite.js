import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Text,
  ScrollView,
  Platform,
  AsyncStorage,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import VideoPlayer from './videoplayer.js';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';
import {VStack, Box} from '@react-native-material/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from './menu.js';
import Home from './home.js';
import Sleep from './sleep.js';
import Favourite from './favourite.js';
import Meditation from './simple_sleep_journey.js';
import Relax from './sleep_and_recharge.js';
import ImageBlurLoading from 'react-native-image-blur-loading';
const OutHeart = 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png';
const Heart = 'https://cdn-icons-png.flaticon.com/512/833/833472.png';
//var data=[];
const {width, height} = Dimensions.get('window');
class App extends React.Component {
  state = {
    status: 0,
    back: 'favourite',
    heart: false,
    Email: this.props.data,
    data: [],
    VideoData: {},
  };

  componentDidMount = async () => {
    // try {
    //   await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    // } catch (error) {
    //   // Error saving data
    // }

    // try {
    //   const value = await AsyncStorage.getItem('@MySuperStore:key');
    //   if (value !== null) {
    //     // We have data!!
    //     console.log(value);
    //   }else{
    //     console.log("jwhsj")
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

    //   try {
    //     await AsyncStorage.removeItem('data');
    //     return true;
    // }
    // catch(exception) {
    //     return false;
    // }

    // try {
    //   const value = await AsyncStorage.getItem('data')
    //     .then(JSON.parse)
    //     .then(value => {
    //       console.log(value); // Foo
    //     });
    //   if (value !== null) {
    //     // We have data!!
    //    // console.log(value);
    //     //this.setState({data: value});
    //   } else {
    //     var data2 = [];
    //     var doc = firestore()
    //       .collection('Favourite')
    //       .where('Email', '==', this.props.data)
    //       .get();
    //     await doc.then(querySnapshot => {
    //       querySnapshot.forEach(snapshot => {
    //         data = snapshot.data();
    //         console.log(data.Thumbnail);
    //         data1 = {
    //           User: this.props.data,
    //           Tittle: data.Tittle,
    //           Link: data.Link,
    //           Id: snapshot.id,
    //           Duration: data.Duration,
    //           Type: data.Type,
    //           Thumbnail: data.Thumbnail,
    //         };
    //         data2.push(data1);
    //       });
    //       this.setState({data: data2});
    //       try {
    //         AsyncStorage.setItem('data', JSON.stringify(data));
    //       } catch (error) {
    //         // Error saving data
    //       }
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // var data2 = [];
    // var doc = firestore()
    //   .collection('Favourite')
    //   .where('Email', '==', this.props.data)
    //   .get();
    // await doc.then(querySnapshot => {
    //   querySnapshot.forEach(snapshot => {
    //     data = snapshot.data();
    //     console.log(data.Thumbnail);
    //     data1 = {
    //       User: this.props.data,
    //       Tittle: data.Tittle,
    //       Link: data.Link,
    //       Id: snapshot.id,
    //       Duration: data.Duration,
    //       Type: data.Type,
    //       Thumbnail: data.Thumbnail,
    //     };
    //     data2.push(data1);
    //   });
    //   this.setState({data: data2});

    // });

    // AsyncStorage.getItem('data')
    //   .then(JSON.parse)
    //   .then(value => {
    //     if (value !== null) {
    //       data=value;
    //       // this.setState({data: value});
    //       // console.log(value[0].Thumbnail)
    //       // image=value[0].Thumbnail;
    //       console.log("come")
    //     } else {
    //       console.log("jkjhjhwd")
          var data2 = [];
          var doc = firestore()
            .collection('Favourite')
            .where('Email', '==', this.props.data)
            .get();
          doc.then(querySnapshot => {
            querySnapshot.forEach(snapshot => {
              data = snapshot.data();
              console.log(data.Thumbnail);
              data1 = {
                User: this.props.data,
                Tittle: data.Tittle,
                Link: data.Link,
                Id: snapshot.id,
                Duration: data.Duration,
                Type: data.Type,
                Thumbnail: data.Thumbnail,
                VideoDescription:data.VideoDescription
              };
              data2.push(data1);
            });
            this.setState({data: data2});
            // AsyncStorage.setItem('data', JSON.stringify(data2));
          });
      //   }
      // });
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  Heart = () => {
    this.setState({heart: true});
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

  Video = item => {
    let data = {
      User: this.props.data,
      Link: item.Link,
      Tittle: item.Tittle,
      Id: item.Id,
      Duration: item.Duration,
      Type: item.Type,
      Thumbnail: item.Thumbnail,
      VideoDescription:item.VideoDescription
    };
    this.setState({status: 'video', VideoData: data});
  };

  render() {
    //console.log('fav-->' + this.props.data);
    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'favourite' ? (
          <Favourite data={this.props.data} />
        ) : this.state.status === 'meditation' ? (
          <Meditation data={this.props.data} />
        ) : this.state.status === 'sleep' ? (
          <Sleep data={this.props.data} />
        ) : this.state.status === 'relax' ? (
          <Relax data={this.props.data} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : this.state.status === 'video' ? (
          <VideoPlayer data={this.state.VideoData} Email={this.state.Email} />
        ) : (
          <View>
            <View
              style={{
                backgroundColor: '#FAFAFA',
                width: width,
                height: height,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
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
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 25,
                  }}>
                  Favorite
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: '45%',
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
              </View>
              <ScrollView>
                <FlatGrid
                  itemDimension={130}
                  data={this.state.data}
                //data={data}
                  style={styles.gridView}
                  spacing={20}
                  renderItem={({item}) => (
                    <View style={[styles.itemContainer]}>
                      <View
                        style={{
                          width: '100%',
                          height: Platform.OS === 'ios' ? '120%' : '100%',

                          borderRadius: 14,
                        }}>
                        <TouchableOpacity onPress={this.Video.bind(this, item)}>
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

                <VStack m={4} spacing={20} divider={false} style={{margin: 15}}>
                  <TouchableOpacity>
                    <Box h={70}></Box>
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
    width: '20%',
    height: '100%',
    borderRadius: 10,
  },
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
  gridView: {
    marginTop: Platform.OS === 'ios' ? '4%' : '-2%',
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: Platform.OS === 'ios' ? 150 : 130,
  },
  image: {
    width: '100%',
    height: Platform.OS === 'ios' ? '60%' : '70%',
    borderRadius: 10,
  },
});

export default App;
