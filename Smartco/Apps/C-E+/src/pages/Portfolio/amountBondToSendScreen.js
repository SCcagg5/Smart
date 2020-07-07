/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, TextInput, Text, ScrollView, Dimensions, Image, StyleSheet, AsyncStorage } from 'react-native';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import { account, card } from '../../AppStyles';
import { Button, Icon, Text as TextNB } from "native-base";
import defaultConfig from "../../constants/defaultConfig"
import BackButton from '../../components/BackButton/BackButton';
import BaseIcon from '../../components/Icon'
import Contacts from 'react-native-contacts';
import Spinner from 'react-native-loading-spinner-overlay';
import { ButtonGroup, Divider, Avatar, Input } from "react-native-elements"
import TextAvatar from "react-native-text-avatar"
import moment from 'moment';
import * as firebase from "firebase"
import verifForms from '../../tools/verifForms';
import maillingService from "../../provider/maillingservice"
import { Overlay, Icon as IconRNE } from 'react-native-elements';
import ELayerService from "../../provider/ELayerService";


const { width, height } = Dimensions.get('window');

const stylesSh = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        alignSelf: 'center',
        width: "100%",
        padding: 10,
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 2,
        borderColor: 'lightgray'
    }
});

class amountBondToSendScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;  
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title="" />,
            title: "Montant à transférer",
            headerRight: <View />
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            contact: this.props.navigation.state.params.contact,
            contactMail: "",
            contactAdress: "",
            bond: this.props.navigation.state.params.bond,
            amount: "",
            user: "",
            showContactMailtModal: false
        };
    }

    componentWillMount() {
        this.setState({ loading: true })
        //alert(JSON.stringify(this.state.bond))
        AsyncStorage.getItem("uid").then(value => {
            firebase.database().ref("users/" + value).on("value", (snapshot) => {
                let user = snapshot.val();
                this.setState({ user: user, loading: false });

                /*setTimeout(() => {
                    ELayerService.transfer({to:"0x832a1Cbf3a0a45B628e50A4D635768606596DefD",amount:parseInt(this.state.amount)},this.state.user.wallet.adress).then( r => {
                        alert(JSON.stringify(r))
                    }).catch(err => alert(JSON.stringify(err)))
                },1000);*/
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

                        <View style={account.facilitieContainer}>

                            <View style={{ marginLeft: 15, marginTop: "15%" }}>
                                <Text style={{ color: "grey", textTransform: "capitalize", fontWeight: "bold", fontSize: 18 }}>à</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>

                                {
                                    this.state.contact.thumbnailPath === "" ?
                                        <TextAvatar
                                            backgroundColor={
                                                Math.floor(Math.random() * 5) === 1 ? "#E91E63" :
                                                    Math.floor(Math.random() * 5) === 2 ? "#2196F3" :
                                                        Math.floor(Math.random() * 5) === 3 ? "#9C27B0" :
                                                            Math.floor(Math.random() * 5) === 4 ? "#3F51B5" :
                                                                Math.floor(Math.random() * 5) === 5 ? "#00BCD4" : "#F44336"
                                            }
                                            textColor={'#fff'}
                                            size={60}
                                            type={'circle'}

                                        >
                                            {this.state.contact.displayName}
                                        </TextAvatar> :

                                        <Avatar
                                            size={100}
                                            rounded
                                            source={{ uri: this.state.contact.thumbnailPath }}
                                        />
                                }
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", marginTop: 10 }}>{this.state.contact.displayName} </Text>

                                <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 20, height: 3 }} />


                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "30%" }}>
                                        <View style={styles.itemTxtContainer}>
                                            <Text style={card.itemTitle}>{this.state.bond.name}</Text>
                                            <Text style={card.itemmText}>{this.state.bond.desc}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "20%" }}>
                                        <View style={styles.itemTxtContainer}>
                                            <Text style={card.itemTitle}>{this.state.bond.montantPartBond ? this.state.bond.montantPartBond + " CHF" : this.state.bond.sigleToken || "***" }</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "40%" }}>

                                        <Input
                                            keyboardType="number-pad"
                                            onChangeText={value => this.setState({ amount: value })}
                                            rightIcon={
                                                <Text style={{ fontWeight: "bold", fontSize: 12 }}>{this.state.bond.currency}</Text>
                                            }
                                            containerStyle={{ marginTop: -12 }}
                                        />

                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <View style={{ width: "40%" }}>

                                        <View style={account.greenProcentContainer}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#34936A',
                                                fontSize: 10,
                                                fontWeight: 'bold'
                                            }}>
                                                {this.state.bond.percentPerYear ? this.state.bond.percentPerYear + '%' : this.state.bond.Montant +" tokens"}
                                            </Text>
                                        </View>

                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <View style={styles.itemTxtContainer}>
                                            <Text style={{ color: "grey", fontSize: 12, marginTop: 10 }}>{moment(this.state.bond.minimalHoldingPeriod).format("DD-MM-YYYY")}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: "30%" }}>
                                        <View style={styles.itemTxtContainer}>
                                            <Text style={{ color: "red", fontSize: 12, marginTop: 10 }}>1 token = 1 CHF</Text>
                                        </View>
                                    </View>
                                </View>


                            </View>

                            <View style={{ marginRight: 20, marginLeft: 20, marginTop: 80 }}>

                                {
                                    (parseFloat(this.state.user.solde) < parseFloat(this.state.amount)) &&
                                    <Text style={{ color: "red", alignSelf: "center", marginBottom: 10 }}>Votre solde est insuffisant pour ce transfert !</Text>

                                }

                                <Button rounded block style={{ backgroundColor: "#EA008D" }}
                                    disabled={verifForms.verif_Number(this.state.amount) || parseFloat(this.state.user.solde) < parseFloat(this.state.amount)}
                                    onPress={() => {

                                        this.setState({ loading: true });

                                        let histoTransfer = this.state.user.histoTransfer || [];
                                        histoTransfer.push({
                                            created: moment(new Date()).format("YYYY-MM-DD"),
                                            toPhoneNumber: this.state.contact.phoneNumbers[0].number,
                                            toName: this.state.contact.displayName,
                                            montant: this.state.amount,
                                            bond: this.state.bond
                                        });

                                        maillingService.verifSmartCoUser({
                                            email: this.state.user.email, 
                                            displayName: this.state.user.displayName || this.state.user.fullname,
                                            type: "sender",
                                            senderAmount: this.state.amount,
                                            senderBond: this.state.bond.name,
                                            senderAdress: this.state.user.adress,       
                                            recieverAdress: this.state.contactAdress,
                                            reciever: this.state.contact.displayName, 
                                            password: "123456",   
                                        }).then( verif => {


                                            maillingService.addPayUrl({
                                                recieverMail: "",      
                                                senderName: this.state.user.displayName || this.state.user.fullname,
                                                amount: this.state.amount,
                                                recieverName: this.state.contact.displayName,
                                                recieverPhone: this.state.contact.phoneNumbers[0].number,
                                                senderAdress: this.state.user.adress,
                                                greenBond: this.state.bond.name,
                                                coffreId:verif.key
                                            }).then( res => {

                                                ELayerService.transfer({to:"0x832a1Cbf3a0a45B628e50A4D635768606596DefD",amount:parseInt(this.state.amount)},this.state.user.wallet.adress).then( r => {
                                                    //alert(JSON.stringify(r))
                                                    let transactions = this.state.user.wallet.transactions || [];
                                                    transactions.push({
                                                        hash:r.data.transact,
                                                        created_at:new Date(),
                                                        nbTokens:this.state.amount,

                                                    })
                                                    firebase.database().ref('users/'+this.state.user.uid+"/wallet/").update({
                                                        'nbToken':(parseInt(this.state.user.wallet.nbToken)-parseInt(this.state.amount)).toString(),
                                                        'transactions':transactions
                                                    }).then( o => {

                                                        firebase.database().ref("users/" + this.state.user.uid).update({
                                                            'solde': (parseFloat(this.state.user.solde) - parseFloat(this.state.amount)).toFixed(2),
                                                            'histoTransfer': histoTransfer
                                                        }).then(ok => {
                                                            this.setState({ loading: false });
                                                            this.props.navigation.navigate("SendLinkAmountScreen", { contact: this.state.contact, amount: this.state.amount, urlKey:res.data })
                                                        }).catch(err => {
                                                            this.setState({ loading: false });
                                                            alert(JSON.stringify(err))
                                                        })

                                                    })

                                                }).catch(err => alert(JSON.stringify(err)))
                                             


                                            })


                                        });

                                    }}>
                                    <TextNB style={{ color: "#fff", fontWeight: "bold", textTransform: "capitalize" }}>Envoyer</TextNB>

                                </Button>

                            </View>

                        </View>
                }


                <Overlay isVisible={this.state.showContactMailtModal}
                    onBackdropPress={() => this.setState({ showContactMailtModal: false })}
                    height={(height / 3) + 20}
                    width={width - 100}
                >
                    <Text style={{ alignSelf: "center", color: defaultConfig.primaryColor, fontSize: 16, fontWeight: "bold", marginTop: 15 }}>
                        Veuillez indiquer l'adresse</Text>
                    <Text style={{ alignSelf: "center", color: defaultConfig.primaryColor, fontSize: 16, fontWeight: "bold" }}>
                        et le mail du destinataire </Text>
                    <View style={{ marginTop: 15 }}>
                        <Input placeholder='Email'
                            onChangeText={value => this.setState({ contactMail: value })}
                            leftIcon={
                                <IconRNE
                                    name='at'
                                    size={24}
                                    type="font-awesome"
                                    color={defaultConfig.primaryColor}
                                />
                            }
                        />
                        <Input placeholder='Adresse'
                            onChangeText={value => this.setState({ contactAdress: value })}
                            leftIcon={
                                <IconRNE
                                    name='map-marker'
                                    size={24}
                                    type="font-awesome"
                                    color={defaultConfig.primaryColor}
                                />
                            }
                        />
                        <View style={{ marginTop: 35 }}>

                            <Button rounded small danger style={{ alignSelf: "flex-end" }}
                                onPress={() => {
                                    this.setState({ showContactMailtModal: false });
                                }}
                                disabled={verifForms.verif_Email(this.state.contactMail) || verifForms.verif_inpuText(this.state.contactAdress)} >

                                <TextNB style={{ textTransform: "capitalize" }} > Valider </TextNB>

                            </Button>

                        </View>

                    </View>
                </Overlay>


            </ScrollView>
        );
    }
}



export default amountBondToSendScreen;
