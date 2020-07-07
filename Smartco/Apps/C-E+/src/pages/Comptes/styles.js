/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
  },
  facilitieContainer: {
    backgroundColor: 'white',
    width: '100%',
    //marginTop: 60,
    marginBottom: 20,
    alignSelf: 'center'
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: 30,
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    backgroundColor: '#4a7bd0',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 15
  },
  btnTxt: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  }
});

export default styles;
