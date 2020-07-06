import React from 'react';
import {View, ActivityIndicator, Text, Picker, AsyncStorage, Image, Dimensions} from "react-native";
import {Button, Header} from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import SmartService from "../../provider/SmartService";


const {height, width} = Dimensions.get('window');

export default class SelectSociety extends React.Component {

    state = {
        loading: true,
        user: "",
        societies: [],
        selectedSoc: ""
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            this.setState({user: user});
            SmartService.getActioByMail(user.email).then(actio => {
                //console.log(actio)
                this.setState({societies: actio.data.societes, loading: false})
            }).catch(err => console.log(err))
        });
    }

    render() {
        return (
            <View>
                <Header
                    containerStyle={{
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                    leftComponent={{
                        icon: 'arrow-back', type: "material", color: '#000', onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                />
                <View>
                    <View style={{marginTop: 50}}>
                        <Image source={require("../../assets/icons/societes.png")} style={{alignSelf: "center"}}/>
                    </View>
                    {
                        this.state.loading === false && this.state.societies.length === 0 ?
                            <View>
                                <View style={{marginTop: 50,marginLeft:30,marginRight:30}}>
                                    <Text style={{fontWeight: "bold", color: "#c0c0c0",
                                        fontSize: 16, alignSelf: "center",justifyContent:"center"
                                    }}>
                                        Vous n'êtes pas encore actionnaire</Text>
                                    <Text style={{fontWeight: "bold", color: "#c0c0c0",
                                        fontSize: 16, alignSelf: "center",justifyContent:"center"
                                    }}>d'aucune société dans <Text style={{color:"#1665A0"}}>SmartCo !</Text>  </Text>
                                </View>
                            </View> :
                            <View>
                                <View style={{marginTop: 50}}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: "#00cc7f",
                                        fontSize: 18,
                                        alignSelf: "center"
                                    }}>Sélectionner une de vos sociétés</Text>
                                </View>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#D3D3D3',
                                    borderRadius: 5,
                                    height: 50,
                                    backgroundColor: 'white',
                                    marginLeft: 30,
                                    marginRight: 30,
                                    marginTop: 15
                                }}>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={this.state.selectedSoc.uidS}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({selectedSoc: this.state.societies.find(x => x.uidS === itemValue)})
                                        }>
                                        {
                                            (this.state.societies || []).map((item, key) => (
                                                <Picker.Item label={item.sName} value={item.uidS}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                                <View style={{marginTop: 60, alignItems: "center"}}>
                                    <Button title="Suivant"
                                            disabled={this.state.selectedSoc === ""}
                                            buttonStyle={{
                                                width: (width / 2 + 50),
                                                height: 50,
                                                backgroundColor: "#fff",
                                                borderColor: "#1665A0",
                                                borderWidth: 1
                                            }}
                                            titleStyle={{fontSize: 16, color: "#1665A0", fontWeight: "bold"}}
                                            //onPress={() => this.props.navigation.navigate("PdfViewr",{name:"BabbaAmine.pdf",source:source})}
                                            onPress={() => this.props.navigation.navigate("Events",{society:this.state.selectedSoc})}
                                    />
                                </View>
                            </View>
                    }


                </View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Chargement...'}
                    textStyle={{color: "#fff", fontSize: 16}}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                />
            </View>
        )
    }

}

