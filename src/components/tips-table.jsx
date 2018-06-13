import React from 'react';
import { View } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import styles from '../styles';

export default class TipsTable extends React.Component {
  static columns = [
    { title: 'Total', entry: 'total' },
    { title: 'Tip', entry: 'tipTotal' },
    { title: 'Percentage', entry: 'tipPercent' },
  ];

  renderHeaderRow = () => {
    return (
      <Row
        data={this.constructor.columns.map(({title}) => title)}
        style={styles.head}
        textStyle={styles.text}
      />
    );
  };

  renderTipRow = (tip, i) => {
    return (
      <TableWrapper key={i} style={styles.row}>
        {
          this.constructor.columns.map(
            ({entry}, j) => <Cell key={j} data={tip[entry]} textStyle={styles.text}/>
          )
        }
      </TableWrapper>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        { this.renderHeaderRow() }
        <Table borderStyle={{borderColor: 'transparent'}}>
          { this.props.tips.map(this.renderTipRow) }
        </Table>
      </View>
    );
  }
}
