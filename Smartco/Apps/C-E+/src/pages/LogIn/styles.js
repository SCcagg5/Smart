/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import { landing } from '../../AppStyles';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: landing.container,
  title: landing.title,
  input: landing.input,
  facebookTxt: landing.whiteBoldTxt,
  logTxt: landing.whiteBoldTxt,
  loginContainer: landing.loginContainer,
  inputContainer: {
    margin: 20,
    marginBottom: 20,
    padding: 5,
    width: SCREEN_WIDTH - 100,
    backgroundColor: 'white',
    borderColor: '#4a4a4a',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center'
  },
  facebookContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  orTxt: {
    margin: 20,
    color: 'silver',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  logContainer: { marginBottom: 60 }
});

export default styles;
