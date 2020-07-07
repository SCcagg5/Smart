import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

class TransactionView extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.itemIconContainer}>
              <Image
                style={styles.itemIcon}
                source={{ uri: item.icon }}
                //source={require('../../../assets/icons/transactionIcon.png')}
              />
            </View>
            <View style={styles.itemTitleContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.itemMoney}>{item.money}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default TransactionView;
