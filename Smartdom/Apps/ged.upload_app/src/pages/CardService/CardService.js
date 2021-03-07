import React from 'react';
import {View, Image, AsyncStorage, Text, ScrollView} from "react-native";
import {Container,Header,Content,Button} from "native-base";
import CreditCard from '../../../custom_modules/react-native-credit-card';
import defaultConfig from "../../constants/defaultConfig";

export default class CardService extends React.Component{

    state={
        user:"",
        pdfimage:""
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            console.log(value)
            this.setState({user:user})
        });
    }

    openImagePicker = ()  => {
        this.props.navigation.navigate("SelectedImages",{images:[]})
    }

    render() {
        return(
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68}}>
                    <Image style={{width: 100, height: 45, marginTop: 10,resizeMode:"contain"}}
                           source={require('../../assets/images/rocket_logo.jpeg')}/>
                </Header>
                <Content>
                    <View>
                        <View style={{marginLeft: 25, marginBottom: 15, marginTop: 10}}>
                            {
                                this.state.user !== "" &&
                                    <CreditCard
                                        type={null}
                                        logo={require("../../assets/images/rocket_logo.jpeg")}
                                        cardName={"Carte ROCKET"}
                                        shiny={false}
                                        bar={true}
                                        focused={null}
                                        number="2541369400579981"
                                        name={(this.state.user.firstname === null || this.state.user.lastname === null) ? this.state.user.email :
                                            this.state.user.firstname + ' ' + this.state.user.lastname}
                                        expiry="01/22"
                                        cvc="159"
                                        bgColor={defaultConfig.primaryColor}
                                    />
                            }

                        </View>
                        <ScrollView >

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
                                marginLeft: "7%",
                                marginRight: "10%",
                                flexDirection:"row",
                                marginTop: "5%"
                            }}>
                                <View style={{width:"75%"}}>
                                    <Button style={{width:"100%", backgroundColor: "white",paddingLeft:20}} onPress={() => {
                                        this.openImagePicker()
                                    }} >
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"25%"}}>
                                                <Image source={require('../../assets/images/card_services/mailbox.png')}
                                                       style={{width:25,height:25,objectFit:"contain"}}/>
                                            </View>
                                            <View style={{width:"75%"}}>
                                                <Text>Service courrier</Text>
                                            </View>
                                        </View>
                                    </Button>
                                </View>
                                <View style={{width:"25%",marginLeft:10}}>
                                    <Button style={{width:"100%", backgroundColor: "white",justifyContent:"center"}}>
                                        <Text style={{fontWeight:"bold",color:"#2069CB"}}>Oui</Text>
                                    </Button>
                                </View>

                            </View>

                            <View style={{
                                marginLeft: "7%",
                                marginRight: "10%",
                                flexDirection:"row",
                                marginTop: "5%"
                            }}>

                                <View style={{width:"75%"}}>
                                    <Button style={{width:"100%", backgroundColor: "white",paddingLeft:20}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"25%"}}>
                                                <Image source={require('../../assets/images/card_services/Mobile_application.png')}
                                                       style={{width:25,height:25,objectFit:"contain"}}/>
                                            </View>
                                            <View style={{width:"75%"}}>
                                                <Text>Service Ged</Text>
                                            </View>
                                        </View>
                                    </Button>
                                </View>
                                <View style={{width:"25%",marginLeft:10}}>
                                        <Button style={{width:"100%", backgroundColor: "white",justifyContent:"center"}}>
                                            <Text style={{fontWeight:"bold",color:"#2069CB"}}>Oui</Text>
                                        </Button>
                                </View>

                            </View>

                            <View style={{
                                marginLeft: "7%",
                                marginRight: "10%",
                                flexDirection:"row",
                                marginTop: "5%"
                            }}>
                                <View style={{width:"75%"}}>
                                    <Button style={{width:"100%", backgroundColor: "white",paddingLeft:20}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"25%"}}>
                                                <Image source={require('../../assets/images/card_services/interview.png')}
                                                       style={{width:25,height:25,objectFit:"contain"}}/>
                                            </View>
                                            <View style={{width:"75%"}}>
                                                <Text>Service Meet ( réunion ) </Text>
                                            </View>
                                        </View>
                                    </Button>
                                </View>
                                <View style={{width:"25%",marginLeft:10}}>
                                    <Button style={{width:"100%", backgroundColor: "white",justifyContent:"center"}}>
                                        <Text style={{fontWeight:"bold",color:"#2069CB"}}>Oui</Text>
                                    </Button>
                                </View>

                            </View>

                            <View style={{flexDirection: "row", marginLeft: "4%", marginRight: "4%",marginTop:13}}>
                                <View style={{width: "30%", height: 2, backgroundColor: "#F0F0F0", marginTop: 8}}/>
                                <View style={{width: "40%", alignItems: "center"}}>
                                    <Text style={{
                                        color: "#389DC7",
                                        textTransform: "uppercase",
                                        fontWeight: "bold"
                                    }}>EXPERTISE</Text>
                                </View>
                                <View style={{width: "30%", height: 2, backgroundColor: "#F0F0F0", marginTop: 8}}/>
                            </View>

                            <View style={{
                                marginLeft: "7%",
                                marginRight: "10%",
                                flexDirection:"row",
                                marginTop: "5%"
                            }}>
                                <View style={{width:"75%"}}>
                                    <Button style={{width:"100%", backgroundColor: "white",paddingLeft:20}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"25%"}}>
                                                <Image source={require('../../assets/images/card_services/adjustment.png')}
                                                       style={{width:25,height:25,objectFit:"contain"}}/>
                                            </View>
                                            <View style={{width:"75%"}}>
                                                <Text>Call a Fiduciaire</Text>
                                            </View>
                                        </View>

                                    </Button>
                                </View>
                                <View style={{width:"25%",marginLeft:10}}>
                                    <Button style={{width:"100%", backgroundColor: "white",justifyContent:"center"}}>
                                        <Text style={{fontWeight:"bold",color:"#2069CB"}}>Oui</Text>
                                    </Button>
                                </View>

                            </View>

                            <View style={{
                                marginLeft: "7%",
                                marginRight: "10%",
                                flexDirection:"row",
                                marginTop: "5%",
                                marginBottom:"2%"
                            }}>
                                <View style={{width:"75%"}}>
                                    <Button style={{width:"100%", backgroundColor: "white",paddingLeft:20}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"25%"}}>
                                                <Image source={require('../../assets/images/card_services/judgeKaterina.png')}
                                                       style={{width:25,height:25,objectFit:"contain"}}/>
                                            </View>
                                            <View style={{width:"75%"}}>
                                                <Text>Call a Lawyer</Text>
                                            </View>
                                        </View>
                                    </Button>
                                </View>
                                <View style={{width:"25%",marginLeft:10}}>
                                    <Button style={{width:"100%", backgroundColor: "white",justifyContent:"center"}}>
                                        <Text style={{fontWeight:"bold",color:"#2069CB"}}>Oui</Text>
                                    </Button>
                                </View>

                            </View>


                        </ScrollView>
                    </View>
                </Content>
            </Container>
        )
    }

}

