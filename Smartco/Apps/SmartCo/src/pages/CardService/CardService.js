import React from 'react';
import {View, ActivityIndicator, Image, AsyncStorage, TouchableOpacity, Text} from "react-native";
import {Container,Header,Content} from "native-base";
import CreditCard from '../../../custom_modules/react-native-credit-card';
import SmartService from "../../provider/SmartService";

export default class CardService extends React.Component{

    state={
        user:""
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            this.setState({user: user});
            SmartService.getActioByMail(user.email).then( actio => {
                //console.log(actio);
            }).catch(err => console.log(err))
        });
    }

    render() {
        return(
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68}}>
                    <Image style={{width: 100, height: 45, marginTop: 10,resizeMode:"contain"}}
                           source={require('../../assets/images/logoSmartCo.jpeg')}/>
                </Header>
                <Content>
                    <View>
                        <View style={{marginLeft: 25, marginBottom: 15, marginTop: 20}}>
                            <CreditCard
                                type={null}
                                logo={require("../../assets/images/logoSmartCo.jpeg")}
                                cardName={"Carte SmartCo"}
                                //imageFront={require('../../assets/images/cardBackgGreen.png')}
                                //imageBack={require('../../assets/images/cardBackgGreen.png')}
                                shiny={false}
                                bar={true}
                                focused={null}
                                number="2541369400579981"
                                name={this.state.user.firstname + ' ' + this.state.user.lastname || "---"}
                                expiry="01/22"
                                cvc="159"/>
                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate("JitsiiMeet")}>
                            <Text style={{fontSize:20,fontWeight:"bold",color:"red"}}>Lancer Jitsii</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        )
    }

}

