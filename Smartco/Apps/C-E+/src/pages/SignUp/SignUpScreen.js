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
            password: '',
            btnSpinner: false,
            countryCode: "FR",
            countryCodeNumber:"+33"
        };
    }

    //Firebase login with email and password
    _signup = async () => {
        this.setState({     
            btnSpinner: true
        });

        firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password).then(res => {

            firebase.database().ref('users/' + res.user.uid).set({
                uid: res.user.uid,
                fullname: this.state.firstname + " " + this.state.lastname,
                email: this.state.email,
                phone:"+"+this.state.countryCodeNumber + this.state.phoneNumber,
                adress:this.state.adress,
                created: moment(new Date()).format("YYYY-MM-DD")
            }).then( result => {

                this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                    "Votre inscription est affectuée avec succès");

                setTimeout(() => {
                    this.props.navigation.goBack();
                }, 2000);


            });

        }).catch(err => {
            this.setState({
                btnSpinner: false,
            });
            if (err.code === "auth/invalid-email") {
                this.dropDownAlertRef.alertWithType('error', 'Une erreur est survenue', "Adresse mail incorrect !");
            }
            else if (err.code === "auth/weak-password") {
                this.dropDownAlertRef.alertWithType('error', 'Une erreur est survenue', "Mot de passe trop court !");
            }
            else if(err.code === "auth/email-already-in-use"){
                this.dropDownAlertRef.alertWithType('error', 'Une erreur est survenue', "Cette adresse mail est déja utilisée  !");
            }
            else{  
                alert(err.code) 
            }
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
                    <View style={{ marginTop: '10%' }} />

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
                            width: "100%",

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
                        onChangeText={adress =>
                            this.setState({ adress })
                        }
                        label={'Adresse'}
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
                        onChangeText={password =>
                            this.setState({ password })
                        }
                        secureTextEntry={true}
                        label={'Password'}
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
                            disabled={verifForms.verif_inpuText(this.state.firstname) || verifForms.verif_inpuText(this.state.lastname) ||
                                verifForms.verif_Email(this.state.email) || verifForms.verif_inpuText(this.state.password) || 
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


