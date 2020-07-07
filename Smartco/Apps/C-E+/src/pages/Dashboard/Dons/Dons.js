/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {ListItem} from 'react-native-elements';
import mustacheIcon from "../../../assets/icons/mustache.png"
import oliveTIcon from "../../../assets/icons/oliveT.png"
import oliveSIcon from "../../../assets/icons/oliveS.png"
import rainforestIcon from "../../../assets/icons/Rainforest.jpg"

import BackButton from "../../../components/BackButton/BackButton";
import * as firebase from "firebase";

export default class Dons extends React.Component {
    static navigationOptions = ({navigation}) => {
        //const { params = {} } = navigation.state;
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title=""/>,
            title: "Dons",
            headerRight: <View/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            list1 : [
                {
                    id: '1',
                    title: "Olivier Tunis",
                    subtitle: "Captation carbone et production d'huiles d'olives",
                    image: oliveTIcon,
                    montant:"0",
                    petiteMonnaie: false,
                    key:""
                },
                {
                    id: '2',
                    title: 'Olivier Sfax',
                    subtitle: "Captation carbone et production d'huiles d'olives + support femme",
                    image: oliveSIcon,
                    montant:"0",
                    petiteMonnaie: false,
                    key:""
                },
                {
                    id: '3',
                    title: 'Bamboo Bali',
                    subtitle: "Captation rapide carbone",
                    image: mustacheIcon,
                    montant:"0",
                    petiteMonnaie: false,
                    key:""
                },
                {
                    id: '4',
                    title: 'Rainforest Alliance',
                    subtitle: "save our rainforests",
                    image: rainforestIcon,
                    description: "The rainforest alliancework at the crossroads of business, agriculture and forest to amplify the voices of farmes and forest" +
                        " community",
                    montant:"0",
                    petiteMonnaie: false,
                    key:""
                }
            ],
            dons: []
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("uid").then(value => {
            firebase.database().ref("users/" + value).on("value", (snapshot) => {
                let user = snapshot.val();
                let donsList = this.state.list1;
                donsList.map((item,x) => {

                    (user.dons || []).map((don,y) => {
                        if(item.title === don.to){
                            item.montant = don.montant;
                        }
                        item.key = y;
                    });

                    (user.donsPm || []).map((donpm,z) => {
                        if(item.title === donpm.to){
                            item.petiteMonnaie = true;
                            item.accelerateur = donpm.accelerateur;
                        }
                        item.key = z;
                    })
                });
                this.setState({user: user, dons: donsList || []});
            });
        });
    }

    render() {
        return (
            <View style={{marginRight: 15, marginLeft: 15}}>

                <View style={{marginTop: 25}}>

                    {
                        this.state.dons.map((l, key) => (
                            <ListItem
                                leftAvatar={{source: l.image, overlayContainerStyle: {backgroundColor: '#fff'}}}
                                key={key}
                                title={l.title}
                                subtitle={l.subtitle || ""}
                                hideChevron
                                bottomDivider={true}
                                onPress={() => this.props.navigation.navigate("DetailDon", {don: l})}
                                rightIcon={
                                    <Text style={{fontSize: 14, color: "#C0C0C0"}}>
                                        {l.montant + " €"}
                                    </Text>
                                }
                            />
                        ))
                    }

                </View>


            </View>
        );
    }
}
