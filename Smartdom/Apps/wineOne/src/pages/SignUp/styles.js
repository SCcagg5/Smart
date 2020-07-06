/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import { landing } from '../../AppStyles';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: landing.container,
  title: landing.title,
  signTxt: landing.whiteBoldTxt,
  input: landing.input,
  inputContainer: {
    margin: 10,
    padding: 5,
    width: SCREEN_WIDTH - 100,
    backgroundColor: 'white',
    borderColor: '#070f12',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center'
  },
  signContainer: {
    width: SCREEN_WIDTH - 160,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40
  },
  logContainer: { marginBottom: 40 }
});

export default styles;
