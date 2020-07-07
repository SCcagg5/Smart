/* eslint-disable comma-dangle */
//portfolio card
//card with image left,double text middle, and procent right
import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import styles from './styles';
import moment from "moment";
import emptyLogo from "../../../assets/images/emptyBondsLogo.jpg"

class CardEquityBonds extends React.Component {
    render() {
        const item = this.props.item;
        return (
            <TouchableHighlight
                style={styles.itemContainer}
                onPress={() => this.props.onPress()}
                underlayColor="rgba(128, 128, 128, 0.1)"
            >
                <View style={styles.mainContainer}>
                    <View style={styles.rowBondContainer}>
                        <View style={styles.itemTxtContainer}>
                            <Text style={styles.itemTitle}>{item.name}</Text>
                            <Text style={styles.itemmText}>{item.assetClass}</Text>
                        </View>
                    </View>
                    <View style={styles.rowDateContainer}>

                        <View style={styles.itemTxtContainer}>
                            <Text style={styles.itemHoldingDate}>{moment(item.datePremierPaie).format("DD-MM-YYYY")} </Text>
                        </View>
                    </View>
                    <View style={styles.greenProcentContainer}>
                        <Text style={{
                            textAlign: 'center',
                            color: '#34936A',
                            fontSize: 9,
                            fontWeight: 'bold'
                        }}>
                            {item.Montant + " tokens"}
                        </Text>
                        <Text style={styles.redItemProcent}>
                            {item.Montant + " CHF" }
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
export default CardEquityBonds;
