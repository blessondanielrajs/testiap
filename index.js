/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Text, TextInput} from 'react-native';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = { };
  TextInput.defaultProps.allowFontScaling = false;
}

console.disableYellowBox = true;
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
