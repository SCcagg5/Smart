/* eslint-disable comma-dangle */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  StatusBar,
  PermissionsAndroid, Picker, Dimensions, Linking
} from 'react-native';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import { account, chart } from '../../AppStyles';
import { Button, Icon, Text as TextNB } from "native-base";
import defaultConfig from "../../constants/defaultConfig"
import * as firebase from "firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import LineChartView from '../../components/LineChartView/LineChartView';
import {
  cashArray,
  investmentsArray,
  liabilitiesArray,
  lineChartData,
  lineChartConfig,
  lineChartTables,
  payments
} from '../../data/dataArrays';
import { ButtonGroup, Divider, Avatar, ListItem,Button as ButtonE } from "react-native-elements"
import BaseIcon from '../../components/Icon'
import moment from 'moment';
import Contacts from "react-native-unified-contacts";
import currencyService from "../../provider/currencyService";
import ELayerService from "../../provider/ELayerService";
import { showMessage, hideMessage } from "../../customComponents/react-native-flash-message/src";


const {width, height} = Dimensions.get('window');

class Comptes extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: "",
      exchanges:[],
      solde:"",
      soldeCopy:"",
      selectedCurrency:"EUR",
      uid:"",
      btnAddWallet:false
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("uid").then(value => {
      firebase.database().ref("users/" + value).on("value", (snapshot) => {
        let user = snapshot.val();
        let exchanges = [];
        currencyService.getExchangeRates().then( res => {
          Object.keys(res.rates).map((item,key) => {
            exchanges.push({currency:item})
          });
          Object.values(res.rates).map((item,key) => {
            exchanges[key].rate = item;
          });
          this.setState({ user: user, loading: false,exchanges:exchanges,uid:value,
            solde:parseFloat(user.solde || "00.00").toFixed(2),
            soldeCopy: parseFloat(user.solde || "00.00").toFixed(2)});
        }).catch( err => {
          console.log(err);
        });

      });
    });
  }


  render() {
    return (
      <ScrollView style={styles.container}>  

        {
          this.state.loading === true ?

            <Spinner
              visible={this.state.loading}
              textContent={''}
            /> :

            <View style={account.autoContainer}>
              <Text style={{color:"#EA008D",fontWeight:"bold",fontSize:22,alignSelf:"center",marginTop:30}}>Mon Solde</Text>
              <View style={{flexDirection:"row",justifyContent:"space-evenly",marginLeft:"10%",marginRight:"10%"}}>
                <Text style={{ fontSize: 28, color: "#000", fontWeight: "bold", marginTop: 35 }}>
                  {this.state.solde}
                </Text>
                <View style={{
                  backgroundColor: 'white', marginLeft: -15,marginTop:30
                }}>
                  <Picker
                      mode="dropdown"
                      selectedValue={this.state.selectedCurrency}
                      onValueChange={(itemValue, itemIndex) =>
                          this.setState({selectedCurrency:itemValue,
                            solde: (parseFloat(this.state.soldeCopy) * parseFloat(itemValue)).toFixed(2)})
                      }
                      style={{width:100,fontSize: 28, color: "#000", fontWeight: "bold",}}
                  >
                    <Picker.Item label={"EUR"} value={1} />
                    {
                      this.state.exchanges.map((item, key) => (
                          <Picker.Item label={item.currency} value={item.rate}  />
                      ))
                    }
                  </Picker>
                </View>
              </View>
              <View style={{flexDirection:"row",justifyContent:"space-evenly",marginLeft:"20%",marginRight:"20%"}}>
                <Text style={{ fontSize: 24, color: "#000", fontWeight: "bold", marginTop: 20 }}>
                  {this.state.user.wallet.nbToken || "0"}
                </Text>
                <View style={{
                  backgroundColor: 'white', marginLeft: -15,marginTop:20
                }}>
                  <Text style={{ fontSize: 24, color: "#000", fontWeight: "bold",alignSelf:"center" }}>
                    tokens
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row", marginLeft: "2.5%", marginRight: "2.5%", marginBottom: 20, marginTop: 40 }}>
                  <View style={{ width: "33.3%" }}>
                    <Button style={account.cercleBtnIcon} onPress={() => this.props.navigation.navigate("ChooseAddPayementMethod")} >
                      <Icon name='add' style={{ alignSelf: "center" }} />        
                    </Button>
                    <Text style={{ fontSize: 12, color: defaultConfig.primaryColor, alignSelf: "center" }}>Ajouter de l'argent</Text>
                  </View>
                  <View style={{ width: "33.3%" }}>
                    <Button style={account.cercleBtnIcon}>
                      <Icon name='loop' type="MaterialIcons" style={{ alignSelf: "center" }} />
                    </Button>
                    <Text style={{ fontSize: 12, color: defaultConfig.primaryColor, alignSelf: "center", textTransform: "capitalize" }}>échanger</Text>

                  </View>
                  <View style={{ width: "33.3%" }}>
                    <Button style={account.cercleBtnIcon}>
                      <Icon name='error-outline' type="MaterialIcons" style={{ alignSelf: "center" }} />
                    </Button>
                    <Text style={{ fontSize: 12, color: defaultConfig.primaryColor, alignSelf: "center" }}>Détails</Text>

                  </View>
                </View>

              </View>

              <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 20, height: 2 }} />

              <View style={{marginTop:15}}>
                <View style={{marginLeft:20}}>
                  <Text style={{color:"#000",fontSize:18,fontWeight:"bold"}}>Mes wallets</Text>
                  {
                    (this.state.user.wallet === undefined || this.state.user.wallet === null)  &&
                    <View>
                      <Text style={{color:"red",fontSize:13,marginLeft:3,marginTop:5,fontWeight:"bold"}}>Aucun wallet ajoutée !</Text>
                      <View style={{ marginTop: 15, alignItems: 'center' }}>
                        <ButtonE
                            loading={this.state.btnAddWallet}
                            onPress={() => {
                              this.setState({btnAddWallet:true})
                              ELayerService.createWallet().then( res => {
                                let wallet = {adress:res.data.address,created_at:new Date(),nbToken:"100"};
                                firebase.database().ref("users/"+ this.state.uid).update({
                                  wallet:wallet
                                }).then( ok => {
                                  this.setState({btnAddWallet:false})
                                  showMessage({
                                    type:"success",
                                    message:"La création du wallet est effectuée avec succès"
                                  })
                                })

                              }).catch(err => alert(err))
                            }}
                            small={true}
                            title="Ajouter un wallet"
                            buttonStyle={{
                              padding: 5,
                              width: 160,
                              backgroundColor: defaultConfig.primaryColor,
                              borderWidth: 1,
                              borderColor: defaultConfig.primaryColor,
                              borderRadius: 60
                            }}
                            textStyle={{
                              color: "#fff",
                              letterSpacing: 1.11,
                              fontSize: 12,
                            }}
                        />
                      </View>
                    </View>
                  }
                </View>

                <ScrollView  nestedScrollEnabled>
                  {
                    this.state.user.wallet &&

                        <ListItem
                            hideChevron
                            title={this.state.user.wallet.adress.slice(0,8)+"......"+this.state.user.wallet.adress.substr(-8)}
                            subtitle={"Crée le "+moment(this.state.user.wallet.created_at).format("DD MMMM YYYY")}
                            containerStyle={styles.listItemContainer}
                            rightElement={
                              <Text style={{color:"#000",fontSize:12,fontWeight:"bold"}}>{"100 tokens"} </Text>
                            }
                            titleStyle={{fontWeight:"bold",fontSize:14}}
                            leftIcon={
                              <BaseIcon
                                  containerStyle={{
                                    backgroundColor: '#FFADF2',
                                  }}
                                  icon={{
                                    type: 'feather',
                                    name: 'briefcase',
                                    size:18
                                  }}
                              />
                            }
                        />
                  }
                </ScrollView>

              </View>

              <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 20, height: 2 }} />

              <View style={{marginTop:15}}>
                <View style={{marginLeft:20}}>
                  <Text style={{color:"#000",fontSize:18,fontWeight:"bold"}}>Mes transactions</Text>
                  {
                    (this.state.user.wallet.transactions === undefined || this.state.user.wallet.transactions === null)  &&
                    <View>
                      <Text style={{color:"red",fontSize:13,marginLeft:3,marginTop:5,fontWeight:"bold"}}>Aucune transaction effectuée !</Text>
                    </View>
                  }
                </View>

                <ScrollView  nestedScrollEnabled>
                  {
                    (this.state.user.wallet.transactions || []).map((tr,key) =>

                        <ListItem
                            hideChevron
                            title={tr.hash.slice(0,8)+"......"+tr.hash.substr(-8)}
                            subtitle={"Crée le "+moment(tr.created_at).format("DD MMMM YYYY hh:mm")}
                            containerStyle={styles.listItemContainer}
                            rightElement={
                              <Text style={{color:"#000",fontSize:12,fontWeight:"bold"}}>{tr.nbTokens + " tokens"} </Text>
                            }
                            titleStyle={{fontWeight:"bold",fontSize:14}}
                            leftIcon={
                              <BaseIcon
                                  containerStyle={{
                                    backgroundColor: 'green',
                                  }}
                                  icon={{
                                    type: 'feather',
                                    name: 'chevron-down',
                                    size:18
                                  }}
                              />
                            }
                            onPress={() => {
                              Linking.openURL("https://ropsten.etherscan.io/tx/"+tr.hash)
                            }}
                        />
                    )


                  }
                </ScrollView>

              </View>
              
              <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 40, height: 2 }} /> 
              
              <View style={{marginTop:20}}>
                <View style={{marginLeft:20}}>
                  <Text style={{color:"grey",fontSize:15}}>Historique des transferts</Text>
                  {
                    (this.state.user.histoTransfer === undefined || this.state.user.histoTransfer === null)  &&
                        <Text style={{color:"#C0C0C0",fontSize:13,marginLeft:3,marginTop:5}}>Liste vide</Text>
                  }
                </View>

                <ScrollView style={{height:height/2}} nestedScrollEnabled>
                  {
                    (this.state.user.histoTransfer || []).map((item,key) => (

                        <ListItem
                            hideChevron
                            title={"To "+item.toName}
                            subtitle={moment(item.created).format("MM-DD-YYYY")}
                            containerStyle={styles.listItemContainer}
                            rightElement={
                              <Text style={{color:"grey",fontSize:14}}>{" - " + item.montant + " €"} </Text>
                            }
                            leftIcon={
                              <BaseIcon
                                  containerStyle={{
                                    backgroundColor: '#FFADF2',
                                  }}
                                  icon={{
                                    type: 'material',
                                    name: 'redo',
                                  }}
                              />
                            }
                        />

                    ))
                  }
                </ScrollView>


              </View>

              <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 20, height: 2,marginBottom:20 }} /> 
              <StatusBar barStyle="light-content" />      
              <View style={chart.chartContainer}> 
                <LineChartView  
                  lineChartData={lineChartData}
                  lineChartConfig={lineChartConfig}
                  lineChartTables={lineChartTables}
                />
              </View>
            </View>
        }
      </ScrollView>
    );
  }
}



export default Comptes;