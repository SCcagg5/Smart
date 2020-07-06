/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import { landing } from '../../AppStyles';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: landing.container,
  loginContainer: landing.loginContainer,
  logTxt: landing.whiteBoldTxt,
  logo: {
    width: "100%",
    height: 50,
    alignSelf: 'center'
  },
  titleContainer: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 25
  },
  title: {
    marginTop:25,
    marginBottom: 20,
    textAlign: 'center',
    color: '#981b1a',
    fontSize: 30,
    fontWeight:"bold"
  },
  description: {
    textAlign: 'center',
    color: '#070f12',
    fontSize: 16,
    fontWeight: 'bold'
  },
  logContainer: {
    marginTop: 20,
    marginBottom: 60,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  signupContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderColor: '#070f12',
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  signTxt: {
    fontSize: 20,
    color: '#070f12',
    fontWeight: 'bold'
  }
});

export default styles;
