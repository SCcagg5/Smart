/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, ScrollView, Dimensions, Image, AsyncStorage} from 'react-native';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import {card} from '../../AppStyles';
import BackButton from '../../components/BackButton/BackButton';
import moment from 'moment';
import {Button, Icon, Text as TextNB} from "native-base";
import emptyLogo from "../../assets/images/emptyBondsLogo.jpg"
import * as firebase  from "firebase";
import DropdownAlert from "react-native-dropdownalert";
import currencyService from "../../provider/currencyService";

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

class bondDetails extends React.Component {

    static navigationOptions = ({navigation}) => {
        //const { params = {} } = navigation.state;  
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title=""/>,
            title: 'Détails',
            headerRight: <View/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user:"",
            bond: this.props.navigation.state.params.bond,
            showBuyBtn:true,
            showSellAndTransferBtn:false
        }
    }

    componentWillMount(){

        this.setState({loading:true});

        AsyncStorage.getItem("uid").then( value => {
            firebase.database().ref("users/" + value).on("value", (snapshot) => {
                let user = snapshot.val();
                let bonds = user.bonds || [];
                bonds.map((item,key) => {
                    if(item.bond.name === this.props.navigation.state.params.bond.name){
                        this.setState({showBuyBtn:false, showSellAndTransferBtn:true})
                    }
                });
                this.setState({ user: user,loading:false});
            });
        });
    }


    buyBond = () => {
        this.refs.scrolRef.scrollTo({x:0,y:0,animated:true});

        if(parseFloat(this.state.user.solde) < parseFloat(this.state.bond.montantPartBond)){
            this.dropDownAlertRef.alertWithType('error', 'Solde insuffisant',
                "Votre solde est insuffisant pour effectuer cette opération !");
        }else{

            this.setState({loading:true});
            let userBonds = this.state.user.bonds || [];
            userBonds.push({
                created:moment().format("YYYY-MM-DD"),
                bond:this.state.bond
            });
            firebase.database().ref("users/"+this.state.user.uid).update({
                "solde":(parseFloat(this.state.user.solde || "0") - parseFloat(this.state.bond.montantPartBond || "1")).toFixed(2),
                "bonds":userBonds
            }).then( ok => {
                this.dropDownAlertRef.alertWithType('success', 'Félicitation', "L'opération d'achat est effectué avec succès !");
                this.setState({showBuyBtn:false, showSellAndTransferBtn:true,loading:false})
            }).catch(err => alert(JSON.stringify(err)))

        }


    };


    render() {
        return (
            <ScrollView ref="scrolRef" style={styles.container}>
                {
                    this.state.loading === true ?

                        <Spinner
                            visible={this.state.loading}
                            textContent={''}
                        /> :

                        <View>
                            <View style={{marginTop: 15}}>
                                <View style={styles.facilitieContainer}>
                                    <Text style={styles.title}>Green Bonds Description</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <View style={{width: "20%"}}>
                                            {
                                                this.state.bond.logo ?
                                                    <Image style={card.itemIcon} source={{uri: this.state.bond.logo}}/> :
                                                    <Image style={card.itemIcon} source={emptyLogo}/>
                                            }

                                        </View>
                                        <View style={{width: "80%"}}>
                                            <View style={styles.itemTxtContainer}>
                                                <Text style={card.itemTitle}>{this.state.bond.name || this.state.bond.sName}</Text>
                                                <Text style={card.itemmText}>{this.state.bond.desc || this.state.bond.sBut}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 20}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Type of Assets</Text>
                                        </View>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.typeOfAssets || "income"} </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>brands</Text>
                                        </View>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.brands || this.state.bond.sName} </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Name</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.name || this.state.bond.sName} </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Minimal Holding period</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text
                                                style={{fontSize: 12}}>{moment(this.state.bond.minimalHoldingPeriod).format("DD-MM-YYYY")} </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Donc en durée minimum</Text>
                                        </View>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.sName ? "3 ans" : "2 ans"} </Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Minimum investment</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.minimumInvestment || "---"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Currency</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.currency || "CHF"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Transaction Fees</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.transactionFees || "0" + " %"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Interest Rate & return</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text
                                                style={{fontSize: 12}}>{this.state.bond["interestRate&return"] || this.state.bond.tauxInteret + "% p.a"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Interest distribution</Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.interestDistr || "annualy"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Reason to choose the investment </Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.reasonToChoose || "---"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Minimal Holding & notice period </Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text
                                                style={{fontSize: 12}}>{"Minimum holding until " + moment(this.state.bond.minimalHoldingDate).format("DD-MM-YYYY") + " with " +
                                            this.state.bond.minimalHoldingNoticePeriod + " notice"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>termination details </Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.terminationDetails || "---"}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Subscription deadline </Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text
                                                style={{fontSize: 12}}>{moment(this.state.bond.subscriptionDeadline).format("DD-MM-YYYY")}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Final Maturity </Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text
                                                style={{fontSize: 12}}>{moment(this.state.bond.finalMaturity).format("DD-MM-YYYY")}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: "row", marginLeft: 20, marginRight: 10, marginTop: 5}}>
                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>Country </Text>
                                        </View>

                                        <View style={{width: "50%"}}>
                                            <Text style={{fontSize: 12}}>{this.state.bond.country || "Word"}</Text>
                                        </View>
                                    </View>


                                </View>


                            </View>
                            <View>
                                <View style={styles.facilitieContainer}>
                                    <Text style={styles.title}>Actions</Text>
                                    <View style={{flexDirection: "row", marginLeft: "5%", marginRight: "5%", marginBottom: 20}}>
                                        <View style={{width: "33%"}}>
                                            <Button primary rounded style={{alignSelf: "center"}} disabled={this.state.showBuyBtn === false}
                                                    onPress={this.buyBond}>
                                                <Icon name='add'/>
                                            </Button>
                                            <Text style={{
                                                fontSize: 14,
                                                color: this.state.showBuyBtn === true ? "blue" : "grey",
                                                alignSelf: "center",
                                                fontWeight: "bold"
                                            }}>Acheter</Text>
                                        </View>
                                        <View style={{width: "33%"}}>
                                            <Button primary rounded style={{alignSelf: "center"}} disabled={this.state.showSellAndTransferBtn === false}>
                                                <Icon name='remove'/>
                                            </Button>
                                            <Text style={{
                                                fontSize: 14,
                                                color: this.state.showSellAndTransferBtn === true ? "blue" : "grey",
                                                alignSelf: "center",
                                                fontWeight: "bold"
                                            }}>Vendre</Text>
                                        </View>
                                        <View style={{width: "33%"}}>
                                            <Button primary rounded style={{alignSelf: "center"}} disabled={this.state.showSellAndTransferBtn === false}
                                                    onPress={() => this.props.navigation.navigate("TransferBondFirstScreen", {bond: this.state.bond})}>
                                                <Icon name='loop' type="MaterialIcons"/>
                                            </Button>
                                            <Text style={{
                                                fontSize: 14,
                                                color: this.state.showSellAndTransferBtn === true ? "blue" : "grey",
                                                alignSelf: "center",
                                                fontWeight: "bold"
                                            }}>Transférer</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>

                            <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                        </View>

                }


            </ScrollView>
        );
    }
}


export default bondDetails;
