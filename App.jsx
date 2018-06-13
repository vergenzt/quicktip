import { createStackNavigator } from 'react-navigation';

import MainScreen from './src/screens/main';
import SettingsScreen from './src/screens/settings';

export default createStackNavigator({
  Main: MainScreen,
  Settings: SettingsScreen
}, {
  initialRouteName: 'Main'
});
