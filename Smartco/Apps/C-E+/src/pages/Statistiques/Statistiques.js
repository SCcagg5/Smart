/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View, Text, ScrollView, FlatList, StatusBar } from 'react-native';
import {
  cashArray,
  investmentsArray,
  liabilitiesArray,
  lineChartData,
  lineChartConfig,
  lineChartTables,
  payments
} from '../../data/dataArrays';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import LineChartView from '../../components/LineChartView/LineChartView';

export default class Statistiques extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  constructor(props) {
    super(props);

    this.state = {
      activeChart: 0
    };
  }

  renderItem = ({ item }) => (
    <Card2View
      item={item}
    />
  );

  renderData = ({ item }) => <Text style={{ marginBottom: 2 }}>{item}</Text>;

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.chartContainer}>
          <LineChartView
            lineChartData={lineChartData}
            lineChartConfig={lineChartConfig}
            lineChartTables={lineChartTables}
          />
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Cash</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={cashArray}
            renderItem={this.renderItem}
            extraData={this.state}
            //keyExtractor={item => `${item.id}`}
            listKey={'0'}
          />
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Investments</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={investmentsArray}
            renderItem={this.renderItem}
            extraData={this.state}
            listKey={'1'}
          />
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Liabilities</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={liabilitiesArray}
            renderItem={this.renderItem}
            extraData={this.state}
            listKey={'2'}
          />
        </View>
      </ScrollView>
    );
  }
}
