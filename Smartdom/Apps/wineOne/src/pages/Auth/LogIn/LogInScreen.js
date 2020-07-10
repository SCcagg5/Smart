/* eslint-disable comma-dangle */
import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    AsyncStorage,
    Image,
    StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';
import styles from './styles';
import {Button, SocialIcon} from 'react-native-elements';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import CustomInput from "../../../components/Input/CustomInput";
import {showMessage} from "../../../../custom_modules/react-native-flash-message/src";
import Spinner from 'react-native-loading-spinner-overlay';
import SmartService from "../../../provider/SmartService";
import LinkedInModal from 'react-native-linkedin'
import LinkedInService from "../../../provider/LinkedInService";
import DesignedLogo from "../../../components/logo/designedLogo";

const {height, width} = Dimensions.get('window');
const stylesSh = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        alignSelf: 'center',
        width: "100%",
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
    static navigationOptions = ({navigation}) => ({
        headerTransparent: 'true'
    });

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            btnSpinner: false,
            loading:false
        };
    }


    componentDidMount() {
        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: '482572690350-237ofi91scou39m75vlrqffcg0rgbphu.apps.googleusercontent.com',
            androidClientId: '482572690350-237ofi91scou39m75vlrqffcg0rgbphu.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        });
    }

    //Firebase login with email and password
    _login = () => {
        this.setState({btnSpinner: true});

        SmartService.getToken().then(res => {
            if (res.succes === true && res.status === 200) {
                SmartService.login({
                    email: this.state.email.trim().toLowerCase(),
                    password1: this.state.password
                }, res.data.token).then(result => {
                    if (result.succes === true && result.status === 200) {
                        SmartService.getUserInfo(res.data.token, result.data.usrtoken).then( data => {

                            if (data.succes === true && data.status === 200) {

                                SmartService.getUserWallets(res.data.token,result.data.usrtoken).then( wallets => {
                                    if (wallets.succes === true && wallets.status === 200) {

                                        AsyncStorage.setItem('user', JSON.stringify(data.data));
                                        AsyncStorage.setItem('pwd', this.state.password);
                                        AsyncStorage.setItem('wallet', wallets.data.accounts[0]);
                                        this.setState({btnSpinner: false});
                                        this.props.navigation.navigate('PinCode');

                                    }else{
                                        alert(wallets.error)
                                        this.setState({btnSpinner: false});
                                    }
                                }).catch(err => {
                                    alert(data.error)
                                    this.setState({btnSpinner: false});
                                })

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

    //Firebase facebook Login
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

                                                //console.log(r)

                                                if (r.succes === true && r.status === 200) {
                                                    console.log("OK 3")
                                                    SmartService.getUserInfo(data.data.token, r.data.usrtoken).then(infos => {
                                                        if (infos.succes === true && infos.status === 200) {

                                                            SmartService.getUserWallets(data.data.token,r.data.usrtoken).then( wallets => {
                                                                if (wallets.succes === true && wallets.status === 200) {
                                                                    AsyncStorage.setItem('user', JSON.stringify(infos.data));
                                                                    AsyncStorage.setItem('pwd', d.userID);
                                                                    this.setState({loading: false});
                                                                    this.props.navigation.navigate('PinCode');
                                                                }else{
                                                                    alert(wallets.error)
                                                                    this.setState({loading: false});
                                                                }
                                                            })

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
                                                                    AsyncStorage.setItem("pwd",d.userID)
                                                                    this.setState({loading: false});
                                                                    showMessage({
                                                                        message: "Félicitation",
                                                                        description:"Votre identification avec Facebook est bien effectuée ",
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
    // Google Login
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
                                                AsyncStorage.setItem('pwd', token);
                                                this.setState({loading: false});
                                                this.props.navigation.navigate('PinCode');
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
                                                        AsyncStorage.setItem('pwd', token);
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
                                        AsyncStorage.setItem('pwd', uid);
                                        this.setState({loading: false});
                                        this.props.navigation.navigate('PinCode');
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
                                                AsyncStorage.setItem('pwd', uid);
                                                this.setState({loading: false});
                                                showMessage({
                                                    message: "Félicitation",
                                                    description:"Votre identification avec LinkedIn est bien effectuée ",
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
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Chargement...'}
                        textStyle={{color:"#fff",fontSize:16}}
                        overlayColor="rgba(0, 0, 0, 0.6)"
                    />
                    <View style={{alignItems:"center",marginTop:80}}>
                        <DesignedLogo/>
                    </View>
                    <View style={{marginTop: '25%'}}/>
                    <CustomInput value={this.state.email} placeholder={"Email"} height={50}
                                 onChangeText={email => this.setState({email})}
                                 lefticon="at-sign" lefticonColor="grey"
                    />
                    <View style={{marginTop: 15}}>
                        <CustomInput value={this.state.password} placeholder={"Votre mot de passe"} height={50}
                                     onChangeText={password => this.setState({password})}
                                     lefticon="lock" lefticonColor="grey" secureTextEntry={true}
                        />
                    </View>

                    <View style={{marginTop: 50, alignItems: 'center'}}>
                        <Button title="Connexion" loading={this.state.btnSpinner}
                            //disabled={this.state.email === "" || this.state.password === ""}
                                buttonStyle={{width: (width / 2 + 50), height: 45, backgroundColor: "#981B1A"}}
                                titleStyle={{fontSize: 14, color: "#fff", fontWeight: "bold"}}
                                onPress={() => this._login()}
                        />
                    </View>
                    <Text style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 5,
                        fontWeight: 'normal', fontSize: 12
                    }}>
                        Vous n'avez pas encore un compte
                    </Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("SignUp")
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginBottom: 10,
                            fontWeight: 'bold', fontSize: 13, textDecorationLine: "underline"
                        }}>
                            S'inscrire
                        </Text>
                    </TouchableOpacity>

                    <Text style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 30,
                        marginBottom: 10,
                        fontWeight: 'bold'
                    }}>
                        Ou se connecter avec
                    </Text>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>

                        <SocialIcon
                            onPress={() => this.onPressGoogleButton()}
                            type='google'
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
                                    type='linkedin'
                                />
                            }
                        />
                        <SocialIcon
                            onPress={() => this.onPressFacebookButton()}
                            type='facebook'
                        />

                    </View>



                </ScrollView>
            </TouchableWithoutFeedback>


        );
    }
}


