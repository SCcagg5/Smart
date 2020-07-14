import React from 'react';
import {View, ActivityIndicator, Image, AsyncStorage, TouchableOpacity, Text, ScrollView,RefreshControl} from "react-native";
import {Container,Header,Content} from "native-base";
import CreditCard from '../../../custom_modules/react-native-credit-card';
import SmartService from "../../provider/SmartService";
import DesignedLogo from "../../components/logo/designedLogo";
import {Icon} from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

export default class CardService extends React.Component{

    state={
        refrech:false,
        loading:true,
        user:"",
        wallet:"",
        balance:"",
        ether:0.00
    }

    onRefrech = () => {
        this.setState({refrech:true});

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

                                        SmartService.getWalletBalance(wallets.data.accounts[0],res.data.token,result.data.usrtoken).then( balance => {
                                            this.setState({wallet:wallets.data.accounts[0],balance:balance.data.balance,refrech:false})
                                        }).catch(err => {this.setState({loading:false})})

                                    }else{
                                        alert(wallets.error)
                                        this.setState({refrech:false})
                                    }
                                }).catch( err => {alert(err);this.setState({refrech:false})})

                            }else{
                                alert(result.error)
                                this.setState({refrech:false})
                            }
                        }).catch(err => {this.setState({refrech:false})})
                    }else{
                        this.setState({refrech:false})
                    }
                }).catch(err => {this.setState({refrech:false})})
            })
        });

    }

    componentDidMount() {
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

                                        SmartService.getWalletBalance(wallets.data.accounts[0],res.data.token,result.data.usrtoken).then( balance => {
                                            this.setState({wallet:wallets.data.accounts[0],balance:balance.data.balance,loading:false})
                                        }).catch(err => {this.setState({loading:false})})

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

    }



    render() {
        return(
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68}}>
                    <View style={{alignContent:"center",justifyContent:"center"}}>
                        <DesignedLogo/>
                    </View>
                </Header>
                <Content>
                    <ScrollView refreshControl={<RefreshControl refreshing={this.state.refrech} onRefresh={()=> this.onRefrech()} />} >
                        <View>
                            <View style={{marginLeft: 15, marginBottom: 15, marginTop: 20,marginRight:15}}>
                                <TouchableOpacity onPress={() => {}}>
                                    <View style={{backgroundColor:"#fff",borderWidth:2,borderColor:"#f0f0f0",padding:10,borderRadius:10}}>
                                        <View style={{flexDirection:"row"}}>
                                            <View style={{width:"20%",alignItems:"center",justifyContent:"center"}}>
                                                <Icon type="simple-line-icon" name="wallet" size={30} color="#981b1a"/>
                                            </View>
                                            <View style={{width:"80%"}}>
                                                <Text style={{fontSize:18,fontFamily:"sans-serif-medium",color:"#981b1a"}}>My wallet</Text>
                                                {/*<Text style={{fontSize:13,fontFamily:"sans-serif-medium"}}>Adress:</Text>
                                            <Text style={{fontSize:11,fontFamily:"sans-serif-medium",color:"#c0c0c0"}}>{this.state.wallet}</Text>*/}
                                                <Text style={{fontSize:15,fontFamily:"sans-serif-medium",marginTop:10}}>Balance: <Text style={{color:"#981b1a"}}>{this.state.balance} tokens</Text></Text>
                                                <Text style={{fontSize:13,fontFamily:"sans-serif-medium",marginTop:10}}>Ether: <Text style={{color:"#981b1a"}}>{this.state.ether} ETH</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

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

