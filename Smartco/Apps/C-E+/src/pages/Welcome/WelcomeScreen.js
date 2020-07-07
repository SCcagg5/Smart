/* eslint-disable comma-dangle */
import React from 'react';
import { View, Image, TouchableHighlight, Text, ScrollView } from 'react-native';
import styles from './styles';

export default class WelcomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
  }

  onPressLogButton = () => {
    this.props.navigation.navigate('LogIn');
  };

  onPressSignButton = () => {
    this.props.navigation.navigate('SignUp');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <Image style={styles.logo} source={require('../../../assets/logoAppBank.jpeg')} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bienvenue</Text>
            <Text style={styles.description}>Gérez tous vos comptes financiers en un seul endroit</Text>
          </View>
          <View style={styles.logContainer}>
            <TouchableHighlight
              style={styles.loginContainer}
              onPress={() => this.onPressLogButton()}
            >
              <Text style={styles.logTxt}>Se connecter</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.signupContainer}
              onPress={() => this.onPressSignButton()}
            >
              <Text style={styles.signTxt}>S'inscrire</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
