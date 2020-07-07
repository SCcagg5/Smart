/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';
import { card } from '../../AppStyles';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9'
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070f12',
    margin: 20
  },
  facilitieContainer: card.facilitieContainer,
  itemContainer: card.itemContainer,
  viewTxt: card.viewTxt,
  storyTitle: { fontSize: 16, color: '#070f12', fontWeight: 'bold', margin: 5 },
  storyDate: { fontSize: 12, color: 'silver', fontWeight: 'bold', margin: 5 },
  viewContainer: { alignSelf: 'center', width: '100%', padding: 20, paddingLeft: 10 }
});

export default styles;
