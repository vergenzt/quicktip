import React from 'react';
import { Text, TextInput, View } from 'react-native';
import currency from 'currency.js';

import mask from '../lib/currency-mask';

import styles from '../styles';
import TipsTable from '../components/tips-table';
import { getFormattedTips } from '../lib/tip-lister';

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
    subtotal: null,
    subtotalText: '$',
  };

  handleSubtotalTextChanged = (subtotalText) => {
    const { maskedValue, value } = mask(subtotalText,
      precision = 2,
      decimalSeparator = '.',
      thousandSeparator = ',',
      allowNegative = false,
      prefix = '$',
      suffix = ''
    );
    this.setState({
      subtotal: value,
      subtotalText: maskedValue
    });
  };

  handleSubtotalSubmit = () => {
    console.log('Showing tips table');
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
            blurOnSubmit={true}
            defaultValue={this.state.subtotalText}
            onChangeText={this.handleSubtotalTextChanged}
            onSubmitEditing={this.handleSubtotalSubmit}
          />
        </View>

        <TipsTable tips={getFormattedTips(this.state.subtotal)}/>
      </View>
    );
  }
}
