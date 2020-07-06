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
    Alert
} from 'react-native';
import  {Text as TT}   from 'react-native-svg'

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {Button} from "react-native-elements";

import {Container, Content, Header} from "native-base";

import CreditCard from "../../../custom_modules/react-native-credit-card";
import DropdownAlert from "react-native-dropdownalert";






const STRIPE_PUBLISHABLE_KEY = 'pk_test_DzPutapEGMVUdss4QraUUYyA';

class addCard extends Component {
    constructor () {
        super()

        this.state = {
            search: '',
            selectedIndex:1,
            user:"",
            card:"",
            validCard:false,
            btnspinner:false



        }
    }

    componentDidMount() {



    }

    addcard(){

        this.setState({btnspinner:true})

        let form = this.state.card

        const card = {
            'card[number]': form.values.number.replace(/ /g, ''),
            'card[exp_month]': form.values.expiry.split('/')[0],
            'card[exp_year]': form.values.expiry.split('/')[1],
            'card[cvc]': form.values.cvc
        };

        fetch('https://api.stripe.com/v1/tokens', {
            headers: {
                // Use the correct MIME type for your server
                Accept: 'application/json',
                // Use the correct Content Type to send data to Stripe
                'Content-Type': 'application/x-www-form-urlencoded',
                // Use the Stripe publishable key as Bearer
                Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(card)
                .map(key => key + '=' + card[key])
                .join('&')
        }).then(response => response.json()).then(data =>{
            if (data.id.length>0){
                console.log("token"+data.id)
                fetch('https://api.smartdom.ch/addcard/',
                    {
                        method:'POST',
                        headers:{

                            "Cache-Control":"no-cache",
                            "Content-Type":"application/json",
                            "Accept":"*/*",
                            "Accept-Encoding":"gzip, deflate, br",
                            "Connection":"keep-alive",


                        },
                        body:JSON.stringify({"crd_token":data.id})





                    }).then(response => response.json()).then(data =>{
                    if (data.succes===true){
                        console.log(data)
                        this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                            "Votre carte a été ajouter avec success")

                        setTimeout(()=>{this.props.navigation.goBack()}, 1000)





                    }else{
                        this.setState({btnspinner:false})

                        console.log(data)
                    }


                })
            }
        });
    };



    _onChange(form)
    {console.log(form)
        this.setState({card:form,validCard:form.valid})
    };



    render() {

        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content style={{height: 100 }} >




                    <View style={{backgroundColor:"#a6a6a6",height:2 , width:"90%", marginRight:"auto",marginLeft:"auto",marginTop:"5%"}}/>





                    <ScrollView >

                        <CreditCardInput onChange={(form)=>{this._onChange(form)}} />

                        <View style={{flexDirection:"row",justifyContent:"center" ,marginTop:"10%"}}>
                            <Button
                                buttonStyle={{width:"100%"}}
                                loading={this.state.btnspinner}
                                title='Ajouter la carte'
                                disabled={this.state.validCard === false}
                                onPress={()=>this.addcard()}

                            />
                        </View>


                    </ScrollView>

















                </Content>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

            </Container>
        );
    }
}

export default addCard;
