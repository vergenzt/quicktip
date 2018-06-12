import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});

export class MainScreen extends React.Component {
  static navigationOptions = ({navigation: {navigate}}) => ({
    title: 'QuickTip',
    headerRight: (
      <Text
        children={'⋮'}
        style={{fontWeight: 'bold', width: 25}}
        onPress={() => navigate('Settings')}
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Yay!</Text>
      </View>
    );
  }
}

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Some settings</Text>
      </View>
    );
  }
}

export default createStackNavigator({
  Main: MainScreen,
  Settings: SettingsScreen
}, {
  initialRouteName: 'Main'
});
