import { StyleSheet } from 'react-native'
export const hairlineWidth = StyleSheet.hairlineWidth
export default {
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    marginLeft:10,
    marginRight:10,
    paddingBottom:3,
    backgroundColor: 'transparent',
    borderWidth:1,
    borderRadius:20,
    borderColor:'transparent'
  },
  titleBox: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E4E7',
    borderTopWidth:1,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderColor:'transparent'
  },
  titleText: {
    color: '#757575',
    fontSize: 14
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E4E7'
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12
  },
  buttonBox: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E4E7',
    paddingBottom:10
  },
  lastButtonBox: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E4E7',
    paddingBottom:10,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderColor:'transparent'
  },

  buttonText: {
    fontSize: 16,
    color:"#4E65F8",
    fontWeight:'bold'
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E4E7',
    borderRadius:10,
    borderColor:'transparent',
    marginBottom:12
  }
}
