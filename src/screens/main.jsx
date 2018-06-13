import React from 'react';
import { Text, TextInput, View } from 'react-native';
import currency from 'currency.js';

import styles from '../styles';
import TipsTable from '../components/tips-table';
import { calculateTips } from '../lib/tip-lister';

export default class MainScreen extends React.Component {
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

  state = {
    subtotal: 47.89
  };

  handleBillAmountTextChanged = (subtotalText) => {
    this.setState({
      subtotal: currency(subtotalText).value
    });
  };

  render() {
    return (
      <View style={styles.container}>

        <View>
          <Text>
            Bill Amount:
          </Text>
          <TextInput
            keyboardType="numeric"
            autoFocus={true}
            selectTextOnFocus={true}
            value={currency(this.state.subtotal).format()}
            onChangeText={this.handleBillAmountTextChanged}
          />
        </View>

        <TipsTable tips={calculateTips(this.state.subtotal)}/>
      </View>
    );
  }
}
