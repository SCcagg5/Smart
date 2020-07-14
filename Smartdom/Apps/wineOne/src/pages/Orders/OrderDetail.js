import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity, AsyncStorage} from "react-native";
import {Header, Icon} from "react-native-elements";
import {Container, Content} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import SmartService from "../../provider/SmartService";
import moment from "moment";

export default class OrderDetail extends React.Component {

    state = {
        order:this.props.navigation.state.params.order
    }


    render() {
        return (

            <Container>
                <Header
                    containerStyle={{
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                    leftComponent={
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon type="material" name="arrow-back" color="#000"/>
                        </TouchableOpacity>
                    }

                    centerComponent={<Text style={{fontWeight: "bold", fontSize: 14,color:"#01BA54"}}>{"#"+this.state.order.id}</Text>}
                />
                <Content style={{backgroundColor:"#f0f0f0"}}>
                    <View style={{marginRight: 15, marginLeft: 15, marginTop: 20}}>

                        <View style={{backgroundColor: "#fff", padding: 10, borderRadius: 10,paddingTop:20,paddingBottom:20}}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={{width: "15%"}}>
                                                <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: "#E4F8ED",justifyContent:"center",alignItems:"center"}}>
                                                    <Text style={{color:"#01BA54",fontWeight:"bold",fontSize:30,marginTop:-2}}>•</Text>
                                                </View>
                                            </View>
                                            <View style={{width: "65%"}}>
                                                <Text style={{color: "#387DE2", fontFamily: "sans-serif-medium"}}>{"Commande: #"+this.state.order.id}</Text>
                                                <Text style={{color: "#000", fontFamily: "sans-serif-medium",marginTop:10,letterSpacing:0.3}}>Payé avec votre carte</Text>
                                                <Text style={{color: "#c0c0c0",marginTop:10,fontSize:12,textTransform:"capitalize"}}>
                                                    {moment(parseInt(this.state.order.date)).format("dddd DD MMMM YYYY")}</Text>
                                            </View>
                                            <View style={{width: "20%"}}>
                                                <View style={{padding:5,backgroundColor:"#01BA54",alignItems:"center",justifyContent:"center",borderRadius:5}}>
                                                    <Text style={{color:"#fff",fontFamily:"sans-serif-medium",fontSize:12}}>Payé</Text>
                                                </View>
                                                <View style={{marginTop:40}}>
                                                    <Text style={{color:"#01BA54",fontFamily:"sans-serif-medium",fontSize:12}}>{this.state.order.details.payment.amount} €</Text>
                                                </View>


                                            </View>
                                        </View>
                        </View>
                        <View style={{marginTop:20}}>
                            <View style={{backgroundColor: "#fff", padding: 10, borderRadius: 10,paddingTop:20,paddingBottom:20}}>
                                <Text style={{color:"#000",fontFamily:"sans-serif-medium"}}>Articles</Text>
                                <View style={{marginTop:15,marginLeft:10}}>
                                    {
                                        (this.state.order.details.details.cart || []).map((item,key) =>
                                            <View>
                                                <View style={{flexDirection:"row"}}>
                                                    <View style={{width:"35%"}}>
                                                        <Text style={{color:"grey"}}>Titre</Text>
                                                    </View>
                                                    <View style={{width:"65%"}}>
                                                        <Text>{item.title}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:"row",marginTop:10}}>
                                                    <View style={{width:"35%"}}>
                                                        <Text style={{color:"grey"}}>Description</Text>
                                                    </View>
                                                    <View style={{width:"65%"}}>
                                                        <Text>{item.description || ""}</Text>
                                                    </View>
                                                </View>
                                                {/*<View style={{flexDirection:"row",marginTop:10}}>
                                                    <View style={{width:"35%"}}>
                                                        <Text style={{color:"grey"}}>Token Adress</Text>
                                                    </View>
                                                    <View style={{width:"65%"}}>
                                                        <Text>{item.token.address}</Text>
                                                    </View>
                                                </View>*/}
                                                <View style={{flexDirection:"row",marginTop:10}}>
                                                    <View style={{width:"35%"}}>
                                                        <Text style={{color:"grey"}}>Tokens</Text>
                                                    </View>
                                                    <View style={{width:"65%"}}>
                                                        <Text>{item.token.ind_value}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:"row",marginTop:10}}>
                                                    <View style={{width:"35%"}}>
                                                        <Text style={{color:"grey"}}>Prix</Text>
                                                    </View>
                                                    <View style={{width:"65%"}}>
                                                        <Text>{item.price.amount +" "+item.price.currency}</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:"row",marginTop:10}}>
                                                    <View style={{width:"35%"}}>
                                                        <Text style={{color:"grey"}}>Quantité</Text>
                                                    </View>
                                                    <View style={{width:"65%"}}>
                                                        <Text>{item.number}</Text>
                                                    </View>
                                                </View>
                                                <View style={{backgroundColor:"#f0f0f0",height:2,marginTop:15,marginBottom:10}}/>
                                            </View>

                                        )
                                    }

                                </View>
                            </View>
                        </View>
                    </View>

                </Content>


                <Spinner
                    visible={this.state.loading}
                    textContent={'Chargement...'}
                    textStyle={{color:"#fff",fontSize:16}}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                />
            </Container>


        )
    }

}

