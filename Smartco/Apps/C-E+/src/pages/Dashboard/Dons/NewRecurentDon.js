/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, TouchableHighlight, Text, ScrollView, Image, Switch, AsyncStorage} from 'react-native';
import {Avatar, Icon, Input} from "react-native-elements"
import BackButton from "../../../components/BackButton/BackButton";
import donOkIcon from "../../../assets/icons/donOk.png"
import {Button, Text as TextNB} from "native-base";
import * as firebase from "firebase";
import rotationIcon from "../../../assets/icons/recurent.png";
import moment from "moment";
import verifForms from "../../../tools/verifForms";

class NewRecurentDon extends React.Component {
    static navigationOptions = ({navigation}) => {
        //const { params = {} } = navigation.state;
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title=""/>,
            title: "Faire un don",
            headerRight: <View/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            don: this.props.navigation.state.params.don,
            user:"",
            amount:""
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
                <View style={{marginTop: "30%",marginLeft:25,marginRight:25}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{width:"14%"}}>
                            <Text style={{color:"#000",fontSize:20,fontWeight:"bold"}}>
                                EUR
                            </Text>
                            <Text style={{color:"grey",fontSize:12,marginTop:5}}>Solde:</Text>
                        </View>
                        <View style={{width:"15%",marginTop:3}}>
                            <Icon type="feather" name="chevron-down" color="#000" size={20}/>
                            <Text style={{color:"grey",fontSize:12,marginTop:8}}>
                                {parseFloat(this.state.user.solde || "00.00").toFixed(2) + " €"}
                            </Text>
                        </View>
                        <View style={{width:"45%"}}/>
                        <View style={{width:"25%"}}>
                            <View style={{alignItems:"flex-end"}}>
                                <Input
                                    keyboardType="number-pad"
                                    onChangeText={value => this.setState({ amount: value })}
                                    rightIcon={
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>€</Text>
                                    }
                                    containerStyle={{ marginTop: -12 }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginRight:15,marginLeft:15,marginTop:35,height:2,backgroundColor:"#F0F0F0"}}/>

                    <View style={{marginTop:40,flexDirection:"row",marginRight:10,marginLeft:10}}>
                        <View style={{width:"15%"}}>
                            <Image source={rotationIcon} style={{width:30,height:30}}/>
                        </View>
                        <View style={{width:"65%"}}>
                            <Text style={{color:"#000",fontSize:14,fontWeight:"bold"}}>Répéter</Text>
                            <Text style={{color:"#C0C0C0",fontSize:12,fontWeight:"bold"}}>
                                Chaque mois depuis le {moment().format("DD MMM YYYY")}
                            </Text>
                        </View>
                        <View style={{width:"20%"}}>
                            <Text style={{color:"#0074E6",fontWeight:"bold"}}>Changer</Text>
                        </View>
                    </View>

                    <View style={{ marginRight: 30, marginLeft: 30 , marginTop: "35%" }}>

                        <Button rounded block
                                style={{ backgroundColor: (verifForms.verif_Number(this.state.amount) || parseFloat(this.state.user.solde) < parseFloat(this.state.amount)) ? "#C0C0C0" :"#EA008D" }}
                                disabled={verifForms.verif_Number(this.state.amount) || parseFloat(this.state.user.solde) < parseFloat(this.state.amount)}
                                onPress={() => {
                                    let dons = this.state.user.dons || [];
                                    dons.push({
                                        created: moment(new Date()).format("YYYY-MM-DD"),
                                        to: this.state.don.title,
                                        type: "recurent",
                                        montant: this.state.amount,
                                    });
                                    firebase.database().ref("users/" + this.state.user.uid).update({
                                        'solde': (parseFloat(this.state.user.solde) - parseFloat(this.state.amount)).toFixed(2),
                                        'dons': dons
                                    }).then(ok => {
                                        this.props.navigation.navigate("DonRecurentValidateScreen",{don:this.state.don,amount:this.state.amount})
                                    }).catch(err => {

                                    });

                                }}
                                >
                            <TextNB style={{ color: "#fff", fontWeight: "bold" }}>Faire un don</TextNB>
                        </Button>

                    </View>
                </View>

            </View>

        );
    }
}

export default NewRecurentDon