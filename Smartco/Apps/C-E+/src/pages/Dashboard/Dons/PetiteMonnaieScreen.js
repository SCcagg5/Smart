/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, TouchableHighlight, Text, ScrollView, Image, Text as TextReact, Switch, AsyncStorage} from 'react-native';
import {Avatar} from "react-native-elements"
import BackButton from "../../../components/BackButton/BackButton";
import loveIcon from "../../../assets/icons/loveImage.png"
import {Button, Text as TextNB} from "native-base";
import * as firebase from "firebase";
import moment from "moment";

class PetiteMonnaieScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        //const { params = {} } = navigation.state;
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title=""/>,
            title: "",
            headerRight: <View/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            don: this.props.navigation.state.params.don,
            selectedAcc:"x1",
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
                <View style={{marginTop: "10%"}}>
                    <Image source={loveIcon} style={{alignSelf: "center"}}/>
                    <Text style={{alignSelf: "center", color: "#000", fontWeight: "bold", fontSize: 18, marginTop: 10}}>
                        Faites don de votre petite monnaie</Text>
                    <View style={{marginLeft: 25, marginRight: 25}}>
                        <Text style={{marginTop: 30, alignSelf: "center", textAlign: "center", color: "#C0C0C0"}}>
                            Nous allons arrondir au-dessus les achats effectuées avec votre carte et donner votre
                            petite monnaie à {this.state.don.title}
                        </Text>
                    </View>
                    <View style={{marginLeft:25,marginTop:30}}>
                        <Text style={{color:"grey"}}>Accélérateur de petite monnaie</Text>
                        <View style={{marginTop:15,flexDirection:"row"}}>
                            <View style={{width:"15%"}}>
                                <Avatar size="small" titleStyle={{color:this.state.selectedAcc === "x1" ? "#fff" :"#000"}}
                                        overlayContainerStyle={{backgroundColor:this.state.selectedAcc === "x1" ? "#0074E6" : "#fff"}}
                                        onPress={() => this.setState({selectedAcc:"x1"})}
                                        rounded title="x 1" />
                            </View>
                            <View style={{width:"15%"}}>
                                <Avatar size="small" titleStyle={{color:this.state.selectedAcc === "x2" ? "#fff" :"#000"}}
                                        overlayContainerStyle={{backgroundColor:this.state.selectedAcc === "x2" ? "#0074E6" : "#fff"}}
                                        onPress={() => this.setState({selectedAcc:"x2"})}
                                        rounded title="x 2" />
                            </View>
                            <View style={{width:"15%"}}>
                                <Avatar size="small" titleStyle={{color:this.state.selectedAcc === "x3" ? "#fff" :"#000"}}
                                        overlayContainerStyle={{backgroundColor:this.state.selectedAcc === "x3" ? "#0074E6" : "#fff"}}
                                        onPress={() => this.setState({selectedAcc:"x3"})}
                                        rounded title="x 3" />
                            </View>
                            <View style={{width:"15%"}}>
                                <Avatar size="small" titleStyle={{color:this.state.selectedAcc === "x4" ? "#fff" :"#000"}}
                                        overlayContainerStyle={{backgroundColor:this.state.selectedAcc === "x4" ? "#0074E6" : "#fff"}}
                                        onPress={() => this.setState({selectedAcc:"x4"})}
                                        rounded title="x 4" />
                            </View>
                            <View style={{width:"15%"}}>
                                <Avatar size="small" titleStyle={{color:this.state.selectedAcc === "x5" ? "#fff" :"#000"}}
                                        overlayContainerStyle={{backgroundColor:this.state.selectedAcc === "x5" ? "#0074E6" : "#fff"}}
                                        onPress={() => this.setState({selectedAcc:"x5"})}
                                        rounded title="x 5" />
                            </View>
                            <View style={{width:"15%"}}>
                                <Avatar size="small" titleStyle={{color:this.state.selectedAcc === "x10" ? "#fff" :"#000"}}
                                        overlayContainerStyle={{backgroundColor:this.state.selectedAcc === "x10" ? "#0074E6" : "#fff"}}
                                        onPress={() => this.setState({selectedAcc:"x10"})}
                                        rounded title="x 10" />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginRight: 40, marginLeft: 40, marginTop: 45 }}>

                        <Button rounded block style={{ backgroundColor: "#EA008D" }}
                                onPress={() =>
                                {
                                    let donsPm = this.state.user.donsPm || [];
                                    donsPm.push({
                                        created: moment(new Date()).format("YYYY-MM-DD"),
                                        to: this.state.don.title,
                                        type: "petiteMonnaie",
                                        accelerateur: this.state.selectedAcc,
                                    });
                                    firebase.database().ref("users/" + this.state.user.uid).update({
                                        'donsPm': donsPm
                                    }).then(ok => {
                                        this.props.navigation.navigate("PetiteMonnaieValidateScreen",{don:this.state.don})
                                    }).catch(err => {

                                    });
                                }
                                   }>

                            <TextNB style={{ color: "#fff", fontWeight: "bold" }}>Faire un don</TextNB>

                        </Button>

                    </View>
                </View>

            </View>

        );
    }
}

export default PetiteMonnaieScreen