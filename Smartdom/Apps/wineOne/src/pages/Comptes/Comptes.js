/* eslint-disable comma-dangle */
import React from 'react';
import {ActivityIndicator, AsyncStorage, Dimensions, Image, ScrollView, StyleSheet, Text, View,Modal,Alert,TouchableHighlight} from 'react-native';
import {Container, Content, Header} from "native-base";


import {Button, Icon, Text as TextNB} from "native-base";

import CreditCard from '../../../custom_modules/react-native-credit-card';
import { CheckBox } from 'react-native-elements'

import DropdownAlert from "react-native-dropdownalert";
import {LoginManager} from "react-native-fbsdk";
import RNRestart from "react-native-restart";

const {width, height} = Dimensions.get('window');

class Comptes extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            exchanges: [],
            solde: "",
            soldeCopy: "",
            selectedCurrency: "EUR",

            token :"",
            usrtoken:"",
            user:"",
            openModal:false,
            visa:true,
            master:false,
            data:"tok_visa"
        }
    }

    componentDidMount() {

        AsyncStorage.getItem("user").then(value => {
            this.setState({user: JSON.parse(value)})
        });

    }

    addcard(){




        if (this.state.master===true){
            let token={"crd_token":"tok_mastercard"}
            this.setState({data:token})
        }else{
           let  dd={"crd_token":"tok_visa"}
            this.setState({data:dd})

        }
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
                body:JSON.stringify({"crd_token":this.state.data})




            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                    "Votre carte a été ajouter avec success");
            }else{
                console.log(data)
            }


        })

    }


    render() {
        return (
            <Container>


                <Header style={{backgroundColor: "#fff", height: 68}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content style={{height: 100}}>

                    <View style={{marginLeft: 25, marginBottom: 15, marginTop: 20}}>
                        <CreditCard
                            type={null}

                            shiny={false}
                            bar={true}
                            focused={null}
                            number="7940869500574401"
                            name={this.state.user.firstname +" "+this.state.user.lastname}
                            expiry="01/22"
                            cvc="465"/>
                    </View>
                    <ScrollView>

                        <View style={{flexDirection: "row", marginLeft: "4%", marginRight: "4%"}}>
                            <View style={{width: "30%", height: 2, backgroundColor: "#F0F0F0", marginTop: 8}}/>
                            <View style={{width: "40%", alignItems: "center"}}>
                                <Text style={{
                                    color: "#389DC7",
                                    textTransform: "uppercase",
                                    fontWeight: "bold"
                                }}>Services</Text>
                            </View>
                            <View style={{width: "30%", height: 2, backgroundColor: "#F0F0F0", marginTop: 8}}/>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            marginLeft: "4%",
                            marginRight: "4%",
                            justifyContent: "center",
                            marginTop: "5%"
                        }}>
                            <Button onPress={()=>this.props.navigation.navigate("addcard")} style={{width: "80%", justifyContent: "center", backgroundColor: "white"}}
                                  >
                                <Text>ADD CARD
                                </Text>
                            </Button>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: "4%",
                            marginRight: "4%",
                            justifyContent: "center",
                            marginTop: "5%"
                        }}>
                            <Button  style={{width: "80%", justifyContent: "center", backgroundColor: "white"}}
                                    onPress={() => this.props.navigation.navigate('listcards')} >
                                <Text>List Cards</Text>
                            </Button>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: "4%",
                            marginRight: "4%",
                            justifyContent: "center",
                            marginTop: "5%"
                        }}>
                            <Button onPress={()=>this.props.navigation.navigate("Wines")} style={{width: "80%", justifyContent: "center", backgroundColor: "white"}}>
                                <Text>Wines</Text>
                            </Button>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            marginLeft: "4%",
                            marginRight: "4%",
                            justifyContent: "center",
                            marginTop: "5%",
                            marginBottom: "3%"
                        }}>

                            <Button style={{width: "80%", justifyContent: "center", backgroundColor: "white"}}>
                                <View style={{flexDirection: "column", alignItems: "center"}}>
                                    <Text>********** </Text>

                                </View>


                            </Button>

                        </View>
                        <View style={{flexDirection: "row", marginLeft: "4%", marginRight: "4%"}}>
                            <View style={{width: "30%", height: 2, backgroundColor: "#F0F0F0", marginTop: 8}}/>
                            <View style={{width: "40%", alignItems: "center"}}>
                                <Text style={{
                                    color: "#389DC7",
                                    textTransform: "uppercase",
                                    fontWeight: "bold"
                                }}>shop</Text>
                            </View>
                            <View style={{width: "30%", height: 2, backgroundColor: "#F0F0F0", marginTop: 8}}/>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            marginLeft: "4%",
                            marginRight: "4%",
                            justifyContent: "center",
                            marginTop: "5%",
                            marginBottom: "5%"
                        }}>
                            <Button onPress={() => this.props.navigation.navigate("scan")}
                                    style={{width: "80%", justifyContent: "center", backgroundColor: "white"}}>
                                <Text>Achat </Text>
                            </Button>
                        </View>


                    </ScrollView>

                </Content>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />



            </Container>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:"70%"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Comptes;
