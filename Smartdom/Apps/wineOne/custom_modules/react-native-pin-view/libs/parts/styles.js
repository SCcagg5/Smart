import {StyleSheet, I18nManager} from 'react-native'

export default StyleSheet.create({
  //passwordInputView
  passwordInputView          : {
    alignSelf    : 'center',
  },
  passwordInputViewItem      : {
    alignItems    : 'center',
    justifyContent: 'center',
    height        : 15,
    margin        : 10,
    width         : 15,
    borderRadius  : 35 / 2,
  },
  passwordInputViewItemActive: {
    alignItems    : 'center',
    justifyContent: 'center',
    height        : 15,
    width         : 15,
    margin        : 10,
    borderRadius  : 35 / 2,
  },
  // KeyboardView
  keyboardView               : {
    alignItems: 'center',
    marginTop : 35,
  },
  keyboardViewItem           : {
    alignItems      : 'center',
    justifyContent  : 'center',
    height          : 75,
    width           : 75,
    marginHorizontal: 5,
    marginVertical  : 5,
    borderRadius    : 75 / 2,
  },
  keyboardViewItemText       : {
    fontSize  : 22,
    fontWeight: 'normal',
  },
})
