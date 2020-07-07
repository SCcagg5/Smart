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
    StyleSheet, PermissionsAndroid,
} from 'react-native';
import styles from './styles';
import { Button, SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import defaultConfig from "../../constants/defaultConfig";
import DropdownAlert from 'react-native-dropdownalert';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import moment from "moment";
import { GoogleSignin } from '@react-native-community/google-signin';
import Contacts from "react-native-unified-contacts";


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

export default class LogInScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTransparent: 'true'
    });

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            btnSpinner: false,
            loadingFbBtn: false,
            loadingGoogleBtn: false
        };
    }



    componentWillMount() {
        GoogleSignin.configure({
            webClientId: '240735399678-0r4mjcft98og71sj4clqo3qec22u36b7.apps.googleusercontent.com'
        });
    }

    //Firebase login with email and password
    _login = async () => {
        this.setState({
            btnSpinner: true
        });

        await firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password).then(res => {
            let user = firebase.auth().currentUser;
            AsyncStorage.setItem('uid', user.uid);

            firebase.database().ref('/users/' + user.uid).on('value', (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    AsyncStorage.setItem('user', JSON.stringify(data));
                    this.setState({
                        btnSpinner: false
                    });
                    this.props.navigation.navigate('Comptes');
                }
            });
        }).catch(err => {

            this.setState({ btnSpinner: false });

            if (err.code === "auth/invalid-email") {
                this.dropDownAlertRef.alertWithType('error', 'Une erreur est survenue', "Adresse mail incorrect !");
            }
            if (err.code === "auth/wrong-password") {
                this.dropDownAlertRef.alertWithType('error', 'Une erreur est survenue', "Mot de passe incorrect !");
            }
            if (err.code === "auth/user-not-found") {
                this.dropDownAlertRef.alertWithType('error', 'Une erreur est survenue', "Utilisateur non trouvé !\"");
            }
        });
    };

    //Firebase facebook Login
    onPressFacebookButton = () => {
        this.setState({ loadingFbBtn: true });
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            (result) => {
                if (result.isCancelled) {
                    alert("oprération annulée");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                            firebase.auth().signInWithCredential(credential).then(data => {

                                firebase.database().ref("users/" + data.user.uid).update({
                                    'uid': data.user.uid,
                                    'fullname': data.user.displayName,
                                    'email': data.user.email,
                                    'photoURL': data.user.photoURL,
                                    'created': moment(new Date()).format("YYYY-MM-DD")
                                }).then(result => {
                                    AsyncStorage.setItem('uid', data.user.uid);
                                    
                                    this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                                        "La connexion avec Facebook est effectuée avec succès");
                                    setTimeout(() => {

                                        firebase.database().ref("users/"+ data.user.uid).on("value", (snapshot) => {
                                            this.setState({ loadingFbBtn: false });
                                            let user = snapshot.val();
                                            AsyncStorage.setItem('user', JSON.stringify(user));
                                            if(user.phone && user.phone !== ""){ 
                                                this.props.navigation.navigate("Comptes");
                                            }else{
                                                this.props.navigation.navigate("RegisterPhoneNumber");
                                            }
                                        });
                                        
                                    }, 1500);

                                })
                            }).catch(err => {
                                alert(JSON.stringify(err));
                                this.setState({ loadingFbBtn: false });
                            })
                        }
                    )
                }
            },
            (error) => {
                alert("Login fail with error: " + error);
                this.setState({ loadingFbBtn: false });
            }
        );
    };

    //Firebase Google Login
    onPressGoogleButton = () => {
        this.setState({ loadingGoogleBtn: true });
        GoogleSignin.signIn().then(result => {
            GoogleSignin.getTokens().then(tokens => {   

                const credential = firebase.auth.GoogleAuthProvider.credential(tokens.idToken, tokens.accessToken);
                firebase.auth().signInWithCredential(credential).then(data => {

                    firebase.database().ref("users/" + data.user.uid).update({
                        'uid': data.user.uid,
                        'fullname': data.user.displayName,
                        'email': data.user.email,
                        'photoURL': data.user.photoURL,
                        'created': moment(new Date()).format("YYYY-MM-DD")
                    }).then(result => {
                        AsyncStorage.setItem('uid', data.user.uid);
                        this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                            "La connexion avec Google est effectuée avec succès");
                        setTimeout(() => {

                            firebase.database().ref("users/"+ data.user.uid).on("value", (snapshot) => {
                                this.setState({ loadingFbBtn: false });
                                let user = snapshot.val();
                                AsyncStorage.setItem('user', JSON.stringify(user));
                                if(user.phone && user.phone !== ""){
                                    this.props.navigation.navigate("Comptes");
                                }else{
                                    this.props.navigation.navigate("RegisterPhoneNumber");
                                }
                            });
                        }, 1500);

                    })
                }).catch(err => {
                    this.setState({ loadingGoogleBtn: false });
                    alert(JSON.stringify(err))
                })
            });
        })
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
                    <TextInput
                        style={stylesSh.textInput}
                        placeholder="Email"
                        label="Email"
                        underlineColorAndroid="transparent"
                        onChangeText={email =>
                            this.setState({ email })
                        }
                        value={this.state.email}
                    />
                    <TextInput
                        style={stylesSh.textInput}
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        underlineColorAndroid="transparent"
                        onChangeText={password =>
                            this.setState({ password })
                        }
                        secureTextEntry={true}
                        value={this.state.password}
                    />

                    <View style={{ marginTop: 40, alignItems: 'center' }}>
                        <Button
                            loading={this.state.btnSpinner}
                            disabled={false}
                            onPress={() => this._login()}
                            large={true}
                            title="Connexion"
                            buttonStyle={{
                                padding: 10,
                                width: 300,
                                backgroundColor: defaultConfig.primaryColor,
                                borderWidth: 1,
                                borderColor: defaultConfig.primaryColor,
                                borderRadius: 60
                            }}
                            textStyle={{
                                color: "#fff",
                                letterSpacing: 1.11,
                                fontSize: 24,
                            }}
                        />
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 20,
                        marginBottom: 25,
                        fontWeight: 'bold'
                    }}>
                        Ou bien
                    </Text>
                    <SocialIcon
                        onPress={() => this.onPressFacebookButton()}
                        title={this.state.loadingFbBtn === true ? ' ' : 'Se connecter avec Facebook'}
                        button
                        type='facebook'
                        loading={this.state.loadingFbBtn}
                    />
                    <SocialIcon
                        onPress={() => this.onPressGoogleButton()}
                        title={this.state.loadingGoogleBtn === true ? ' ' : 'Se connecter avec Google'}
                        button
                        type='google'
                        loading={this.state.loadingGoogleBtn}
                    />

                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />


                </ScrollView>


            </TouchableWithoutFeedback>


        );
    }
}


