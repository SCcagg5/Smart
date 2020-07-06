import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Card,

} from 'react-native';


import SmartService from '../../provider/SmartService'

import {Container, Content, Header} from "native-base";

import * as firebase from "firebase";


import StripeCheckout from "../../customComponents/rn-stripe-webview"








class stripeWebView extends Component {
    constructor () {
        super()

        this.state = {
            search: '',
            selectedIndex:1,
            wines:[],
            quantite:1,
            total:"",
            recette:"",
            cmdtoken:"",
            crdtoken:""


        }
    }

    componentDidMount(): void {
        const {recette,quantite,total,cmdtoken,crdtoken} = this.props.navigation.state.params

        this.setState({recette:recette,quantite:quantite,total:total,cmdtoken:cmdtoken,crdtoken:crdtoken})

    }



    onPaymentSuccess = (tokenn) => {
        let token = JSON.parse(tokenn)
        let data = {"chr_token":token.id}

        console.log("card  "+token.card.id)


        fetch('https://api.smartdom.ch/order/',
            {
                method:'POST',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },
                body:JSON.stringify({ "cmd_token":this.props.navigation.state.params.cmdtoken,
                    "crd_token":this.props.navigation.state.params.crdtoken})





            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                console.log(data)


                   this.props.navigation.replace('Wines')


            }else{

                console.log(data)
            }


        })


        token.achat={
            name:this.state.recette.nom,
            prix:this.state.total,
            quantite:this.state.quantite,

        }
        firebase.database().ref("payment/").push({
            token
        })
    }

    onClose = () => {

        this.props.navigation.goBack()

    }


    render() {



        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content >









                    <View style={{height:"100%"}}>





                            <StripeCheckout

                                style={{height:Dimensions.get("screen").height}}
    publicKey="pk_test_DzPutapEGMVUdss4QraUUYyA"
    amount={this.state.total * 100}
    imageUrl="https://firebasestorage.googleapis.com/v0/b/quinsac-55271.appspot.com/o/images%2Flogo.PNG?alt=media&token=636ccd35-e026-4141-8f47-c6495b01d595"
    storeName="Wine One"
    description="Wine One"
    currency="CHF"
    allowRememberMe={false}

    onClose={this.onClose}
    onPaymentSuccess={this.onPaymentSuccess}


    />









                    </View>

















                </Content>
            </Container>
        );
    }
}

export default stripeWebView;
