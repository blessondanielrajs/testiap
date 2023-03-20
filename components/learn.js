import React from 'react';
//import { Button ,Text} from 'react-native-elements';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import {Avatar, HStack, VStack, Box, Stack} from '@react-native-material/core';
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from './menu.js';
import MusicPlayer from './musicplayer.js';
import VideoPlayer from './videoplayer.js';
import Tabs from './Sleep_and_Rediscover_you.js';
import {NavigationContainer} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Home from './home.js';
import Sleep from './sleep.js';
import Favourite from './favourite.js';
import SimpleSleepJourney from './simple_sleep_journey.js';
import SleepandRecharge from './sleep_and_recharge.js';
import SleepandRediscoveryou from './Sleep_and_Rediscover_you.js'
import firestore from '@react-native-firebase/firestore';
import {FlatGrid, SectionGrid} from 'react-native-super-grid';

const {width, height} = Dimensions.get('window');

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

//import { Icon } from "@rneui/themed";

class App extends React.Component {
  state = {
    status: '',
    back: 'learn',
    Email: this.props.data,
    Language: '',
   data:[],
    VideoData: {},
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  Music = () => {
    this.setState({status: 'music'});
  };

  Video = item => {
    console.log(item);
    let data = {
      User: this.props.data,
      Link: item.Link,
      Tittle: item.Tittle,
      Id: item.Id,
      Duration:item.Duration,
      Type:item.Type,
      Thumbnail:item.Thumbnail
    };
    this.setState({status: 'video', VideoData: data});
  };

  Language = e => {
    this.setState({Language: e});
  };
  Home = () => {
    this.setState({status: 'home'});
  };

  Sleep = () => {
    this.setState({status: 'sleep'});
  };

  Favourite = () => {
    this.setState({status: 'favourite'});
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

  componentDidMount = async () => {
    var data1 = [];
  

    var doc = firestore()
      .collection('Vimeo')
      .where('VideoCategory', '==', 'Learn')
      .limit(4)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
        console.log(data);
        data = {
          Id: snapshot.id,
          Tittle: data.VideoTittle,
          Type: data.Type,
          Link: data.VideoLink,
          Duration: data.Duration,
          Thumbnail:data.Thumbnail
        };
        data1.push(data);
      });
      this.setState({data: data1});
    });

   
  };

  render() {
    console.log('User->' + this.props.data);
    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'SleepandRediscoveryou' ? (
          <SleepandRediscoveryou data={this.props.data} />
        ) : this.state.status === 'video' ? (
          <VideoPlayer data={this.state.VideoData} Email={this.state.Email} />
        ) : this.state.status === 'favourite' ? (
          <Favourite data={this.props.data} />
        ) : this.state.status === 'SimpleSleepJourney' ? (
          <SimpleSleepJourney data={this.props.data} />
        ) : this.state.status === 'sleep' ? (
          <Sleep data={this.props.data} />
        ) : this.state.status === 'SleepandRecharge' ? (
          <SleepandRecharge data={this.props.data} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : (
          <View>
            <View
              style={{
                backgroundColor: '#ffffff',
                height: height,
                width: width,
              }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',

                    backgroundColor: '#ffffff',
                    marginTop: '15%',
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
                      style={{width: 25, height: 25, marginLeft: 6}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      alignContent: 'center',
                      alignSelf: 'center',
                      marginLeft: 20,
                      fontWeight: 'bold',
                      fontSize: 25,
                    }}>
                   Learn
                  </Text>
                  {/* <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg"}} size={72} style={{alignSelf:'center',left:75,}}/> */}
                </View>

                {/* <Text
                  style={{
                    color: 'black',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: 20,
                  }}>
                  Simple Sleep Journey
                  <TouchableOpacity onPress={this.SimpleSleepJourney}>
                    <Text style={{left: '180%'}}>See All</Text>
                  </TouchableOpacity>
                </Text> */}

                <FlatGrid
                  itemDimension={130}
                  data={this.state.data}
                  style={styles.gridView}
                  spacing={20}
                  renderItem={({item}) => (
                    <View style={[styles.itemContainer]}>
                      <View
                        style={{
                          width: '100%',
                          height: '120%',
                          backgroundColor: '#FFFFFF',
                          // borderWidth: 1,
                          borderRadius: 14,
                        }}>
                        <TouchableOpacity onPress={this.Video.bind(this, item)}>
                          <Image
                            source={{uri:item.Thumbnail}}
                            style={styles.image}></Image>
                          <Text
                            style={{
                              // alignContent: 'center',
                              // alignSelf: 'center',
                              fontWeight: 'bold',
                              fontSize: 13,
                              marginTop: 10,
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

                {/* <Text
                  style={{
                    color: 'black',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: '-15%',
                  }}>
                  Sleep and Recharge
                  <TouchableOpacity onPress={this.SleepandRecharge}>
                    <Text style={{left: '230%'}}>See All</Text>
                  </TouchableOpacity>
                </Text>

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
                          backgroundColor: '#FFFFFF',
                          // borderWidth: 1,
                          borderRadius: 14,
                        }}>
                        <TouchableOpacity onPress={this.Video.bind(this, item)}>
                          <Image
                             source={{uri:item.Thumbnail}}
                            style={styles.image}></Image>
                          <Text
                            style={{
                              // alignContent: 'center',
                              // alignSelf: 'center',
                              fontWeight: 'bold',
                              fontSize: 13,
                              marginTop: 10,
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

                <Text
                  style={{
                    color: 'black',
                    marginLeft: 20,
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginTop: '-15%',
                  }}>
                  Sleep and Rediscover you
                  <TouchableOpacity onPress={this.SleepandRediscoveryou}>
                    <Text style={{left: '110%'}}>See All</Text>
                  </TouchableOpacity>
                </Text>

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
                          backgroundColor: '#FFFFFF',
                          // borderWidth: 1,
                          borderRadius: 14,
                        }}>
                        <TouchableOpacity onPress={this.Video.bind(this, item)}>
                          <Image
                            source={{uri:item.Thumbnail}}
                            style={styles.image}></Image>
                          <Text
                            style={{
                              // alignContent: 'center',
                              // alignSelf: 'center',
                              fontWeight: 'bold',
                              fontSize: 13,
                              marginTop: 10,
                            }}>
                            {item.Tittle} {'\n'}
                            <Ionicons name="ios-volume-medium-sharp"></Ionicons>{' '}
                            {item.Type} .{item.Duration}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                /> */}

                <VStack
                  m={4}
                  spacing={1}
                  divider={false}
                  //</ScrollView>style={{margin: 15}}
                >
                  <TouchableOpacity>
                    <Box h={10}></Box>
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
                      style={{width: 30, height: 30, left: 17}}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={this.Meditation}>
 <Image
           source={{ uri: 'https://t3.ftcdn.net/jpg/04/91/42/06/240_F_491420686_mFk86MoHtG9xy4pKQAXN8pspCgTs0mLP.jpg' }}
           style={{ width: 80, height: 30,left:-20  }}
          />
 </TouchableOpacity> */}
                  <TouchableOpacity onPress={this.Home}>
                    <Image
                      source={{
                        uri: 'https://img.icons8.com/material-rounded/344/home-page.png',
                      }}
                      style={{width: 30, height: 30, paddingLeft:19}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.Sleep}>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/835/835503.png',
                      }}
                      style={{width: 30, height: 30, paddingLeft:19}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.Learn}>
                    <Image
                      source={{
                        uri: 'https://as1.ftcdn.net/v2/jpg/01/05/29/62/1000_F_105296263_MX030meFkK57Jj7z4TaSZXw1T0KPQXmd.jpg',
                      }}
                      style={{width: 30, height: 30, right: 17}}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={this.Relax}>
 <Image
           source={{ uri: 'https://cdn-icons-png.flaticon.com/512/842/842100.png' }}
           style={{ width: 30, height: 30,}}
          />
 </TouchableOpacity>
 <TouchableOpacity onPress={this.Sleep}>
 <Image
           source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2491/2491413.png' }}
           style={{ width: 30, height: 30, }}
          />
 </TouchableOpacity> */}
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
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playing: {
    width: 380,
    height: 340,
    //marginBottom:140,
    marginTop: -5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottomContainer: {
    borderTopColor: '#F2F1EE',
    borderTopWidth:2 ,
    width: width,
    alignItems: 'center',
    paddingVertical: 25,
    position: 'absolute',
    backgroundColor: 'white',
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: -10,
    marginBottom: -100,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  progressLabelTxt: {
    color: '#000000',
  },
  musicControlls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: -25,
  },
  gridView: {
    marginTop: '4%',
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
});

export default App;
