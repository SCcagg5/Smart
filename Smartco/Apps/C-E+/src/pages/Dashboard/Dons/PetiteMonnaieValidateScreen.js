/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, TouchableHighlight, Text, ScrollView, Image, Text as TextReact, Switch} from 'react-native';
import {Avatar} from "react-native-elements"
import BackButton from "../../../components/BackButton/BackButton";
import donOkIcon from "../../../assets/icons/donOk.png"
import {Button, Text as TextNB} from "native-base";

class PetiteMonnaieValidateScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
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
            selectedAcc:"x1"
        }
    }

    render() {
        return (
            <View>
                <View style={{marginTop: "15%"}}>
                    <Image source={donOkIcon} style={{alignSelf: "center"}}/>
                    <Text style={{alignSelf: "center",textAlign: "center", color: "#000", fontWeight: "bold",
                        fontSize: 16, marginTop: "10%",marginLeft:20,marginRight:20}}>
                        Super ! Vous allez faire don de votre petite monnaie à {this.state.don.title}
                    </Text>
                    <View style={{marginLeft: 25, marginRight: 25}}>
                        <Text style={{marginTop: 20, alignSelf: "center", color: "#C0C0C0"}}>
                            merci pour votre générosité
                        </Text>
                    </View>
                    <View style={{ marginRight: 40, marginLeft: 40, marginTop: "45%" }}>

                        <Button rounded block style={{ backgroundColor: "#EA008D" }} onPress={() => this.props.navigation.pop(3)}>
                            <TextNB style={{ color: "#fff", fontWeight: "bold" }}>Terminé</TextNB>
                        </Button>

                    </View>
                </View>

            </View>

        );
    }
}

export default PetiteMonnaieValidateScreen