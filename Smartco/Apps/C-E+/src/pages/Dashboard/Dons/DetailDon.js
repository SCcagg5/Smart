/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    ScrollView,
    Image,
    Text as TextReact,
    TouchableOpacity,
    Switch,
    Alert, AsyncStorage
} from 'react-native';
import {Avatar} from "react-native-elements"
import BackButton from "../../../components/BackButton/BackButton";
import donBtn from "../../../assets/icons/donBtn.png"
import annulerBtn from "../../../assets/icons/annulerBtn.png"
import monnaieIcon from "../../../assets/icons/monnaie.png";
import * as firebase from "firebase";

export default class DetailDon extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title=""/>,
            title: "Détail",
            headerRight: <View/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            don: this.props.navigation.state.params.don,
            user:""
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("uid").then(value => {
            firebase.database().ref("users/" + value).on("value", (snapshot) => {
                let user = snapshot.val();
                this.setState({ user: user });
            });
        });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={{marginRight: 15, marginLeft: 15, alignItems: "center", marginTop: 40}}>
                        <Avatar
                            size="large"
                            rounded
                            source={this.state.don.image}
                            overlayContainerStyle={{backgroundColor: "#fff"}}
                        />
                        <View style={{marginTop: 20}}>
                            <Text style={{
                                color: "#000",
                                fontSize: 16,
                                alignSelf: "center"
                            }}>{this.state.don.title} </Text>
                            <Text style={{
                                marginTop: 15,
                                fontWeight: "bold",
                                fontSize: 32,
                                color: "#000",
                                alignSelf: "center"
                            }}>
                                {parseFloat(this.state.don.montant).toFixed(2) + " €"} </Text>
                        </View>
                    </View>
                    <View style={{
                        marginRight: 20,
                        marginLeft: 20,
                        marginTop: 35,
                        height: 2,
                        backgroundColor: "#F0F0F0"
                    }}/>
                    <View style={{marginTop: 20, flexDirection: "row", marginLeft: 30, marginRight: 30}}>
                        <View style={{width: this.state.don.montant === "0" ? "100%" : "50%"}}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("MiseEnPlaceDon", {don: this.state.don})}>
                                <Image source={donBtn} style={{width: 60, height: 60, alignSelf: "center"}}/>
                                <Text style={{color: "#EC008D", marginTop: 5, alignSelf: "center"}}>Faire un don</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.don.montant !== "0" &&
                            <View style={{width: "50%"}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Confirmer vous l'arrêt de vos dons ?",
                                            "Appuyez sur « Arrêter » ou modifier le montant de vos donsen appuyant sur " +
                                            "« Annuler », puis sur « Faire un don »",
                                            [
                                                {
                                                    text: 'Annuler',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Arrêter', onPress: () => {
                                                        let dons = this.state.user.dons || [];
                                                        let donsPm = this.state.user.donsPm || [];
                                                        dons.splice(dons.findIndex(x => x.to === this.state.don.title),1);
                                                        donsPm.splice(donsPm.findIndex(x => x.to === this.state.don.title),1);
                                                        firebase.database().ref("users/"+this.state.user.uid).update({
                                                            "dons": dons,
                                                            "donsPm":donsPm
                                                        }).then( ok => {
                                                            this.props.navigation.pop(2)
                                                        }).catch(err => alert(JSON.stringify(err)))
                                                    }
                                                },
                                            ],
                                            {cancelable: false},
                                        );
                                    }}>
                                    <Image source={annulerBtn} style={{width: 60, height: 60, alignSelf: "center"}}/>
                                    <Text style={{color: "#3498db", marginTop: 5, alignSelf: "center"}}>Cesser les
                                        dons</Text>
                                </TouchableOpacity>
                            </View>
                        }


                    </View>

                    <View style={{
                        marginRight: 20,
                        marginLeft: 20,
                        marginTop: 35,
                        height: 1,
                        backgroundColor: "#C0C0C0"
                    }}/>
                    <View style={{marginRight: 20, marginLeft: 20, height: 10, backgroundColor: "#F0F0F0"}}/>
                    <View style={{marginRight: 20, marginLeft: 20, height: 1, backgroundColor: "#C0C0C0"}}/>

                    {
                        this.state.don.petiteMonnaie === true &&
                        <View>
                            <View style={{marginLeft: 15, marginRight: 15, marginTop: 20}}>
                                <Text style={{color: "#C0C0C0"}}>Transferts</Text>
                                <View style={{marginTop: 20, flexDirection: "row", marginRight: 20, marginLeft: 20}}>
                                    <View style={{width: "20%"}}>
                                        <Image source={monnaieIcon} style={{width: 30, height: 30}}/>
                                    </View>
                                    <View style={{width: "80%"}}>
                                        <Text style={{color: "#000", fontSize: 14, fontWeight: "bold"}}>Petite
                                            monnaie {this.state.don.accelerateur} </Text>
                                        <Text style={{color: "#C0C0C0", fontSize: 14}}>~ 0,00 € / mois</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginRight: 20,
                                marginLeft: 20,
                                marginTop: 35,
                                height: 1,
                                backgroundColor: "#C0C0C0"
                            }}/>
                            <View style={{marginRight: 20, marginLeft: 20, height: 10, backgroundColor: "#F0F0F0"}}/>
                            <View style={{marginRight: 20, marginLeft: 20, height: 1, backgroundColor: "#C0C0C0"}}/>
                        </View>

                    }


                    <View style={{marginLeft: 15, marginRight: 15, marginTop: 30, marginBottom: 30}}>
                        <Text style={{color: "#C0C0C0"}}>Exprimez votre soutien</Text>
                        <Text style={{
                            color: "#000",
                            marginTop: 15
                        }}>{this.state.don.description || this.state.don.subtitle} </Text>
                    </View>
                </ScrollView>

            </View>

        );
    }
}
