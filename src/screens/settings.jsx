import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';

export default class SettingsScreen extends React.Component {
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
