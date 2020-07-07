/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, TouchableHighlight, Text, ScrollView, Image, Text as TextReact, Switch} from 'react-native';
import {Avatar} from "react-native-elements"
import BackButton from "../../../components/BackButton/BackButton";
import donBtn from "../../../assets/icons/donBtn.png"
import rotationIcon from "../../../assets/icons/recurent.png"
import monnaieIcon from "../../../assets/icons/monnaie.png"
import addIcon from "../../../assets/icons/plus.png"

class MiseEnPlaceDon extends React.Component {
    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title="" />,
            title: "Mettre en place un don",
            headerRight: <View />
        };
    };

    constructor(props) {
        super(props);
        this.state={
            don:this.props.navigation.state.params.don,
            petiteMonnaie:this.props.navigation.state.params.don.petiteMonnaie,
            donRecurent:this.props.navigation.state.params.don.montant !== "0"
        }
    }

    render() {
        return (
            <View>
                <View style={{marginTop:"30%",flexDirection:"row",marginRight:20,marginLeft:20}}>
                    <View style={{width:"20%"}}>
                        <Image source={monnaieIcon} style={{width:30,height:30}}/>
                    </View>
                    <View style={{width:"60%"}}>
                        <Text style={{color:"#000",fontSize:14,fontWeight:"bold"}}>Petite monnaie</Text>
                    </View>
                    <View style={{width:"20%"}}>
                        <Switch
                            trackColor={{false: "#C0C0C0", true: "#B2D5F9"}}
                            thumbColor={this.state.petiteMonnaie === true ? "#0074E6" : "#F0F0F0"}
                            onValueChange={() => {
                                if(this.state.petiteMonnaie === false){
                                    this.props.navigation.navigate("PetiteMonnaieScreen",{don:this.state.don});
                                }
                                this.setState({petiteMonnaie: !this.state.petiteMonnaie})
                            }}
                            value={this.state.petiteMonnaie}
                        />
                    </View>
                </View>
                <View style={{marginTop:40,flexDirection:"row",marginRight:20,marginLeft:20}}>
                    <View style={{width:"20%"}}>
                        <Image source={rotationIcon} style={{width:30,height:30}}/>
                    </View>
                    <View style={{width:"60%"}}>
                        <Text style={{color:"#000",fontSize:14,fontWeight:"bold"}}>Don récurant</Text>
                    </View>
                    <View style={{width:"20%"}}>
                        <Switch
                            trackColor={{false: "#C0C0C0", true: "#B2D5F9"}}
                            thumbColor={this.state.donRecurent === true ? "#0074E6" : "#F0F0F0"}
                            onValueChange={() => {
                                if(this.state.donRecurent === false){
                                    this.props.navigation.navigate("NewRecurentDon",{don:this.state.don});
                                }
                                this.setState({donRecurent: !this.state.donRecurent})
                            }}
                            value={this.state.donRecurent}
                        />
                    </View>
                </View>
                <View style={{marginTop:40,flexDirection:"row",marginRight:20,marginLeft:20}}>
                    <View style={{width:"20%"}}>
                        <Image source={addIcon} style={{width:25,height:25}}/>
                    </View>
                    <View style={{width:"80%"}}>
                        <Text style={{color:"#000",fontSize:14,fontWeight:"bold"}}>Don unique</Text>
                    </View>

                </View>
            </View>

        );
    }
}

export default MiseEnPlaceDon