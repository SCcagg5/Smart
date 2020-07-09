import React from 'react';
import {AsyncStorage, Dimensions, Text, View} from "react-native";
import {Button, Header} from "react-native-elements";
import CustomInput from "../../../components/Input/CustomInput";
import SmartService from "../../../provider/SmartService";
import {showMessage} from "../../../../custom_modules/react-native-flash-message/src";

const {height, width} = Dimensions.get('window');

export default class EditAccount extends React.Component{

    state={
        user:"",
        email:"",
        fname:"",
        lname:"",
        phone:"",
        pwd:"",
        btnSpinner:false,
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            AsyncStorage.getItem("pwd").then( pwd => {
                this.setState({
                    pwd:pwd,
                    email:user.email,
                    fname:user.firstname || "",
                    lname:user.lastname || "",
                    phone:user.phone || ""
                })
            })
        });
    }


    _updateUserInfo = () => {
        this.setState({btnSpinner:true})
        SmartService.getToken().then(res => {
            if (res.succes === true && res.status === 200) {
                SmartService.login({
                    email: this.state.email,
                    password1: this.state.pwd
                }, res.data.token).then( login => {
                    if (login.succes === true && login.status === 200) {
                        SmartService.updateUserInfo({
                            email:this.state.email,
                            firstname:this.state.fname,
                            lastname:this.state.lname,
                            phone:this.state.phone
                        },res.data.token,login.data.usrtoken).then( update => {
                            if (update.succes === true && update.status === 200) {
                                AsyncStorage.setItem("user",JSON.stringify(update.data)).then( ok => {
                                    showMessage({message:"Modification effectuée avec succès",type:"success",icon:"success"})
                                    this.setState({btnSpinner:false})
                                })
                            }else{
                                this.setState({btnSpinner:true})
                                showMessage({message:update.error,icon:"danger",type:"danger"})
                            }
                        })
                    }else{
                        this.setState({btnSpinner:true})
                        showMessage({message:login.error,icon:"danger",type:"danger"})
                    }
                }).catch(err => alert(err))
            }else{
                this.setState({btnSpinner:true})
                showMessage({message:res.error,icon:"danger",type:"danger"})
            }
        }).catch(err => alert(err))
    }


    render() {
        return(
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
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Modifier le compte</Text>}
                />
                <View style={{marginTop:30}}>
                    <View style={{marginLeft:20,marginRight:30}}>
                        <View style={{marginBottom:15}}>
                            <CustomInput placeholder="Nom" value={this.state.fname} lefticon="user" lefticonColor="grey"
                                         onChangeText={fname => this.setState({fname})}/>
                        </View>
                        <View style={{marginBottom:15}}>
                            <CustomInput placeholder="Prénom" value={this.state.lname} lefticon="user" lefticonColor="grey"
                                         onChangeText={lname => this.setState({lname})}/>
                        </View>
                        <View style={{marginBottom:15}}>
                            <CustomInput placeholder="Email" value={this.state.email} lefticon="mail" lefticonColor="grey"
                                         disabled={true}
                                         onChangeText={email => this.setState({email})}/>
                        </View>
                        <View style={{marginBottom:15}}>
                            <CustomInput placeholder="Numéro de téléphone" value={this.state.phone} lefticon="phone" lefticonColor="grey"
                                         onChangeText={phone => this.setState({phone})}/>
                        </View>
                        <View style={{marginTop:30}}>
                            <View style={{ alignItems: 'center'}}>
                                <Button title="Enregistrer" loading={this.state.btnSpinner}
                                        disabled={this.state.pwd === ""}
                                        buttonStyle={{width: (width / 2 + 50), height: 45, backgroundColor: "#981B1A"}}
                                        titleStyle={{fontSize: 14, color: "#fff", fontWeight: "bold"}}
                                        onPress={() => this._updateUserInfo()}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}

