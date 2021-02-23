import React from "react";
import {ActivityIndicator, Alert, AsyncStorage, Text, TouchableOpacity, View} from "react-native";
import SmartService from "../../provider/SmartService";
import {Header, Icon} from "react-native-elements";
import {Container, Content} from "native-base";
import RNRestart from "react-native-restart";

export default class SelectClient extends React.Component{


    state={
        images:this.props.navigation.state.params.images,
        ged_id:""
    }

    componentDidMount() {
        AsyncStorage.getItem("ged_id").then( ged_id => {
            AsyncStorage.getItem("token").then(token => {
                AsyncStorage.getItem("usrtoken").then(usrtoken => {
                    this.setState({token:token,usrtoken:usrtoken,ged_id:ged_id})

                    SmartService.getGed(ged_id,token, usrtoken)
                        .then((gedRes) => {
                            console.log(gedRes)
                            let clients = [];
                            if (gedRes.succes === true && gedRes.status === 200) {
                                let folders = gedRes.data.Proprietary.Content.folders || [];
                                let client_folder = folders.find(x => x.name === "CLIENTS")
                                if(client_folder){
                                    let clients_folders = client_folder.Content.folders || [];
                                    clients_folders.map((item,key) => {
                                        clients.push({id:item.id,name:item.name,folders:item.Content.folders})
                                    })
                                    this.setState({clients:clients})
                                }else{
                                    Alert.alert("Dossier 'CLIENTS' inexistant !")
                                    this.props.navigation.pop(2)
                                }
                            } else {
                                console.log(gedRes.error)
                                Alert.alert("Une erreur est survenue ! ")
                                this.props.navigation.pop(2)
                            }
                        }).catch( err => {
                            console.log(err)
                        Alert.alert("Une erreur est survenue ! ")
                        this.props.navigation.pop(2)
                    })

                });
            });
        })

    }


    render() {
        return(

            <Container>
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
                    centerComponent={<Text style={{fontWeight:"bold"}}>{this.state.images.length + " images sélectionnées"}</Text>}
                />
                <Content>
                    <View style={{marginTop:20,marginLeft:20,marginRight:20}}>
                        <Text style={{fontWeight:"bold",fontSize:16,alignSelf:"center",textAlign:"center"}}>Envoyer ces éléments vers l'un des vos clients ci-dessous</Text>
                    </View>
                    <View style={{marginTop:25,marginLeft:25}}>
                        {
                            !this.state.clients &&
                            <View style={{textAlign:"center"}}>
                                <ActivityIndicator size="large" color="#00BC7C"/>
                            </View>
                        }
                        {
                            this.state.clients && this.state.clients.length === 0 &&
                            <View style={{textAlign:"center"}}>
                                <Text style={{color:"grey",fontSize:15,marginTop:6}}>Aucun résultat !</Text>
                            </View>
                        }
                        {
                            this.state.clients && this.state.clients.map((item,key) => (
                                <TouchableOpacity onPress={() => {
                                    //this.props.navigation.navigate("SelectGedFolder",{images:this.state.images,client:item})
                                    this.props.navigation.navigate("SelectClientCase",{images:this.state.images,client:item})
                                }}>
                                    <View style={{flexDirection:"row",marginBottom:8}}>
                                        <View style={{width:"15%"}}>
                                            <Icon name="folder" type="material" size={30} color="#c0c0c0"/>
                                        </View>
                                        <View style={{width:"85%"}}>
                                            <Text style={{color:"grey",fontSize:15,marginTop:6}}>{item.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                </Content>
            </Container>

        )
    }


}