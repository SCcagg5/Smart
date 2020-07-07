/* eslint-disable comma-dangle */
import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Alert,
    AsyncStorage,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import styles from './styles';
import { Button, SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import defaultConfig from "../../constants/defaultConfig";
import DropdownAlert from 'react-native-dropdownalert';
import moment from "moment";
import verifForms from "../../tools/verifForms";
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';

const stylesSh = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default class registerPhoneNumber extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTransparent: 'true'
    });

    constructor(props) {
        super(props);

        this.state = {
        
            phoneNumber:'',
            btnSpinner: false,
            adress:"",
            countryCode: "FR",
            countryCodeNumber:"+33"
        };
    }


    _registerPhone = () => {

        this.setState({btnSpinner:true})

        AsyncStorage.getItem("uid").then( value => { 

            firebase.database().ref("users/"+ value).update({
                phone:"+"+this.state.countryCodeNumber + this.state.phoneNumber,
                adress:this.state.adress
            }).then( ok => {
                this.setState({btnSpinner:false});
                this.props.navigation.navigate("Home");
            })

        });

    };

    

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={styles.container}>

                    <View style={{
                        marginTop: 10,
                        alignItems: 'center'
                    }}>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                            }}
                            source={require('../../../assets/logoAppBank.jpeg')}
                        />
                    </View>
                    <View style={{ marginTop: '30%' }} />

                
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

                                    this.setState({ countryCode: country.cca2, countryCodeNumber:country.callingCode })

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
                            onChangeText={(value) => {
                                this.setState({ phoneNumber: value })
                            }}
                            label={'Numéro de téléphone'}
                            borderColor={'#3690C1'}
                            maskColor={'#FFF'}
                            style={{
                                width: "90%"
                            }}
                            keyboardType="phone-pad"
                            inputStyle={{
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000"
                            }}
                        />
                        <Hoshi
                            onChangeText={(value) => {
                                this.setState({ adress: value })
                            }}
                            label={'Adresse'}
                            borderColor={'#3690C1'}
                            maskColor={'#FFF'}
                            style={{
                                width: "90%"
                            }}
                            inputStyle={{
                                fontSize: 13,
                                fontWeight: "bold",
                                color: "#000"
                            }}
                        />
                    </View>


                    <View style={{ marginTop:60, alignItems: 'center' }}>
                        <Button
                            loading={this.state.btnSpinner}
                            disabled={ verifForms.verif_Number(this.state.phoneNumber)}
                            onPress={() => this._registerPhone()} 
                            large={true}   
                            title="Valider"
                            buttonStyle={{
                                padding: 10,
                                width: 300,
                                backgroundColor: defaultConfig.primaryColor,
                                borderRadius: 60
                            }}
                            textStyle={{
                                color: "#fff",
                                letterSpacing: 1.11,
                                fontSize: 24,
                            }}
                        />
                    </View>


                </ScrollView>


            </TouchableWithoutFeedback>


        );
    }
}


