import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import styles from './styles';

export default class BackButton extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor="rgba(128, 128, 128, 0.1)">
        <View style={styles.btnContainer}>
          <Image source={require('../../../assets/icons/backArrow.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
