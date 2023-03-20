import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 45,
    padding: 150,
    alignSelf: 'flex-start',
    marginTop: 19,
    width: '9.4%',
  },
});
const ImagesExample = () => (
  <View style={{backgroundColor: 'white'}}>
    <img source={require('../Images/original.png')} style={styles.logo} />
  </View>
);
export default ImagesExample;
