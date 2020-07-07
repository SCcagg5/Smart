/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, TextInput, Text, ScrollView, Dimensions, Image, StyleSheet, TouchableOpacity, Linking, AsyncStorage } from 'react-native';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import { account, card } from '../../AppStyles';
import defaultConfig from "../../constants/defaultConfig"
import BackButton from '../../components/BackButton/BackButton';
import BaseIcon from '../../components/Icon'
import Contacts from 'react-native-contacts';
import Spinner from 'react-native-loading-spinner-overlay';
import { ButtonGroup, Divider, Avatar, Input, Icon } from "react-native-elements"
import TextAvatar from "react-native-text-avatar"
import moment from 'moment';
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import DropdownAlert from 'react-native-dropdownalert';

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

class sendLinkAmountScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;  
        return {
            headerLeft: <BackButton onPress={() => navigation.popToTop()} title="" />,
            title: "Partager de lien",
            headerRight: <View />
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            contact: this.props.navigation.state.params.contact,
            amount: this.props.navigation.state.params.amount,
            countryCode: "FR",
            countryCodeNumber: "33",
            url: "http://51.15.229.251:89/pay/"+this.props.navigation.state.params.urlKey
        };
    }

    componentWillMount() {

        AsyncStorage.getItem("user").then(value => {

            this.setState({ user: JSON.parse(value) })
            this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                "Le transfert est bien validé !");
        })

    }




    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={account.facilitieContainer}>

                    <View style={{ marginTop: 80, justifyContent: "center" }}>

                        <Text style={{ alignSelf: "center", color: "#000", fontSize: 16 }}>
                            Envoyer ce lien à {this.state.contact.displayName}
                        </Text>
                        <Text style={{ alignSelf: "center", color: "#000", fontSize: 16 }}>
                            afin qu'il puisse l'utiliser pour recevoir
                        </Text>
                        <Text style={{ alignSelf: "center", color: "#000", fontSize: 16 }}>
                            la sommme et visualiser le document de transfer
                        </Text>

                        <View style={{ marginLeft: 30, marginRight: 30, marginTop: 40 }}>
                            <Text style={{ alignSelf: "center", color: defaultConfig.primaryColor, fontSize: 16 }}>
                                {this.state.url}
                            </Text>
                        </View>

                    </View>
                    <View style={{ marginLeft: 15, marginTop: 30 }}>

                        <Text style={{ color: "grey", fontSize: 16 }}>Envoyer le lien</Text>
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <View style={{ width: "100%" }}>

                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        marginLeft: "1%",
                                        marginRight: "1%",
                                        width: "8%"
                                    }}>
                                        <CountryPicker
                                            onSelect={(country) => {

                                                this.setState({ countryCode: country.cca2, countryCodeNumber: country.callingCode })

                                            }}
                                            countryCode={this.state.countryCode}
                                            withCallingCode
                                            withAlphaFilter
                                            withEmoji
                                            withFlagButton
                                            withFlag
                                        />
                                    </View>
                                    <Hoshi
                                        borderColor={'transparent'}
                                        maskColor={'#FFF'}
                                        editable={false}
                                        style={{
                                            width: "85%"
                                        }}
                                        keyboardType="phone-pad"
                                        inputStyle={{
                                            fontSize: 13,
                                            fontWeight: "bold",
                                            color: "#000"
                                        }}
                                        value={this.state.contact.phoneNumbers[0].number.startsWith("+") === true ? this.state.contact.phoneNumbers[0].number :
                                            "+" + this.state.countryCodeNumber + " " + this.state.contact.phoneNumbers[0].number}
                                    />
                                </View>

                            </View>

                        </View>


                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <View style={{ width: "33.3%" }}>
                                <TouchableOpacity onPress={() => {
                                    let userName = "";
                                    if (this.state.user.displayName === undefined || this.state.user.displayName === null)
                                        userName = this.state.user.fullname;
                                    else
                                        userName = this.state.user.displayName;

                                    let phone = "";
                                    if (this.state.contact.phoneNumbers[0].number.startsWith("+") === true)
                                        phone = this.state.contact.phoneNumbers[0].number;
                                    else
                                        phone = "+" + this.state.countryCodeNumber + " " + this.state.contact.phoneNumbers[0].number;


                                    let text = userName + " vient de vous envoyer " + this.state.amount + " € via l'application C+E-." + "\n\n" +
                                        "Recervez ces fonds en utilisant ce lien :" + "\n" + this.state.url + "\n\n" + "Merci !"
                                    let url = 'whatsapp://send?text=' + text + '&phone=' + phone;
                                    Linking.openURL(url).then((data) => {
                                        alert(JSON.stringify(data));
                                    }).catch((err) => {
                                        alert('Assurez-vous que Whatsapp est installé sur votre appareil');
                                    });

                                }}>
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 60,
                                            resizeMode: "contain",
                                            alignSelf: "center",
                                            borderWidth: 2,
                                            borderColor: "#F0F0F0"
                                        }}
                                        source={require('../../assets/images/whatsupLogo.jpg')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "33.3%" }}>
                                <TouchableOpacity onPress={() => {
                                    let userName = "";
                                    if (this.state.user.displayName === undefined || this.state.user.displayName === null)
                                        userName = this.state.user.fullname;
                                    else
                                        userName = this.state.user.displayName;
                                    let body = userName + " vient de vous envoyer " + this.state.amount + " € via l'application C+E-." + "\n\n" +
                                        "Recervez ces fonds en utilisant ce lien :" + "\n" + this.state.url + "\n\n" + "Merci !"

                                    let url = 'mailto:' + '' + "?subject=C+E- Argent reçu&body=" + body;
                                    Linking.openURL(url).then((data) => {
                                        alert(JSON.stringify(data));
                                    }).catch((err) => {
                                        alert('Assurez-vous que Gmail est installé sur votre appareil');
                                    });

                                }}>
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 60,
                                            resizeMode: "contain",
                                            alignSelf: "center",
                                            borderWidth: 2,
                                            borderColor: "#F0F0F0"
                                        }}
                                        source={require('../../assets/images/gmailLogo.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "33.3%" }}>
                                <TouchableOpacity onPress={() => {
                                    let userName = "";
                                    if (this.state.user.displayName === undefined || this.state.user.displayName === null)
                                        userName = this.state.user.fullname;
                                    else
                                        userName = this.state.user.displayName;
                                    let phone = "";
                                    if (this.state.contact.phoneNumbers[0].number.startsWith("+") === true)
                                        phone = this.state.contact.phoneNumbers[0].number;
                                    else
                                        phone = "+" + this.state.countryCodeNumber + " " + this.state.contact.phoneNumbers[0].number;

                                    let body = userName + " vient de vous envoyer " + this.state.amount + " € via l'application C+E-." + "\n\n" +
                                        "Recervez ces fonds en utilisant ce lien :" + "\n" + this.state.url + "\n\n" + "Merci !"

                                    let url = 'sms:' + phone + "?body=" + body;  
                                    Linking.openURL(url).then((data) => {

                                        alert(JSON.stringify(data));
                                    }).catch((err) => {
                                        alert(err);
                                    });

                                }}>
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 60,
                                            resizeMode: "contain",
                                            alignSelf: "center",
                                            borderWidth: 2,
                                            borderColor: "#F0F0F0"
                                        }}
                                        source={require('../../assets/images/smsLogo.jpg')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </View>

                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

            </ScrollView>
        );
    }
}



export default sendLinkAmountScreen;
