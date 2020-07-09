import React from 'react';
import {View, ActivityIndicator, Image, AsyncStorage, TouchableOpacity, Text} from "react-native";
import {Container,Header,Content} from "native-base";
import CreditCard from '../../../custom_modules/react-native-credit-card';
import SmartService from "../../provider/SmartService";
import DesignedLogo from "../../components/logo/designedLogo";

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
                    <View style={{alignContent:"center",justifyContent:"center"}}>
                        <DesignedLogo/>
                    </View>
                </Header>
                <Content>
                    <View>
                        <View style={{marginLeft: 25, marginBottom: 15, marginTop: 20}}>
                            <CreditCard
                                type={null}
                                logo={require("../../assets/images/logoWineOne.png")}
                                cardName={"Carte SmartCo"}
                                shiny={false}
                                bar={true}
                                focused={null}
                                number="2541369400579981"
                                name={this.state.user.firstname + ' ' + this.state.user.lastname || "---"}
                                expiry="01/22"
                                cvc="159"/>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }

}

