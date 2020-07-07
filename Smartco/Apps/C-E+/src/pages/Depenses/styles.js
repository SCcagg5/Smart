/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import { expenses } from '../../AppStyles';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  chartContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 20,
    //marginTop: 80,
    marginTop: 15,
    marginBottom: 20,
    alignSelf: 'center'
  },
  facilitieContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070f12',
    margin: 20
  },
  itemContainer: expenses.itemContainer,
  mainContainer: expenses.mainContainer,
  rowContainer: expenses.rowContainer,
  itemIcon: expenses.itemIcon,
  itemTxtContainer: expenses.itemTxtContainer,
  itemTitle: expenses.itemTitle,
  itemText: expenses.itemText,
  itemMoney: expenses.itemMoney,
  rightArrow: expenses.rightArrow,
  viewTxt: {
    color: '#7f7d80',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20
  }
});

export default styles;
