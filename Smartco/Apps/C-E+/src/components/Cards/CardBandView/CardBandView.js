/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import styles from './styles';
import moment from "moment";

class CardBandView extends React.Component {
  render() {
    const item = this.props.item;  
    //console.log(item);  
    return (
      <TouchableHighlight 
        style={styles.itemContainer}  
        onPress={() => this.props.onPress()}
        underlayColor="rgba(128, 128, 128, 0.1)" 
      > 
        <View style={styles.mainContainer}>
          <View style={styles.rowBondContainer}>
            <Image style={styles.itemBondIcon} source={{ uri: item.logo }} />
            <View style={styles.itemTxtContainer}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemmText}>{item.desc}</Text>
            </View>
          </View>
          <View style={styles.rowDateContainer}>
          
            <View style={styles.itemTxtContainer}>
              <Text style={styles.itemHoldingDate}>{moment(item.minimalHolding).format("DD-MM-YYYY")} </Text>
            </View>
          </View>
          <View style={styles.greenProcentContainer}>
            <Text style={styles.greenItemProcent}>
              {item.percentPerYear + '%'}
            </Text>
            <Text style={styles.redItemProcent}> 
              {item.brands === "LePerray Energie SPV1" ? (item.montantPartBond + " EUR") : item.montantPartBond + " CHF" }
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
export default CardBandView;
