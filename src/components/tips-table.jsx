import React from 'react';
import { View } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import styles from '../styles';

export default class TipsTable extends React.Component {
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
