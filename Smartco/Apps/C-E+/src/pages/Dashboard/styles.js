/* eslint-disable comma-dangle */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 13,
    paddingBottom: 13,
    width: '100%',
    //borderBottomColor: 'silver',
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  itemIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    alignSelf: 'center'
  },
  itemTitle: {
    fontSize: 17,
    color: '#070f12',
    alignSelf: 'center'
  },
  rightArrow: {
    width: 15,
    height: 15,
    alignSelf: 'center'
  }
});

export default styles;
