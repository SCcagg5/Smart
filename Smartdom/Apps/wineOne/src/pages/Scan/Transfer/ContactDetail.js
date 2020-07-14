/* eslint-disable comma-dangle */
import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Text as TextNB } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import {Divider, Avatar, Header, Input} from "react-native-elements"
import TextAvatar from "react-native-text-avatar"
import verifForms from "../../../tools/verifForms";
import SmartService from "../../../provider/SmartService";
import moment from "moment";


const { width, height } = Dimensions.get('window');



export default class ContactDetail extends React.Component {


    state = {
        loading: false,
        user:"",
        contact: this.props.navigation.state.params.contact,
        contactMail: "",
        contactAdress: "",
        wallet:"",
        email:"",
        pwd:"",
        asset:this.props.navigation.state.params.asset,
    };

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            AsyncStorage.getItem("pwd").then( pwd => {

                AsyncStorage.getItem("wallet").then( wallet => {
                    this.setState({
                        pwd:pwd,user:user,wallet:wallet
                    })
                })

            })
        });
    }


    sendAsset = ()  => {
        this.setState({loading:true})
        SmartService.getToken().then(res => {
            if (res.succes === true && res.status === 200) {
                SmartService.login({
                    email: this.state.user.email,
                    password1: this.state.pwd
                }, res.data.token).then(result => {
                    if (result.succes === true && result.status === 200) {
                        console.log(this.state.wallet)
                        console.log(this.state.email.trim().toLowerCase())
                        console.log(this.state.asset.asset)
                        SmartService.sendAsset(
                            {
                                from_wallet:this.state.wallet,to:this.state.email.trim().toLowerCase()},
                                this.state.asset.asset,res.data.token,result.data.usrtoken).then( send => {

                            console.log(send);

                            if (send.succes === true && send.status === 200) {

                                let docName = "CessionAction2020" + "_" + moment().format("DDMMYYYY")+"_" + moment().format("HHmmss")
                                SmartService.getContratCession({
                                    cedant:{
                                        fullname:this.state.user.firstname+" "+this.state.user.lastname,
                                        adress:"***"
                                    },
                                    cessionnaire:{
                                        fullname:this.state.contact.displayName,
                                        adress:"****"
                                    },
                                    banque:{
                                        name:"B***ST",
                                        iban:"**** **** **** 4242"
                                    },
                                    place:"Suisse",
                                    datecreation:moment().format("DD/MMMM/YYYY"),
                                    docName:docName
                                }).then( ok => {
                                    this.setState({loading:false})
                                    setTimeout(() => {
                                        this.props.navigation.navigate("ShareTransferLink",
                                            {contact:this.state.contact,user:this.state.user,pdfUrl:"http://51.158.97.220:3003/uploads/docs/"+docName})

                                    },400)

                                }).catch(err => {alert(err)})



                            }else{
                                alert(send.error)
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
                    alert(err)
                    this.setState({loading:false})
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

        return (
            <View>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Chargement...'}
                    textStyle={{color:"#fff",fontSize:16}}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                />
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
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Article à transférer</Text>}
                />
                <View>
                    <ScrollView style={{backgroundColor:"#f0f0f0"}}>

                        {
                            this.state.loading === true ?

                                <Spinner
                                    visible={this.state.loading}
                                    textContent={''}
                                /> :

                                <View style={{
                                    borderRadius: 10,
                                    backgroundColor: 'white',
                                    width: '90%',
                                    marginBottom: 20,
                                    alignSelf: 'center',
                                    marginTop: 15,
                                    height:height - 130
                                }}>

                                    <View style={{ marginLeft: 15, marginTop: "15%" }}>
                                        <Text style={{ color: "grey", textTransform: "capitalize", fontWeight: "bold", fontSize: 18 }}>à</Text>
                                    </View>
                                    <View style={{ alignItems: "center" }}>

                                        {
                                            this.state.contact.thumbnailPath === "" ?
                                                <TextAvatar
                                                    backgroundColor={
                                                        Math.floor(Math.random() * 5) === 1 ? "#E91E63" :
                                                            Math.floor(Math.random() * 5) === 2 ? "#2196F3" :
                                                                Math.floor(Math.random() * 5) === 3 ? "#9C27B0" :
                                                                    Math.floor(Math.random() * 5) === 4 ? "#3F51B5" :
                                                                        Math.floor(Math.random() * 5) === 5 ? "#00BCD4" : "#F44336"
                                                    }
                                                    textColor={'#fff'}
                                                    size={60}
                                                    type={'circle'}

                                                >
                                                    {this.state.contact.displayName}
                                                </TextAvatar> :

                                                <Avatar
                                                    size={100}
                                                    rounded
                                                    source={{ uri: this.state.contact.thumbnailPath }}
                                                />
                                        }
                                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", marginTop: 10 }}>{this.state.contact.displayName} </Text>
                                    </View>
                                    <View style={{marginTop:20,marginLeft:20,marginRight:20}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"30%"}}>
                                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold"}}>Téléphone:</Text>
                                            </View>
                                            <View style={{width:"70%"}}>
                                                <Text style={{color:"#000",fontSize:16}}>{this.state.contact.phoneNumbers[0].number}</Text>
                                            </View>
                                        </View>
                                        <View style={{marginTop:20,marginBottom:15,backgroundColor:"#f0f0f0",height:2}}/>
                                        <View style={{marginTop:30}}>
                                            <Input
                                                value={this.state.email}
                                                placeholder="Email du destinatire"
                                                leftIcon={{ type: 'feather', name:"mail", size:16,color:"grey",iconStyle:{marginLeft:-8} }}
                                                containerStyle={{borderWidth:1,borderRadius:5,borderColor:"#f0f0f0",height:50}}
                                                inputContainerStyle={{borderBottomWidth: 0}}
                                                inputStyle={{
                                                    fontSize:14,fontFamily:"Baloo2-Medium"
                                                }}
                                                onChangeText={text => this.setState({email:text})}
                                            />
                                        </View>

                                    </View>

                                    <View style={{ marginRight: 40, marginLeft: 40, marginTop: 60 }}>

                                        <Button rounded block style={{ backgroundColor: verifForms.verif_Email(this.state.email.trim()) ? "#d3d3d3" :"#EA008D" }}

                                                onPress={() => this.sendAsset()}
                                                disabled={verifForms.verif_Email(this.state.email.trim())}
                                        >
                                            <TextNB style={{ color: "#fff", fontWeight: "bold",textTransform:"none" }}>Valider le transfert</TextNB>
                                        </Button>

                                    </View>

                                </View>
                        }
                    </ScrollView>



                </View>
            </View>

        );
    }
}
