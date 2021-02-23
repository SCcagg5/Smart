import React from "react";
import {ActivityIndicator, Alert, AsyncStorage, Text, TouchableOpacity, View} from "react-native";
import SmartService from "../../provider/SmartService";
import {Header, Icon} from "react-native-elements";
import {Container, Content} from "native-base";
import RNRestart from "react-native-restart";

export default class SelectClientCase extends React.Component{


    state={
        images:this.props.navigation.state.params.images,
        client:this.props.navigation.state.params.client,
        ged_id:""
    }

    componentDidMount() {

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
                        <Text style={{fontWeight:"bold",fontSize:16,alignSelf:"center",textAlign:"center"}}>Choisissez l'un de ces dossiers client</Text>
                    </View>
                    <View style={{marginTop:25,marginLeft:25}}>
                        {
                            (this.state.client.folders || []).length === 0 &&
                            <View style={{textAlign:"center"}}>
                                <Text style={{color:"red",fontSize:15,marginTop:30}}>Aucun dossier trouvé !</Text>
                            </View>
                        }
                        {
                            (this.state.client.folders || []).map((item,key) => (
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("SelectGedFolder",{images:this.state.images,case:item})
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