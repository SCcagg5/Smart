import React from 'react';
import {View, ActivityIndicator, AsyncStorage, Text, Dimensions, Picker, TouchableOpacity} from "react-native";
import {Container, Content} from "native-base";
import DesignedLogo from "../../components/logo/designedLogo";
import CreditCard from "../../../custom_modules/react-native-credit-card";
import SmartService from "../../provider/SmartService";
import Spinner from "react-native-loading-spinner-overlay";
import {Button, Header, Icon} from "react-native-elements";
import { Overlay } from 'react-native-elements';
import {showMessage} from "../../../custom_modules/react-native-flash-message/src";

const {height, width} = Dimensions.get('window');

const cardTypes=[
    {type:"tok_visa",label:"Visa"},
    {type:"tok_mastercard",label:"Mastercard"},
    {type:"tok_amex",label:"American Express"},
]

export default class Cards extends React.Component{

    state={
        loading:true,
        cards:[],
        user:"",
        showAddCardModal:false,
        selectedCardType:"tok_visa"
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            SmartService.getToken().then(res => {
                if (res.succes === true && res.status === 200) {

                    AsyncStorage.getItem("pwd").then( pwd => {
                        SmartService.login({
                            email: user.email,
                            password1: pwd
                        }, res.data.token).then(result => {
                            if (result.succes === true && result.status === 200) {

                                SmartService.getCards(res.data.token,result.data.usrtoken).then( cards => {
                                    if (cards.succes === true && cards.status === 200) {
                                        //console.log(cards.data.cards)
                                        this.setState({cards:cards.data.cards || [],user:user,loading:false})
                                    }else{
                                        alert(cards.error)
                                        this.setState({loading:false})
                                    }
                                }).catch(err => {
                                    alert(err)
                                    this.setState({loading:false})
                                })
                            } else {
                                alert(result.error)
                                this.setState({loading:false})
                            }
                        }).catch(err => {
                            alert(err);
                            this.setState({loading:false})
                        })
                    })




                } else{
                    alert(res.error)
                    this.setState({loading:false})
                }
            }).catch(err => {
                alert(err)
                this.setState({loading:false})
            })
        })

    }

    _addCard = () => event => {
        this.setState({showAddCardModal:false,loading:true})
        SmartService.getToken().then(res => {
            if (res.succes === true && res.status === 200) {

                AsyncStorage.getItem("pwd").then( pwd => {
                    SmartService.login({
                        email: this.state.user.email,
                        password1: pwd
                    }, res.data.token).then(result => {
                        if (result.succes === true && result.status === 200) {

                            SmartService.addCard({crd_token:this.state.selectedCardType},res.data.token,result.data.usrtoken).then(card => {
                                if (card.succes === true && card.status === 200) {
                                    this.setState({loading:false})
                                    showMessage({message:"Votre carte est bien crée",description:"Vous pouvez l'utiliser maintenant pour effectuer vos paiements",
                                        type:"success",icon:"success"})
                                    setTimeout(()=>{
                                        this.props.navigation.goBack();
                                    },1000)



                                }else{
                                    alert(card.error)
                                    this.setState({loading:false})
                                }
                            }).catch(err => {
                                alert(err)
                                this.setState({loading:false})
                            })

                        } else {
                            alert(result.error)
                            this.setState({loading:false})
                        }
                    })
                })
            } else {
                alert(res.error)
                this.setState({loading:false})
            }
        }).catch(err => {
            alert(err)
            this.setState({loading:false})
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
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Mes cartes</Text>}
                    rightComponent={
                        <TouchableOpacity onPress={() => this.setState({showAddCardModal:true})}>
                            <Icon type="material" name="add-circle-outline" color="#981B1A"/>
                        </TouchableOpacity>
                        }
                />
                <Content>
                    {
                        this.state.loading === false && this.state.cards.length === 0 &&
                            <View style={{marginTop:"30%",marginLeft:25,marginRight:25}}>
                                <Text style={{fontFamily:"sans-serif-medium",fontSize:16,alignSelf:"center",color:"#d6d6d6"}} >Vous n'avez encore ajoutée aucune carte ! </Text>
                            </View>
                    }
                    <View style={{marginLeft:30,marginRight:30,marginTop:20}}>
                        {
                            this.state.cards.map((card,key) =>
                                <View style={{marginBottom:20}}>
                                    <View style={{marginTop: 20}}>
                                        <CreditCard
                                            type={null}
                                            statusText="Validé"
                                            logo={require("../../assets/images/logoWineOne.png")}
                                            cardName={card.brand}
                                            shiny={false}
                                            bar={true}
                                            focused={null}
                                            number={"************"+card.last4}
                                            name={this.state.user.firstname + ' ' + this.state.user.lastname || "---"}
                                            expiry={"01/21"}
                                            cvc="123"/>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </Content>


                <Overlay
                    isVisible={this.state.showAddCardModal}
                    onBackdropPress={() => this.setState({showAddCardModal:false})}
                    width={width -60}
                    height="auto"
                >
                    <View style={{padding:5}}>
                        <View style={{alignItems:"flex-end"}}>
                            <TouchableOpacity onPress={() => this.setState({showAddCardModal:false})}>
                                <Icon type="antdesign" name="closecircleo" color="#000" size={15}/>
                            </TouchableOpacity>

                        </View>
                        <View style={{marginTop:5,marginLeft:10,marginRight:20}}>
                            <Text style={{fontFamily:"sans-serif-medium",fontSize:14,color:"#000"}}>Type de carte:</Text>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#D3D3D3',
                                borderRadius: 5,
                                height: 45,
                                backgroundColor: 'white',
                                marginLeft: 5,
                                marginRight: 5,
                                marginTop: 15
                            }}>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={this.state.selectedCardType}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({selectedCardType: itemValue})
                                    }>
                                    {
                                        cardTypes.map((item, key) => (
                                            <Picker.Item label={item.label} value={item.type}/>
                                        ))
                                    }
                                </Picker>
                            </View>
                            <View style={{marginTop: 25, alignItems: 'center'}}>
                                <Button title="Ajouter"
                                        buttonStyle={{width: (width / 3 + 80), height: 40, backgroundColor: "#27BF0F"}}
                                        titleStyle={{fontSize: 14, color: "#fff", fontWeight: "bold"}}
                                        onPress={this._addCard()}
                                />
                            </View>
                        </View>
                    </View>
                </Overlay>

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

