import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    AsyncStorage,
    DeviceEventEmitter
} from "react-native";
import SmartService from "../../provider/SmartService";
import {Container, Content} from "native-base";
import DesignedLogo from "../../components/logo/designedLogo";
import Spinner from "react-native-loading-spinner-overlay";
import ItemContainer from "../../components/Products/ItemContainer";
import Basket from "../../components/Panier/Basket";
import {Header, Button} from "react-native-elements";
import Modal, {
    ModalContent
} from 'react-native-modals';
import {showMessage} from "../../../custom_modules/react-native-flash-message/src";

const {height, width} = Dimensions.get('window');

export default class ItemDetail extends React.Component {

    state = {
        loading: false,
        item: this.props.navigation.state.params.item,
        command: []
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('clearP', (e) => {
            this.setState({command: []})
        })
        SmartService.getToken().then(data => {
            if (data.succes === true && data.status === 200) {
                SmartService.getItems(data.data.token).then(items => {
                    AsyncStorage.getItem("command").then(command => {
                        let cmd = [];
                        if (command !== undefined && command !== null) {
                            cmd = JSON.parse(command);
                        }
                        this.setState({items: items.data || [], command: cmd})
                    })
                }).catch(err => console.log(err))
            } else {
                alert(data.error)
            }
        }).catch(err => console.log(err))

    }


    render() {
        return (
            <Container>
                <Header
                    containerStyle={{
                        height: 65,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20,
                        borderWidth:1
                    }}
                    leftComponent={{
                        icon: 'close', type: "material", color: '#000', onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                    /*rightComponent={<Basket value={this.state.command.length}
                                            onPress={() => this.props.navigation.navigate("Panier")}/>}*/
                    centerComponent={<Text
                        style={{fontWeight: "bold", fontSize: 15, color: "#000"}}>{this.state.item.title}</Text>}
                />
                <Content style={{backgroundColor: "#f0f0f0"}}>
                    <View style={{marginRight: 15, marginLeft: 15}}>
                        <View style={{marginTop: 20}}>
                            <View style={{padding: 15, backgroundColor: "#fff", borderRadius: 10}}>
                                <View>
                                    <Text style={{
                                        fontSize: 22,
                                        color: "#981b1a",
                                        fontWeight: "bold",
                                        alignSelf: "flex-end"
                                    }}>360 €</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 19, color: "#01BA54", fontWeight: "bold"}}>
                                        {
                                            this.state.item.id === "1" ? "Une bouteille" :
                                                this.state.item.id === "2" ? "4 bouteilles" :
                                                    this.state.item.id === "3" ? "1 caisse = 12 bouteilles" :
                                                        this.state.item.id === "4" ? "1 palette = 600 bouteilles" : ""


                                        }
                                    </Text>
                                </View>
                                <View style={{marginTop: 20}}>
                                    <View style={{flexDirection: "row"}}>
                                        <View style={{width: "100%"}}>
                                            <Image
                                                source={this.state.item.id === "1" ? require("../../assets/images/1bouteille.jpeg") :
                                                    this.state.item.id === "2" ? require("../../assets/images/4bouteille.jpeg") :
                                                        this.state.item.id === "3" ? require("../../assets/images/12bouteille.jpg") :
                                                            this.state.item.id === "4" ? require("../../assets/images/600bouteille.jpeg") : null}
                                                style={{
                                                    width: 160,
                                                    height: 200,
                                                    resizeMode: "stretch",
                                                    alignSelf: "center"
                                                }}/>
                                        </View>
                                    </View>
                                    {
                                        this.state.item.id !== "1" ?
                                            <View style={{marginTop: 20}}>
                                                <Text style={{
                                                    alignSelf: "center",
                                                    fontFamily: "sans-serif-medium",
                                                    fontSize: 15,
                                                    textTransform: "uppercase"
                                                }}>C'est l'équivalent à </Text>
                                                <View style={{marginTop: 20}}>
                                                    <View style={{flexDirection: "row"}}>
                                                        <Image
                                                            source={require("../../assets/icons/panneau-solaire.png")}
                                                            style={{
                                                                width: 150,
                                                                height: 150,
                                                                resizeMode: "contain",
                                                                marginLeft: 20
                                                            }}/>
                                                        <View style={{
                                                            backgroundColor: "#981b1a",
                                                            height: 30,
                                                            borderRadius: 20,
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: 5,
                                                            marginTop: 70,
                                                            marginLeft: -20
                                                        }}>
                                                            <Text style={{
                                                                color: "#fff",
                                                                fontFamily: "sans-serif-medium"
                                                            }}>
                                                                {
                                                                    this.state.item.id === "2" ? "1 panneaux solaires" :
                                                                        this.state.item.id === "3" ? "3 panneaux solaires" :
                                                                            this.state.item.id === "4" ? "150 panneaux solaires" : ""
                                                                }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>

                                            </View> :
                                            <View></View>
                                    }

                                </View>
                            </View>
                        </View>


                    </View>
                </Content>
            </Container>
        )
    }

}

