/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, Text, Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import LineChart from 'react-native-responsive-linechart';

export default class LineChartView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeChart: 0
    };
  }

  renderTable = (item, index) => (
    <TouchableHighlight
      onPress={() => this.setState({ activeChart: index })}
      underlayColor="rgba(73,182,77,1,0.9)"
      style={
        this.state.activeChart == index
          ? {
              justifyContent: 'center',
              backgroundColor: '#617180',
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
              margin: TABLE_ITEM_OFFSET,
              width:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / this.props.lineChartTables.length -
                TABLE_ITEM_OFFSET,
              height:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / this.props.lineChartTables.length -
                TABLE_ITEM_OFFSET,
              maxWidth: 50,
              maxHeight: 50
            }
          : {
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
              margin: TABLE_ITEM_OFFSET,
              width:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / this.props.lineChartTables.length -
                TABLE_ITEM_OFFSET,
              height:
                (SCREEN_WIDTH - TABLE_ITEM_MARGIN) / this.props.lineChartTables.length -
                TABLE_ITEM_OFFSET,
              maxWidth: 50,
              maxHeight: 50
            }
      }
    >
      <Text style={this.state.activeChart == index ? chart.activeChartTxt : chart.chartTxt}>
        {item}
      </Text>
    </TouchableHighlight>
  );

  render() {
    const lineChartData = this.props.lineChartData;
    const lineChartConfig = this.props.lineChartConfig;
    const lineChartTables = this.props.lineChartTables;
    return (
      <View>
        <LineChart
          style={{
            width: SCREEN_WIDTH -50,
            height: 180,
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 0,
            marginBottom: 0, 
            margin: 20
          }}
          config={lineChartConfig}
          data={lineChartData[this.state.activeChart]}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1 }}>
          {lineChartTables.map((data, index) => this.renderTable(data, index))}
        </View>
      </View>
    );
  }
}

const TABLE_ITEM_OFFSET = 10;
const TABLE_ITEM_MARGIN = TABLE_ITEM_OFFSET * 2;

const chart = StyleSheet.create({
  chartTxt: {
    fontSize: 14,
    color: 'black'
  },
  activeChartTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  }
});
