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
import LinkedInModal from 'react-native-linkedin'

import SmartService from "../../provider/SmartService";
import  LinkedInService  from "../../provider/LinkedInService";

import {showMessage} from "../../../custom_modules/react-native-flash-message/src";

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
            loadingGoogleBtn: false,
            token:""
        };
    }



    componentWillMount() {



        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: '856473453678-bt47et2bn66af7rdnrr4tumol4g3ptir.apps.googleusercontent.com',
            androidClientId: '856473453678-h3h0uqpmb8m2jj6ehd8ljre2e12icn83.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        });

    }

    _login = () => {
        this.setState({btnSpinner: true});

        SmartService.getToken().then(res => {
            if (res.succes === true && res.status === 200) {

                SmartService.login({
                    email: this.state.email,
                    password1: this.state.password
                }, res.data.token).then(result => {
                    if (result.succes === true && result.status === 200) {
                        SmartService.getUserInfo(res.data.token, result.data.usrtoken).then(data => {
                            if (data.succes === true && data.status === 200) {
                                AsyncStorage.setItem('user', JSON.stringify(data.data));
                                this.setState({btnSpinner: false});
                                this.props.navigation.navigate('pinCode');
                            } else {
                                alert(data.error)
                                this.setState({btnSpinner: false});
                            }

                        }).catch(err => {
                            alert(err)
                            this.setState({btnSpinner: false});
                        })
                    } else {
                        alert(result.error);
                        this.setState({btnSpinner: false});
                    }
                }).catch(err => {
                    alert(err)
                    this.setState({btnSpinner: false});
                })
            } else {
                alert(res.error);
                this.setState({btnSpinner: false});
            }

        }).catch(err => {
            alert(err)
            this.setState({btnSpinner: false});
        })
    };

    onPressFacebookButton = () => {

        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            (result) => {
                if (result.isCancelled) {
                    alert("oprération annulée");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (d) => {
                            this.setState({loading: true});
                            let token = d.accessToken ;
                            console.log(d)
                            fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
                                .then((response) => response.json())
                                .then((json) => {
                                    console.log(json.email);
                                    SmartService.getToken().then( data => {
                                        if (data.succes === true && data.status === 200) {

                                            SmartService.login({
                                                email: json.email.toString(),
                                                password1: d.userID
                                            }, data.data.token).then( r => {

                                                console.log(r)

                                                if (r.succes === true && r.status === 200) {
                                                    console.log("OK 3")
                                                    SmartService.getUserInfo(data.data.token, r.data.usrtoken).then(infos => {
                                                        if (infos.succes === true && infos.status === 200) {
                                                            AsyncStorage.setItem('user', JSON.stringify(infos.data));
                                                            this.setState({loading: false});
                                                            this.props.navigation.navigate('pinCode')
                                                        } else {
                                                            alert(infos.error)
                                                            this.setState({loading: false});
                                                        }

                                                    }).catch(err => {
                                                        alert(err)
                                                        this.setState({loading: false});
                                                    })

                                                }
                                                if((r.status === 403 || r.status === 400) && r.succes === false){  // user don't fave an account
                                                    //Register user
                                                    console.log("OK 4")
                                                    SmartService.register({email:json.email.toString(),password1: d.userID,password2: d.userID},data.data.token).then( register => {
                                                        //console.log(register)
                                                        if (register.succes === true && register.status === 200) {

                                                            SmartService.updateUserInfo({
                                                                email:json.email,
                                                                firstname:json.name,
                                                                lastname:"",
                                                                phone:""
                                                            },data.data.token,register.data.usrtoken).then( r2 => {
                                                                console.log(r2)
                                                                if (r2.succes === true && r2.status === 200) {
                                                                    AsyncStorage.setItem("user",JSON.stringify(r2.data))
                                                                    this.setState({loading: false});
                                                                    showMessage({
                                                                        message: "Félicitation",
                                                                        description:"Votre identification avec Google est bien effectuée ",
                                                                        type: "success", icon:"success"
                                                                    });
                                                                    setTimeout(() => { this.props.navigation.navigate('PinCode'); },2500);
                                                                }else {
                                                                    alert("ERROR 1")
                                                                    this.setState({loading: false});
                                                                }
                                                            }).catch( err => {
                                                                alert("ERROR 2")
                                                                this.setState({loading: false});
                                                            })

                                                        }else {
                                                            console.log(register.error)
                                                            alert(register.error)
                                                            this.setState({loading: false});
                                                        }
                                                    }).catch(err => {
                                                        console.log(err)
                                                        alert(err)
                                                        this.setState({loading: false});
                                                    })

                                                }
                                            }).catch(err => alert(JSON.stringify(err)))
                                        }else{
                                        }

                                    }).catch( err => alert(JSON.stringify(err)))




                                })
                                .catch(() => {
                                    alert('ERROR GETTING DATA FROM FACEBOOK')
                                    this.setState({loading: false});
                                })
                        }
                    ).catch(err => alert(err))
                }
            },
            (error) => {
                alert("Impossible de vous indentifiez avec ce compte Facebook ! Veuillez essayer avec un autre compte");
                LoginManager.logOut();
                this.setState({loading: false});
            }
        );
    };
    onPressGoogleButton = () => {


        GoogleSignin.signIn().then( result => {
            let email = result.user.email;
            console.log(result);
            this.setState({loading:true});

            GoogleSignin.getTokens().then( tokens => {
                let token = result.user.id;

                SmartService.getToken().then( data => {
                    if (data.succes === true && data.status === 200) {

                        SmartService.login({
                            email: email,
                            password1: token
                        }, data.data.token).then( r => {

                            if (r.succes === true && r.status === 200) {
                                //console.log(r);
                                SmartService.getUserInfo(data.data.token, r.data.usrtoken).then(infos => {
                                    if (infos.succes === true && infos.status === 200) {
                                        AsyncStorage.setItem('user', JSON.stringify(infos.data));
                                        this.setState({loading: false});
                                        this.props.navigation.navigate('pinCode');
                                    } else {
                                        alert(infos.error)
                                        this.setState({loading: false});
                                    }

                                }).catch(err => {
                                    alert(err)
                                    this.setState({loading: false});
                                })

                            } else if (r.status === 403 && r.succes === false){  // user don't fave an account
                                //Register user
                                SmartService.register({email:email,password1: token,password2: token},data.data.token).then( register => {
                                    console.log(register)
                                    if (register.succes === true && register.status === 200) {

                                        SmartService.updateUserInfo({
                                            email:email,
                                            firstname:result.user.familyName,
                                            lastname:result.user.givenName,
                                            phone:""
                                        },data.data.token,register.data.usrtoken).then( r2 => {
                                            console.log(r2)
                                            if (r2.succes === true && r2.status === 200) {
                                                AsyncStorage.setItem("user",JSON.stringify(r2.data))
                                                this.setState({loading: false});
                                                showMessage({
                                                    message: "Félicitation",
                                                    description:"Votre identification avec Google est bien effectuée ",
                                                    type: "success", icon:"success"
                                                });
                                                setTimeout(() => { this.props.navigation.navigate('pinCode'); },2500);
                                            }else {
                                                alert("ERROR 1")
                                                this.setState({loading: false});
                                            }
                                        }).catch( err => {
                                            alert("ERROR 2")
                                            this.setState({loading: false});
                                        })

                                    }else {
                                        GoogleSignin.signOut();
                                        console.log(result.error)
                                        alert(result.error)
                                        this.setState({loading: false});
                                    }
                                }).catch(err => {
                                    GoogleSignin.signOut();
                                    console.log(err)
                                    alert(err)
                                    this.setState({loading: false});
                                })

                            }
                        }).catch(err => alert(JSON.stringify(err)))
                    }else{
                    }

                }).catch( err => alert(JSON.stringify(err)))

            }).catch(err => console.log(err))

        }).catch(err => console.log(err))

    };
    onPressLinkedInButton = (token) => {
        console.log(token)
        this.setState({loading:true});
        LinkedInService.getProfileEmail(token.access_token).then( resP => {
            let email = resP.elements[0]['handle~'].emailAddress
            LinkedInService.getProfileData(token.access_token).then( profile => {
                let fname = profile.localizedFirstName;
                let lname = profile.localizedLastName;
                let uid = profile.id;
                console.log(fname,lname,uid)

                SmartService.getToken().then( data => {
                    if (data.succes === true && data.status === 200) {

                        SmartService.login({
                            email: email,
                            password1: uid
                        }, data.data.token).then( r => {

                            if (r.succes === true && r.status === 200) {
                                console.log("Old user");

                                SmartService.getUserInfo(data.data.token, r.data.usrtoken).then(infos => {
                                    if (infos.succes === true && infos.status === 200) {
                                        AsyncStorage.setItem('user', JSON.stringify(infos.data));
                                        this.setState({loading: false});
                                        this.props.navigation.navigate('pinCode');
                                    } else {
                                        alert(infos.error)
                                        this.setState({loading: false});
                                    }

                                }).catch(err => {
                                    alert(err)
                                    this.setState({loading: false});
                                })

                            } else if (r.status === 403 && r.succes === false){  // user don't fave an account
                                //Register user
                                console.log("New user")

                                SmartService.register({email:email,password1: uid,password2: uid},data.data.token).then( register => {
                                    console.log(register)
                                    if (register.succes === true && register.status === 200) {

                                        SmartService.updateUserInfo({
                                            email:email,
                                            firstname:fname,
                                            lastname:lname,
                                            phone:""
                                        },data.data.token,register.data.usrtoken).then( r2 => {
                                            console.log(r2)
                                            if (r2.succes === true && r2.status === 200) {
                                                AsyncStorage.setItem("user",JSON.stringify(r2.data))
                                                this.setState({loading: false});
                                                showMessage({
                                                    message: "Félicitation",
                                                    description:"Votre identification avec LinkedIn est bien effectuée ",
                                                    type: "success", icon:"success"
                                                });
                                                setTimeout(() => { this.props.navigation.navigate('pinCode'); },2500);
                                            }else {
                                                alert("ERROR 1")
                                                this.setState({loading: false});
                                            }
                                        }).catch( err => {
                                            alert("ERROR 2")
                                            this.setState({loading: false});
                                        })

                                    }else {
                                        GoogleSignin.signOut();
                                        console.log(result.error)
                                        alert(result.error)
                                        this.setState({loading: false});
                                    }
                                }).catch(err => {
                                    GoogleSignin.signOut();
                                    console.log(err)
                                    alert(err)
                                    this.setState({loading: false});
                                })

                            }
                        }).catch(err => alert(JSON.stringify(err)))
                    }else{
                    }

                }).catch( err => alert(JSON.stringify(err)))


            }).catch(err => console.log(err))
        }).catch( err => console.log(err))
    }

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
                                width: "100%",
                                height: 50,
                            }}
                            source={require('../../assets/images/logo.png')}
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}>
                        <Text style={{
                            textAlign: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 10,
                            marginBottom: 5,
                            fontWeight: 'bold',
                            color:"blue",
                            textDecorationLine:"underline"
                        }}>
                            S'inscrire
                        </Text>
                    </TouchableOpacity>

                    <Text style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 10,
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
                        style={{borderRadius:0}}
                    />
                    <SocialIcon
                        onPress={() => this.onPressGoogleButton()}
                        title={this.state.loadingGoogleBtn === true ? ' ' : 'Se connecter avec Google'}
                        button
                        type='google'
                        loading={this.state.loadingGoogleBtn}
                        style={{borderRadius:0}}
                    />
                    <LinkedInModal
                        ref={ref => { this.modal = ref; }}
                        onError={err => console.log(err)}
                        clientID="775iikkoa4royh"
                        clientSecret="LxxFv3U1WzMLs9qc"
                        redirectUri="https://www.google.co.in/"
                        onSuccess={token => this.onPressLinkedInButton(token)}
                        permissions={["r_emailaddress","r_liteprofile"]}
                        renderButton={ () =>
                            <SocialIcon

                                onPress={() => this.modal.open()}
                                title={this.state.loadingFbBtn === true ? ' ' : 'Se connecter avec Facebook'}
                                button
                                type='linkedin'
                                loading={this.state.loadingFbBtn}
                                style={{borderRadius:0}}
                            />
                        }
                    />

                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />


                </ScrollView>


            </TouchableWithoutFeedback>


        );
    }
}


