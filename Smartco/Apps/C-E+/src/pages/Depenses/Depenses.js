/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, Image, Text, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import { PieChart } from 'react-native-chart-kit';
import { FlatList } from 'react-native-gesture-handler';
import { spendingArray, expensesData, chartConfig, payments } from '../../data/dataArrays';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

export default class Depenses extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.itemContainer}
    >
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          <Image style={styles.itemIcon} source={{ uri: item.icon }} />
          <View style={styles.itemTxtContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.money}</Text>
          </View>
        </View>
        <Image style={styles.rightArrow} source={require('../../../assets/icons/rightArrow.png')} />
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.chartContainer}>
          <PieChart
            data={expensesData}
            width={SCREEN_WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="money"
            backgroundColor="transparent"
          />
        </View>
        <View style={styles.facilitieContainer}>
          <Text style={styles.title}>Top Spending Categories</Text>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={spendingArray.slice(0, 4)}
            renderItem={this.renderItem}
            extraData={this.state}
            listKey={0}
          />
        </View>
      </ScrollView>
    );
  }
}
