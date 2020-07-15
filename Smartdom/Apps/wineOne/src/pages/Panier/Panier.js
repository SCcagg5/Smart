import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    AsyncStorage, DeviceEventEmitter
} from "react-native";
import {Button, Header} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import SmartService from "../../provider/SmartService";
import {showMessage} from "../../../custom_modules/react-native-flash-message/src";


const {height, width} = Dimensions.get('window');

export default class Panier extends React.Component{

    state={
        loading:true,
        command:[],
        btnSpinner:false,
        wallet:"",
        card:"",
        usrToken:""
    }


    updatePanier = (idCmd,number) => event => {
        let command = this.state.command;
        command[command.findIndex(x => x.id === idCmd)].number = number;
        AsyncStorage.setItem("command",JSON.stringify(command))
        //global.command = command;
        this.setState({command:command})
    }

    componentDidMount() {
        AsyncStorage.getItem("command").then(command => {
            AsyncStorage.getItem("user").then( value => {
                let user = JSON.parse(value)
                AsyncStorage.getItem("pwd").then( pwd => {
                    SmartService.getToken().then( res => {
                        if (res.succes === true && res.status === 200) {
                            SmartService.login({
                                email: user.email,
                                password1: pwd
                            }, res.data.token).then( result => {
                                //console.log(result)
                                if (result.succes === true && result.status === 200) {

                                    SmartService.getUserWallets(res.data.token,result.data.usrtoken).then( wallets => {
                                        if (wallets.succes === true && wallets.status === 200) {

                                            SmartService.getCards(res.data.token,result.data.usrtoken).then( cards => {
                                                if (cards.succes === true && cards.status === 200) {
                                                    this.setState({card:cards.data.cards[0].crd_token,wallet:wallets.data.accounts[0],
                                                        command:JSON.parse(command) || [],usrToken:result.data.usrtoken,loading:false})
                                                }else{
                                                    alert(cards.error)
                                                    this.setState({loading:false})
                                                }
                                            }).catch(err => {
                                                alert(err)
                                                this.setState({loading:false})
                                            })

                                        }else{
                                            alert(wallets.error)
                                            this.setState({loading:false})
                                        }
                                    }).catch( err => {alert(err);this.setState({loading:false})})

                                }else{
                                    alert(result.error)
                                    this.setState({loading:false})
                                }
                            }).catch(err => {this.setState({loading:false})})
                        }else{
                            this.setState({loading:false})
                        }
                    }).catch(err => {this.setState({loading:false})})
                })
            });
        })
    }

    placeOrder = () => {
        this.setState({btnSpinner:true,loading:true})
        SmartService.getToken().then( data => {
            if (data.succes === true && data.status === 200) {
                console.log(this.state.command)
                SmartService.addToCart({command:this.state.command},data.data.token).then( res => {
                    if (res.succes === true && res.status === 200) {
                        console.log(this.state.card)
                        SmartService.placeOrder({cmd_token:res.data.cmd_token,crd_token:this.state.card,to_wallet:this.state.wallet},data.data.token,this.state.usrToken).then( order => {
                            if (order.succes === true && order.status === 200) {

                                AsyncStorage.removeItem("command").then( ok => {
                                    this.setState({command:[],loading:false})
                                    DeviceEventEmitter.emit("clearP");
                                    showMessage({message:"Votre commande est bien validée",icon:"success",type:"success"})
                                    setTimeout(()=>{
                                        this.setState({btnSpinner:false})
                                        this.props.navigation.goBack();
                                        setTimeout(() => {
                                            this.props.navigation.navigate("Orders")
                                        },1500)
                                    },1500);
                                })

                            }else{
                                alert(order.error)
                                this.setState({btnSpinner:false,loading:false})
                            }

                        }).catch(err => {
                            alert(err)
                            this.setState({btnSpinner:false,loading:false})
                        })

                    }else{
                        alert(res.error)
                        this.setState({btnSpinner:false,loading:false})
                    }
                }).catch(err => {
                    alert(err)
                    this.setState({btnSpinner:false,loading:false})
                })
            }else{
                alert(data.error)
                this.setState({btnSpinner:false,loading:false})
            }
        }).catch(err => alert(err))

    }

    render() {
        let Tprice = 0;
        let items = this.state.command || []
        items.map((item,key) => {
            let price = item.item.price.amount * item.number;
            Tprice = Tprice + price
        })
        return(
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
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Mon panier</Text>}
                />
                <View style={{backgroundColor:"#f0f0f0",height:10}}/>
                <ScrollView style={{height:height/2 +90}}>
                    <View>
                        {
                            (this.state.command || []).map((cmd,key) =>
                                <View style={{marginLeft:15,marginRight:15,marginTop:20}}>
                                    <View style={{flexDirection:"row"}}>
                                        <View style={{width:"35%"}}>
                                            <Image source={require("../../assets/images/1bouteille.jpeg")} style={{width:80,height:100,resizeMode:"contain"}}/>
                                        </View>
                                        <View style={{width:"65%",padding:10}}>
                                            <Text style={{fontFamily:"sans-serif-medium",fontSize:14}}>{cmd.item.title}</Text>
                                            <Text style={{fontSize:13,marginTop:15,color:"#981b1a"}}>
                                                {cmd.item.price.amount + " " + cmd.item.price.currency} </Text>
                                            <View style={{marginTop:5}}>
                                                <View style={{alignItems:"flex-end"}}>
                                                    <View style={{flexDirection:"row"}}>
                                                        <TouchableOpacity onPress={ cmd.number > 1 && this.updatePanier(cmd.id,cmd.number - 1)}>
                                                            <View style={{width:25,height:25,backgroundColor:"#c0c0c0",borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                                                                <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>-</Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                        <Text style={{color:"#000",fontSize:15,fontWeight:"bold",marginLeft:5,marginRight:5,marginTop:2}}>{cmd.number}</Text>
                                                        <TouchableOpacity onPress={this.updatePanier(cmd.id,cmd.number + 1)}>
                                                            <View style={{width:25,height:25,backgroundColor:"#981b1a",borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                                                                <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>+</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{marginTop:3}}>
                                                <Text style={{fontSize:13,color:"#000",fontWeight:"bold"}}>X {cmd.number}:
                                                    <Text style={{color:"#981b1a"}}>
                                                        {"  "+parseInt(cmd.item.price.amount) * cmd.number+" Eur"} </Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        key < this.state.command.length -1 &&
                                        <View style={{backgroundColor:"#f0f0f0",height:1,marginTop:10}}/>
                                    }
                                </View>
                            )
                        }

                    </View>
                </ScrollView>
                {
                    this.state.loading === false && this.state.command.length > 0 &&
                        <View>
                            <View style={{backgroundColor:"#f0f0f0",height:10}}/>
                            <View style={{marginTop:20,marginLeft:35,marginRight:50}}>
                                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text style={{fontFamily:"sans-serif-medium",fontSize:14,fontWeight:"bold"}}>Prix total</Text>
                                    <Text style={{fontFamily:"sans-serif-medium",fontSize:13,color:"grey"}}>{Tprice} €</Text>
                                </View>
                                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                    <Text style={{fontFamily:"sans-serif-medium",fontSize:14,fontWeight:"bold"}}>frais</Text>
                                    <Text style={{fontFamily:"sans-serif-medium",fontSize:13,color:"grey"}}>0 €</Text>
                                </View>
                            </View>
                            <View style={{marginTop:15,marginLeft:15,marginRight:15}}>
                                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text style={{fontFamily:"sans-serif-medium",fontSize:17,fontWeight:"bold"}}>Total</Text>
                                    <Text style={{fontFamily:"sans-serif-medium",fontSize:17}}>{Tprice} €</Text>
                                </View>
                                <View style={{marginTop:10}}>
                                    <View style={{ alignItems: 'center'}}>
                                        <Button title="Passer la commande" loading={this.state.btnSpinner}
                                                buttonStyle={{width: (width -30), height: 45, backgroundColor: "#981B1A"}}
                                                titleStyle={{fontSize: 14, color: "#fff", fontWeight: "bold"}}
                                                onPress={this.placeOrder}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                }



            </View>
        )
    }

}

