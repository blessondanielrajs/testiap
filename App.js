import React from 'react';
import {StatusBar, View, Text, AppState} from 'react-native';
import Profile from './components/Profile.js';
import SplashScreen from './components/SplashScreen.js';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
class App extends React.Component {
  state = {
    status: false,
    appState: AppState.currentState,
  };

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
        }
        this.setState({appState: nextAppState});
      },
    );
  }

  componentWillUnmount() {
    this.appStateSubscription.remove();
  }

  render() {
    console.log(this.state.appState3);
    return (
      <>
        <StatusBar barStyle="dark-content"></StatusBar>
        {/* Landing Page */}
        <SplashScreen />
        {/* <Profile/> */}
      </>
    );
  }
}

export default App;
