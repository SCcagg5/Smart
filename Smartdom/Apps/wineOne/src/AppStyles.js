/* eslint-disable comma-dangle */
import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import defaultConfig from "./constants/defaultConfig";

export const landing = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  },
  title: {
    color: '#2d65c9',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 30
  },
  input: {
    color: 'black',
    fontSize: 17,
    marginLeft: 10,
    textAlign: 'center'
  },
  whiteBoldTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  loginContainer: {
    width: SCREEN_WIDTH - 100,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: defaultConfig.primaryColor,
    borderColor: defaultConfig.primaryColor,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20
  }
});

export const chart = StyleSheet.create({
  chartContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 50,
    alignSelf: 'center'
  },
  chartTxtContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  chartTxt: {
    fontSize: 14,
    color: 'black'
  },
  activeChartTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  }
});
//portfolio card
//card with image left,double text middle, and procent right
export const card = StyleSheet.create({
  facilitieContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '96%',
    marginBottom: 20,
    alignSelf: 'center'
  },
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1,
    padding: 20,
    paddingLeft: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowBondContainer: {
    width: '40%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  rowContainer: {
    width: '65%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  rowDateContainer: {
    width: '25%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  itemBondIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 5,
    resizeMode: "contain"
  },
  itemIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 25,
    marginLeft: 20,
    resizeMode: "contain"
  },
  itemTxtContainer: {
    lineHeight: 34
  },
  itemTitle: {
    fontSize: 12,
    color: '#070f12',
    fontWeight: 'bold'
  },
  itemHoldingDate: {
    marginTop: 10,
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 8,
    color: '#7f7d80'
  },
  itemMoney: {
    fontSize: 18,
    color: '#070f12',
    lineHeight: 30
  },
  viewTxt: {
    color: '#7f7d80',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20
  },
  greenProcentContainer: {
    padding: 10,
    height: 40,
    width: 80,
    backgroundColor: '#EAF4F0',
    borderColor: '#EAF4F0',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  greenItemProcent: {
    textAlign: 'center',
    color: '#34936A',
    fontSize: 15,
    fontWeight: 'bold'
  },
  greenItemF12Procent: {
    textAlign: 'center',
    color: '#34936A',
    fontSize: 12,
    fontWeight: 'bold'
  },
  redProcentContainer: {
    padding: 10,
    height: 40,
    width: 80,
    backgroundColor: '#FAEFF0',
    borderColor: '#FAEFF0',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  redItemProcent: {
    textAlign: 'center',
    color: '#CF696C',
    fontSize: 9,
    fontWeight: 'bold'
  }
});
//home card
//card with img on left,double text mid,and money text right
export const card2 = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    //borderTopColor: '#eff2f6',
    borderTopColor: 'rgba(214, 214, 214, 0.4)',
    borderTopWidth: Platform.OS === 'ios' ? 0.5 : 1,
    padding: 20,
    paddingLeft: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowContainer: {
    width: '65%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  itemIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 10
    //lineHeight: 30
  },
  itemTxtContainer: {
    lineHeight: 34
  },
  itemTitle: {
    fontSize: 12,
    color: '#7f7d80'
  },
  itemText: {
    fontSize: 16,
    color: '#070f12'
  },
  itemMoney: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#070f12',
    lineHeight: 30
  }
});
//card wiht img left,double text mid,and left arrow icon right
export const expenses = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    //borderTopColor: '#7f7d80',
    borderTopColor: 'rgba(214, 214, 214, 0.4)',
    borderTopWidth: Platform.OS === 'ios' ? 0.5 : 1,
    padding: 10,
    paddingLeft: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  itemIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 10
    //lineHeight: 30
  },
  itemTxtContainer: {
    lineHeight: 34
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F7D80'
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
    color: '#070f12'
  },
  itemMoney: {
    fontSize: 18,
    color: '#070f12',
    lineHeight: 30
  },
  rightArrow: {
    width: 15,
    height: 15,
    alignSelf: 'center'
  }
});
//style for buy and sell Screens
export const buyStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainContainer: {
    marginTop: 40,
    paddingTop: 0,
    padding: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1
  },
  inputTxt: {
    textAlign: 'right',
    fontSize: 16,
    color: '#4072CE'
  },
  boldTxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  blueTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#4072CE'
  },
  greyTxt: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#9b9b9b'
  },
  btnContainer: {
    width: '80%',
    borderRadius: 7,
    backgroundColor: '#2d65c9',
    borderColor: '#2d65c9',
    borderWidth: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 30
  },
  btnTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  }
});

//style for Crypto and Stock screens
export const crypto = StyleSheet.create({
  infoContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    paddingTop: 0
  },
  infoTitle: {
    fontSize: 20,
    color: 'black',
    margin: 20,
    marginLeft: 10,
    fontWeight: '500'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  rowBorderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 10,
    borderBottomColor: '#E5E3E6',
    borderBottomWidth: 1
  },
  mainTxt: {
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '500',
    color: '#768695',
    textTransform: 'uppercase'
  },
  secTxt: {
    textAlign: 'left',
    fontSize: 14,
    color: 'black'
  },
  btnsContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  },
  btnContainer: {
    width: '48%',
    borderRadius: 5,
    backgroundColor: '#2d65c9',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btnTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },
  row: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  storyTitle: {
    fontSize: 16,
    color: '#070f12',
    fontWeight: 'bold',
    margin: 5
  },
  storyDate: {
    fontSize: 12,
    color: '#768695',
    margin: 5
  },
  facilitieContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center'
  },
  viewTxt: {
    color: '#7f7d80',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070f12',
    margin: 20
  },
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    //borderTopColor: '#7f7d80',
    borderTopColor: 'rgba(214, 214, 214, 0.4)',
    borderTopWidth: Platform.OS === 'ios' ? 0.5 : 1,
    padding: 20,
    paddingLeft: 10
  },
  rightContainer: {
    justifyContent: 'flex-start',
    width: '45%'
  },
  leftContainer: {
    alignContent: 'flex-start',
    width: '45%'
  }
});

export const transactions = StyleSheet.create({
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    // /borderTopColor: '#7f7d80',
    borderTopColor: 'rgba(214, 214, 214, 0.4)',
    borderTopWidth: Platform.OS === 'ios' ? 0.5 : 1,
    padding: 20,
    paddingLeft: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowContainer: {
    width: '55%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  txtContainer: {
    width: '20%',
    alignSelf: 'flex-end'
  },
  itemIconContainer: {
    backgroundColor: '#979797',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 20,
    alignSelf: 'center'
  },
  itemIcon: {
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  itemTxtContainer: {
    lineHeight: 34
  },
  itemTitleContainer: {
    justifyContent: 'center',
    marginLeft: 10
  },
  itemTitle: {
    fontSize: 12,
    color: '#070f12',
    textAlign: 'left'
  },
  itemDate: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#9B9B9B',
    lineHeight: 30
  },
  itemMoney: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#070f12',
    lineHeight: 30,
    fontWeight: '600'
  }
});

export const account = StyleSheet.create({
  facilitieContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 15,  
    height:height - 130
  },
  autoContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 15,  
    height:"auto"
  },
  contactsContainer:{
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 15,  
  },
  cercleBtnIcon: {
    height: 54,
    width: 54,
    alignSelf: "center",
    backgroundColor: defaultConfig.primaryColor,
    borderRadius: 27,
    justifyContent: "center"
  },
  cercleBtnGreyIcon: {
    height: 50,
    width: 50,
    alignSelf: "center",
    backgroundColor: "#F1F5F8",
    borderWidth:0,
    borderRadius: 25, 
    justifyContent: "center" 
  },
  itemContainer: {
    alignSelf: 'center',
    width: '100%',
    borderBottomColor: 'rgba(214, 214, 214, 0.4)',
    borderBottomWidth: 1,
    padding: 20,
    paddingLeft: 10
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowBondContainer: {
    width: '40%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  rowContainer: {
    width: '65%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  rowDateContainer: {
    width: '25%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  itemBondIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 5,
    resizeMode: "contain"
  },
  itemIcon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 25,
    marginLeft: 20,
    resizeMode: "contain"
  },
  itemTxtContainer: {
    lineHeight: 34
  },
  itemTitle: {
    fontSize: 12,
    color: '#070f12',
    fontWeight: 'bold'
  },
  itemHoldingDate: {
    marginTop: 10,
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 8,
    color: '#7f7d80'
  },
  itemMoney: {
    fontSize: 18,
    color: '#070f12',
    lineHeight: 30
  },
  viewTxt: {
    color: '#7f7d80',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20
  },
  greenProcentContainer: {
    padding: 10,
    height: 40,
    width: 80,
    backgroundColor: '#EAF4F0',
    borderColor: '#EAF4F0',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  greenItemProcent: {
    textAlign: 'center',
    color: '#34936A',
    fontSize: 15,
    fontWeight: 'bold'
  },
  redProcentContainer: {
    padding: 10,
    height: 40,
    width: 80,
    backgroundColor: '#FAEFF0',
    borderColor: '#FAEFF0',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  redItemProcent: {
    textAlign: 'center',
    color: '#CF696C',
    fontSize: 9,
    fontWeight: 'bold'
  }
});
