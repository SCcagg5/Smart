/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, AsyncStorage, Image} from 'react-native';
import {Icon, Input} from "react-native-elements"
import BackButton from "../../components/BackButton/BackButton";
import {Button as ButtonE} from "react-native-elements"
import * as firebase from "firebase";
import revolutService from "../../provider/revolutService";
import DropdownAlert from "react-native-dropdownalert";
import verifForms from "../../tools/verifForms";

class RevolutAddPayment extends React.Component {
    static navigationOptions = ({navigation}) => {
        //const { params = {} } = navigation.state;
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title=""/>,
            title: "Paiement avec Revolut",
            headerRight: <View/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            user:"",
            amount:"",
            token:"",
            account:"",
            btnSpinner:false,
            reference:"",
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("uid").then(value => {
            firebase.database().ref("users/" + value).on("value", (snapshot) => {
                let user = snapshot.val();
                revolutService.login().then( logged => {
                    revolutService.getAccounts().then( data => {
                        this.setState({account:data.data.accounts[0]});
                    }).catch( err => console.log(JSON.stringify(err)));

                    let token = logged.data.token ;
                    this.setState({ user: user, token:token });
                }).catch(err => alert(JSON.stringify(err)));

            });
        });
    }

    render() {
        return (
            <View>
                <View style={{marginTop:"5%"}}>
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            resizeMode: "contain",
                            alignSelf: "center",
                        }}
                        source={require('../../assets/images/revolutLogo.jpg')}
                    />
                </View>
                <View style={{marginTop: "15%",marginLeft:25,marginRight:25}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{width:"14%"}}>
                            <Text style={{color:"#000",fontSize:20,fontWeight:"bold"}}>
                                EUR
                            </Text>
                            <Text style={{color:"grey",fontSize:12,marginTop:5}}>Solde:</Text>
                        </View>
                        <View style={{width:"15%",marginTop:3}}>
                            <Icon type="feather" name="chevron-down" color="#000" size={20}/>
                            <Text style={{color:"grey",fontSize:12,marginTop:8}}>
                                {parseFloat(this.state.account.balance || "00.00").toFixed(2) + " €"}
                            </Text>
                        </View>
                        <View style={{width:"45%"}}/>
                        <View style={{width:"25%"}}>
                            <View style={{alignItems:"flex-end"}}>
                                <Input
                                    keyboardType="number-pad"
                                    onChangeText={value => this.setState({ amount: value })}
                                    rightIcon={
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>€</Text>
                                    }
                                    containerStyle={{ marginTop: -12 }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:25}}>
                        <Input
                            placeholder="Réference"
                            onChangeText={value => this.setState({ reference: value })}
                            containerStyle={{ marginTop: -12 }}
                        />
                    </View>
                    <View style={{marginRight:15,marginLeft:15,marginTop:35,height:2,backgroundColor:"#F0F0F0"}}/>



                    <View style={{ marginRight: 30, marginLeft: 30 , marginTop: "35%" }}>

                        <ButtonE
                            loading={this.state.btnSpinner}
                            disabled={this.state.reference === "" || verifForms.verif_Number(this.state.amount)}
                            onPress={() => {
                                this.setState({btnSpinner:true});
                                revolutService.sendAmount({
                                    acc_from:"0fb1eca4-8ab9-46b9-a17b-a0a940e523a2",
                                    acc_to:"3ee2ed55-a269-4c9e-a2eb-6bd2a0615bcd",
                                    amount:this.state.amount,
                                    currency:"EUR",
                                    reference:this.state.reference
                                }).then( ok => {
                                    if(ok.status === 200){
                                        this.setState({btnSpinner:false});
                                        this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                                            "Opération effectuée avec succès");
                                        setTimeout(() => {
                                            firebase.database().ref("users/"+this.state.user.uid).update({
                                                "solde":(parseFloat(this.state.user.solde || "0") + parseFloat(this.state.amount)).toFixed(2)
                                            }).then( ok => {
                                                this.props.navigation.pop(2);
                                            }).catch(err => alert(JSON.stringify(err)))

                                        },1000);


                                    }else{
                                        this.setState({btnSpinner:false});
                                        this.dropDownAlertRef.alertWithType('error', 'Erreur',
                                            "Une erreur est survenue ! Veuillez essayer une autre fois");
                                    }


                                }).catch(err => alert(JSON.stringify(err)));

                            }}
                            large={true}
                            title="Valider"
                            buttonStyle={{
                                padding: 10,
                                width: 250,
                                backgroundColor: "#EA008D",
                                borderRadius: 60
                            }}
                            textStyle={{
                                color: "#fff",
                                letterSpacing: 1.11,
                                fontSize: 24,
                            }}
                        />

                    </View>
                </View>


                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

            </View>

        );
    }
}

export default RevolutAddPayment