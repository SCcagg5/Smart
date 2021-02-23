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
import defaultConfig from "../../../constants/defaultConfig";
import DropdownAlert from 'react-native-dropdownalert';
import moment from "moment";
import verifForms from "../../../tools/verifForms";
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';
import SmartService from "../../../provider/SmartService";
import { showMessage, hideMessage } from "../../../../custom_modules/react-native-flash-message/src";

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

export default class SignUpScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTransparent: 'true'
    });

    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            phoneNumber:'',
            email: '',
            password1: '',
            password2: '',
            btnSpinner: false,
            countryCode: "FR",
            countryCodeNumber:"+33"
        };
    }

    //Firebase login with email and password
    _signup = () => {
        this.setState({btnSpinner: true});

        SmartService.getToken().then( res => {
            if (res.succes === true && res.status === 200) {

                console.log("token "+res.data.token)
                SmartService.register({email:this.state.email.trim().toLowerCase(),
                    password1: this.state.password1,password2: this.state.password2},res.data.token).then( result => {
                    console.log(result)
                    if (result.succes === true && result.status === 200) {

                        SmartService.updateUserInfo({
                            email:this.state.email,
                            firstname:this.state.firstname,
                            lastname:this.state.lastname,
                            phone:this.state.countryCodeNumber+" "+this.state.phoneNumber
                        },res.data.token,result.data.usrtoken).then( r => {
                            console.log(r)
                            if (r.succes === true && r.status === 200) {
                                showMessage({
                                    message: "Félicitation",
                                    description:"Votre inscription est bien effectuée, Vous pouvez maintenant se connecter en utilisant votre mot de passe ",
                                    type: "success", icon:"success"
                                });
                                setTimeout(() => {this.props.navigation.goBack()},2000);
                            }else {
                                alert("ERROR 1")
                                this.setState({btnSpinner: false});
                            }
                        }).catch( err => {
                            alert("ERROR 2")
                            this.setState({btnSpinner: false});})

                    }else {
                        console.log(result.error)
                        alert(result.error)
                        this.setState({btnSpinner: false});
                    }
                }).catch(err => {
                    console.log(err)
                    alert(err)
                    this.setState({btnSpinner: false});
                })

            } else {
                alert(res.error,"5")
                this.setState({btnSpinner: false});
            }
        }).catch(err => {
            alert(err,"6")
            this.setState({btnSpinner: false});
        })

    };

    onPressFacebookButton = () => {
        this.props.navigation.navigate('');
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={styles.container}>

                    <View style={{
                        alignItems: 'center',marginTop:15
                    }}>
                        <Image
                            style={{
                                width: 200,
                                height: 150,
                                resizeMode:"contain"
                            }}
                            source={require('../../../assets/images/rocket_logo.jpeg')}
                        />
                    </View>
                    <View/>

                    <Hoshi
                        onChangeText={firstname =>
                            this.setState({ firstname })
                        }
                        label={'Nom'}
                        borderColor={'#3690C1'}
                        maskColor={'#FFF'}
                        borderHeight={3}
                        inputPadding={16}
                        style={{
                            width: "100%"
                        }}
                        inputStyle={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: "#000"
                        }}
                    />

                    <Hoshi
                        onChangeText={lastname =>
                            this.setState({ lastname })
                        }
                        label={'Prénom'}
                        borderColor={'#3690C1'}
                        maskColor={'#FFF'}
                        style={{
                            width: "100%"
                        }}
                        inputStyle={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: "#000"
                        }}
                    />

                    <Hoshi
                        onChangeText={email =>
                            this.setState({ email })
                        }
                        label={'Email'}
                        borderColor={'#3690C1'}
                        maskColor={'#FFF'}
                        style={{
                            width: "100%"
                        }}
                        inputStyle={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: "#000"
                        }}
                    />

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
                    </View>

                    <Hoshi
                        onChangeText={password1 =>
                            this.setState({ password1 })
                        }
                        secureTextEntry={true}
                        label={'Mot de passe'}
                        borderColor={'#3690C1'}
                        maskColor={'#FFF'}
                        style={{
                            width: "100%"
                        }}
                        inputStyle={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: "#000"
                        }}
                    />

                    <Hoshi
                        onChangeText={password2 =>
                            this.setState({ password2 })
                        }
                        secureTextEntry={true}
                        label={'Ressaisir votre mot de passe'}
                        borderColor={'#3690C1'}
                        maskColor={'#FFF'}
                        style={{
                            width: "100%"
                        }}
                        inputStyle={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: "#000"
                        }}
                    />

                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <Button
                            loading={this.state.btnSpinner}
                            disabled={verifForms.verif_inpuText(this.state.firstname.trim()) || verifForms.verif_inpuText(this.state.lastname.trim()) ||
                                verifForms.verif_Email(this.state.email.trim()) || verifForms.verif_inpuText(this.state.password) ||
                                verifForms.verif_Number(this.state.phoneNumber) || verifForms.verif_inpuText(this.state.adress)}
                            onPress={() => this._signup()} 
                            large={true} 
                            title="S'inscrire"
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

                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />


                </ScrollView>


            </TouchableWithoutFeedback>


        );
    }
}


