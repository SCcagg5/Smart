/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  infoContainer: {
    marginBottom: 40,
    //marginTop: 80
    marginTop: 30
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20
  },
  userName: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
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
  },
  btnContainer: {
    marginTop: 50,
    marginBottom: 50,
    width: SCREEN_WIDTH - 40,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: 'rgba(214, 214, 214, 0.4)',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btnTxt: {
    fontSize: 16,
    color: 'red',
    fontWeight: '400',
    textAlign: 'center'
  }
});

export default styles;
