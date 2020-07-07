/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, FlatList, Text, ScrollView, Dimensions, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import { account } from '../../AppStyles';
import { Button, Icon, Text as TextNB } from "native-base";
import defaultConfig from "../../constants/defaultConfig"
import BackButton from '../../components/BackButton/BackButton';
import BaseIcon from '../../components/Icon'
import StripeCheckout from "../../customComponents/rn-stripe-webview"
import { Overlay } from 'react-native-elements';
import { Input, Icon as IconRNE } from 'react-native-elements';
import verifForms from "../../tools/verifForms"
import * as firebase from "firebase";

const { width, height } = Dimensions.get('window');

class chooseAddPayementMethod extends React.Component {

    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;  
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title="" />,
            title: "Ajout d'argent",
            headerRight: <View />
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            showStripe: false,
            showAmountModal: false,
            user: "",
            amount: ""
        }
    }

    componentWillMount() {
        AsyncStorage.getItem("uid").then(value => {

            firebase.database().ref("users/" + value).on("value", (snapshot) => {
              let user = snapshot.val();
              this.setState({ user: user });
            });
      
          });
    }

    onPaymentSuccess = (token) => {
        console.log(token);
        this.setState({ showStripe: false });
        firebase.database().ref("users/"+this.state.user.uid).update({
            "solde":(parseFloat(this.state.user.solde || "0") + parseFloat(this.state.amount)).toFixed(2)
        }).then( ok => {
            this.props.navigation.goBack();  
        }).catch(err => alert(JSON.stringify(err)))     

    }

    onClose = () => {
        alert("Opération annulée !")
        this.setState({ showStripe: false })
    }




    render() {
        if (this.state.showStripe === true) {
            return (
                <StripeCheckout
                    publicKey="pk_test_hiPNdlAKoA1OtzgcI7a4Wx7I00RqtRPDLL"
                    amount={parseFloat(this.state.amount) * 100}
                    imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
                    storeName="Carbone+Invest-"
                    description=""
                    currency="EUR" 
                    allowRememberMe={false}
                    prepopulatedEmail={this.state.user.email}  
                    onClose={this.onClose}
                    onPaymentSuccess={this.onPaymentSuccess}
                    style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: height }}
                />
            )
        } else {

            return (
                <ScrollView style={styles.container}>
                    <View style={account.facilitieContainer}>
                        <View style={{ alignItems: "center", marginLeft: 15, marginRight: 15 }}>

                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "bold", marginTop: 20, letterSpacing: 0.2 }}>
                                Choisissez comment ajouter
                            </Text>
                            <Text style={{ fontSize: 17, color: "#000", fontWeight: "bold", marginTop: 5, letterSpacing: 0.2 }}>
                                de l'argent
                            </Text>

                        </View>
                        <View style={{ marginLeft: 10, marginTop: 40 }}>
                            <Text style={{ color: "grey", fontSize: 12, fontWeight: "bold" }}>Cartes actuelles</Text>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ width: "23%" }}>
                                    <BaseIcon
                                        containerStyle={{
                                            backgroundColor: '#F1F5F8',
                                            color: "#698DAF"
                                        }}
                                        icon={{
                                            type: 'material',
                                            name: 'account-balance',
                                        }}
                                    />
                                </View>
                                <View style={{ width: "60%" }}>
                                    <Text style={{ color: "grey", fontSize: 11, fontWeight: "bold", alignSelf: "center" }}>
                                        Pas de cartes actuellement. Rajouter une carte ( voir ci-dessous )
                                    </Text>
                                </View>
                                <View style={{ width: "20%" }}>
                                    <Icon name='error-outline' type="MaterialIcons" style={{ alignSelf: "center", color: defaultConfig.primaryColor }} />
                                </View>

                            </View>

                        </View>

                        <View style={{ marginLeft: 10, marginTop: 60 }}>
                            <Text style={{ color: "grey", fontSize: 12, fontWeight: "bold" }}>Autres moyens</Text>
                            <View style={{ flexDirection: "row", marginTop: 20 }}>
                                <View style={{ width: "23%" }}>
                                    <BaseIcon
                                        containerStyle={{
                                            backgroundColor: defaultConfig.primaryColor,
                                        }}
                                        icon={{
                                            type: 'material',
                                            name: 'account-balance',
                                        }}
                                    />
                                </View>
                                <View style={{ width: "77%" }}>
                                    <Text style={{ color: defaultConfig.primaryColor, fontSize: 14, fontWeight: "bold" }}>
                                        Transférer de l'argent sur votre compte
                                    </Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ showAmountModal: true })
                                    }}>
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 60,
                                                resizeMode: "contain",
                                                alignSelf: "center",
                                                borderWidth: 2,
                                                borderColor: "#F0F0F0"
                                            }}
                                            source={require('../../assets/images/stripeLogo.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("RevolutAddPayment")}>
                                    <Image
                                        style={{
                                            width: 100,
                                            height: 60,
                                            resizeMode: "contain",
                                            alignSelf: "center",
                                            borderWidth: 2,
                                            borderColor: "#F0F0F0"
                                        }}
                                        source={require('../../assets/images/revolutLogo.jpg')}
                                    />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginTop: 15 }}>

                                <Image
                                    style={{
                                        width: 100,
                                        height: 60,
                                        resizeMode: "contain",
                                        alignSelf: "center",
                                        borderWidth: 2,
                                        borderColor: "#F0F0F0"
                                    }}
                                    source={require('../../assets/images/plaidLogo.png')}
                                />

                            </View>


                        </View>

                        <View style={{ marginLeft: 10, marginTop: 30 }}>


                            <Text style={{ color: "grey", fontSize: 12, fontWeight: "bold" }}>Ajouter une carte</Text>
                            <TouchableOpacity>

                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                    <View style={{ width: "23%" }}>
                                        <BaseIcon
                                            containerStyle={{
                                                backgroundColor: defaultConfig.primaryColor,
                                            }}
                                            icon={{
                                                type: 'material',
                                                name: 'credit-card',
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: "70%" }}>
                                        <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold" }}>
                                            Ajouter une carte de débit ou de crédit
                                    </Text>
                                    </View>

                                </View>

                            </TouchableOpacity>


                        </View>
                    </View>
                    <Overlay isVisible={this.state.showAmountModal}
                        onBackdropPress={() => this.setState({ showAmountModal: false })}
                        height={height / 3}
                        width={width - 100}
                    >
                        <Text style={{ alignSelf: "center", color: defaultConfig.primaryColor, fontSize: 16, fontWeight: "bold", marginTop: 15 }}>
                            Montant à transférer sur </Text>
                        <Text style={{ alignSelf: "center", color: defaultConfig.primaryColor, fontSize: 16, fontWeight: "bold" }}>
                            votre compte</Text>
                        <View style={{ marginTop: 15 }}>
                            <Input placeholder='Montant'
                                keyboardType="number-pad"
                                onChangeText={ value => this.setState({ amount: value })}
                                //errorStyle={{ color: 'red' }}
                                //errorMessage={this.state.amount === "" ? "Format invalide !" : false} 
                                leftIcon={
                                    <IconRNE
                                        name='money'
                                        size={24}
                                        type="font-awesome"
                                        color={defaultConfig.primaryColor}
                                    />
                                }
                                rightIcon={
                                    <Text style={{fontWeight:"bold",fontSize:16}}>€</Text>
                                }
                            />
                            <View style={{marginTop:35}}>  

                                <Button rounded small danger style={{alignSelf:"flex-end" }}
                                onPress={() => {
                                    this.setState({showAmountModal:false});
                                    setTimeout(() => {
                                        this.setState({showStripe:true})
                                    },300);
                                }}
                                disabled={verifForms.verif_Number(this.state.amount)} >  

                                <TextNB style={{textTransform:"capitalize"}} > Valider </TextNB>       

                                </Button>  

                            </View>

                        </View>
                    </Overlay>
                </ScrollView>
            );

        }

    }
}



export default chooseAddPayementMethod;
