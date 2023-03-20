import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import {Text, VStack, HStack} from '@react-native-material/core';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

import {Button} from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import Menu from './menu.js';
import Home from './home.js';
import {Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class App extends React.Component {
  state = {
    status: '',
    Photo: '../Images/original.png',
    fristName: '',
    lastName: '',
    Logged: '',
    changePassword: '',
    Phone: '',
    image: '',
    back: 'profile',
    age: '',
    weight: '',
    gender: '',
    Email: '',
    visible: '',
  };

  componentDidMount = async () => {
    var doc = firestore()
      .collection('Sleep')
      .where('Email', '==', this.props.data)
      .get();
    await doc.then(querySnapshot => {
      querySnapshot.forEach(snapshot => {
        data = snapshot.data();
        console.log(data);
        this.setState({
          fristName: data.FirstName,
          lastName: data.LastName,
          Logged: data.SignIn,
          Phone: data.PhoneNumber,
          gender: data.Gender,
          age: data.Age,
          weight: data.Weight,
          Email: data.Email,
        });
      });
    });
  };

  Home = () => {
    this.setState({status: 'home'});
  };

  Menu = () => {
    this.setState({status: 'menu'});
  };

  fristName = e => {
    console.log(e);
    this.setState({fristName: e});
  };

  lastName = e => {
    console.log(e);
    this.setState({lastName: e});
  };

  gender = e => {
    console.log(e);
    this.setState({gender: e});
  };

  age = e => {
    console.log(e);
    this.setState({age: e});
  };

  weight = e => {
    console.log(e);
    this.setState({weight: e});
  };

  changePassword = e => {
    console.log(e);
    this.setState({changePassword: e});
  };

  Phone = e => {
    console.log(e);
    this.setState({Phone: e});
  };

  UpdateProfile = () => {
    if (
      this.state.fristName === '' ||
      this.state.lastName === '' ||
      this.state.Phone === ''
    ) {
      this.setState({visible: true});
    } else {
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
          tmp.FirstName = this.state.fristName;
          tmp.LastName = this.state.lastName;
          tmp.PhoneNumber = this.state.Phone;
          if (this.state.Weight) {
            tmp.Weight = this.state.weight;
          }
          if (this.state.age) {
            tmp.Age = this.state.age;
          }
          if (this.state.gender) {
            tmp.Gender = this.state.gender;
          }
          console.log(tmp);
          thing.ref.update(tmp);
        });
    }
  };

  addImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  render() {
    return (
      <>
        {this.state.status === 'menu' ? (
          <Menu data={this.state} />
        ) : this.state.status === 'home' ? (
          <Home data={this.props.data} />
        ) : (
          <View
            style={{
              height: height,
              width: width,
              backgroundColor: '#FAFAFA',
            }}>
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({visible: false});
              }}>
              <DialogContent>
                <Text style={{marginTop: '10%', color: '#343434'}}>
                  Please fill all the inputs
                </Text>
              </DialogContent>
            </Dialog>
            <View
              style={{
                flexDirection: 'row',
                marginTop: Platform.OS === 'ios' ? '15%' : '2%',
                paddingBottom: '4%',
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
                Profile
              </Text>

              <TouchableOpacity
                style={{
                  marginLeft: '50%',
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
              {/* <View style={{width: width}}>
                <View style={imageUploaderStyles.container}>
                  {this.state.image &&
                    // <Image
                    //   source={{uri: this.state.image}}
                    //   style={{width: 200, height: 200}}
                    // />
                    ''}
                  <View style={imageUploaderStyles.uploadBtnContainer}>
                    <TouchableOpacity
                      onPress={this.addImage.bind(this, false)}
                      style={imageUploaderStyles.uploadBtn}>
                      {/* //<AntDesign name="camera" size={20} color="black" /> */}
                      {/* <Ionicons
                        name="camera-outline"
                        size={20}
                        style={{marginTop: 3}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View> */} 
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  margin: 16,
                  borderRadius: 14,
                  marginTop: Platform.OS === 'ios' ? '10%' : '8%',
                }}>
                <VStack
                  m={4}
                  spacing={Platform.OS === 'ios' ? 10 : 8}
                  divider={true}
                  style={{margin: Platform.OS === 'ios' ? '8%' : '7%'}}>
                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Frist Name
                    </Text>
                    <TextInput
                      value={this.state.fristName}
                      style={styles.input}
                      onChangeText={this.fristName}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Last Name
                    </Text>
                    <TextInput
                      value={this.state.lastName}
                      style={styles.input}
                      onChangeText={this.lastName}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Gender - (Optional)
                    </Text>
                    <TextInput
                      value={this.state.gender}
                      style={styles.input}
                      onChangeText={this.gender}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Age - (Optional)
                    </Text>
                    <TextInput
                      value={this.state.age}
                      style={styles.input}
                      onChangeText={this.age}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Weight - (Optional)
                    </Text>
                    <TextInput
                      value={this.state.weight}
                      style={styles.input}
                      onChangeText={this.weight}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      E-mail
                    </Text>
                    <TextInput
                      value={this.state.Email}
                      style={styles.input}
                      // onChangeText={this.Email}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Logged in with
                    </Text>
                    <TextInput
                      value={this.state.Logged}
                      style={styles.input}
                      // onChangeText={this.Email}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                  {this.state.Logged === 'Email' ? (
                    <View>
                      <Text
                        style={{
                          color: '#929292',
                          fontWeight: '500',
                          fontSize: 14,
                          marginTop: '2%',
                        }}>
                        Change Password
                      </Text>
                      <TextInput
                        value={this.state.changePassword}
                        //secureTextEntry={true}
                        style={styles.input}
                        onChangeText={this.changePassword}
                        uppercase={false}
                        autoCapitalize="none"
                        placeholderTextColor="#343434"
                      />
                    </View>
                  ) : (
                    ''
                  )}

                  <View>
                    <Text
                      style={{
                        color: '#929292',
                        fontWeight: '500',
                        fontSize: 14,
                        marginTop: '2%',
                      }}>
                      Phone Number
                    </Text>
                    <TextInput
                      value={this.state.Phone}
                      style={styles.input}
                      onChangeText={this.Phone}
                      uppercase={false}
                      autoCapitalize="none"
                      placeholderTextColor="#343434"
                    />
                  </View>
                </VStack>
              </View>
              <Button
                title="Update Profile"
                iconContainerStyle={{marginRight: 10}}
                titleStyle={{fontWeight: '700'}}
                buttonStyle={{
                  backgroundColor: '#D0942A',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 10,
                  height: 48,
                }}
                containerStyle={{
                  width: '94%',
                  marginHorizontal: 10,
                  marginVertical: 1,
                }}
                onPress={this.UpdateProfile}
              />
              <View style={{height: 30}}></View>
            </ScrollView>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    //width: '92%',
    //margin: 2,
    //borderWidth: 2,
    // padding: 10,
    height: Platform.OS === 'ios' ? 28 : 38,
    //left: -25,
    //borderRadius: 10,
    // borderinlinecolor: 'red',
    //#32a1ce
    // borderColor: '#D0942A',
    // backgroundColor: '#FFFFFF',
    fontSize: 17,
    marginTop: '1%',
    color: '#343434',
  },
});

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '21%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
