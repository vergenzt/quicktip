import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import currency from 'currency.js';
import { createStackNavigator } from 'react-navigation';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import { calculateTips } from './tip-lister';

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export class TipsTable extends React.Component {
  render() {
    const {tips} = this.props;

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={['Total', 'Tip', 'Percentage']} style={styles.head} textStyle={styles.text}/>
          {
            tips.map(({total, tipTotal, tipPercent}, i) => (
              <TableWrapper key={i} style={styles.row}>
                {
                  [total, tipTotal, tipPercent].map(({value}, j) => (
                    <Cell key={j} data={value} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    );
  }
}

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
