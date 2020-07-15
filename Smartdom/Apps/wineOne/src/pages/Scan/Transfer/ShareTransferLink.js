/* eslint-disable comma-dangle */
import React from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Linking,StyleSheet,BackHandler} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import CountryPicker from 'react-native-country-picker-modal';
import {Header,ListItem,Button,Icon,Overlay} from "react-native-elements";
import Pdf from "react-native-pdf";
import SmartService from "../../../provider/SmartService";
import moment from "moment";

const { width, height } = Dimensions.get('window');


export default class ShareTransferLink extends React.Component {


    state = {
        loading:true,
        user: this.props.navigation.state.params.user,
        contact: this.props.navigation.state.params.contact,
        amount: "10",
        countryCode: "FR",
        countryCodeNumber: "33",
        url: "",
        showPdfModal:false,
        pdfUrl:this.props.navigation.state.params.pdfUrl,
    };



    componentDidMount() {

        /*const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                this.state.pdfUrl !== "" ? this.props.navigation.pop(3) : this.props.navigation.goBack()
                setTimeout(() => { backHandler.remove()},500)
            }
        );*/

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
            this.setState({pdfUrl:"http://51.158.97.220:3003/uploads/docs/"+docName+".pdf",loading:false})
        }).catch(err => {alert(err)})
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
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Partager le lien</Text>}
                />
                <View>
                    <ScrollView style={{backgroundColor:"#f0f0f0"}}>
                        <View style={{
                            borderRadius: 10,
                            backgroundColor: 'white',
                            width: '90%',
                            marginBottom: 20,
                            alignSelf: 'center',
                            marginTop: 15,
                            height:height - 130}}>
                            <View style={{marginLeft:20,marginRight:20,marginTop:30}}>
                                <Text style={{fontFamily:"sans-serif-medium",marginBottom:20,color:"#27BF0F"}}>Félicitation ! Le transfet est bien effectué</Text>
                                <View style={{padding:5,backgroundColor:"#fff",borderColor:"#f0f0f0",borderWidth:1}}>
                                    <ListItem
                                        bottomDivider={false}
                                        leftElement={
                                            <Icon type="font-awesome" name="file-pdf-o" color="red" size={16}/>
                                        }
                                        title="Contrat de cession"
                                        titleStyle={{fontWeight:"bold",fontSize:13}}
                                        rightElement={
                                            <Button title="Voir"
                                                    loading={this.state.loading}
                                                    buttonStyle={{width: 60, height: 35, backgroundColor: "#00cc7f"}}
                                                    titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                                    onPress={() => this.setState({showPdfModal:true})}
                                            />
                                        }
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 20 }}>

                                <Text style={{ alignSelf: "center", color: "#000", fontSize: 14,fontFamily:"sans-serif-medium" }}>
                                    Envoyer ce lien à {this.state.contact.displayName+ " afin"}
                                </Text>
                                <Text style={{ alignSelf: "center", color: "#000", fontSize: 14,fontFamily:"sans-serif-medium" }}>
                                     qu'il puisse visualiser le document
                                </Text>
                                <Text style={{ alignSelf: "center", color: "#000", fontSize: 14,fontFamily:"sans-serif-medium" }}>
                                    et les détails de transfer
                                </Text>

                                <View style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}>

                                        <Text selectable={true} style={{ alignSelf: "center", color: "#2F6EB5", fontSize: 14,textDecorationLine:"underline" }}>
                                            {this.state.pdfUrl}
                                        </Text>

                                </View>
                            </View>
                            <View style={{ marginLeft: 15 }}>

                                <Text style={{ color: "grey", fontSize: 16,marginTop:15 }} selectable={true}>Partager le lien</Text>
                                <View style={{ flexDirection: "row", marginTop: 10 }}>
                                    <View style={{ width: "100%" }}>

                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                marginLeft: "1%",
                                                marginRight: "1%",
                                                width: "8%"
                                            }}>
                                                <CountryPicker
                                                    onSelect={(country) => {

                                                        this.setState({ countryCode: country.cca2, countryCodeNumber: country.callingCode })

                                                    }}
                                                    countryCode={this.state.countryCode}
                                                    withCallingCode
                                                    withAlphaFilter
                                                    withEmoji
                                                    withFlagButton
                                                    withFlag
                                                />
                                            </View>
                                            <Hoshi
                                                borderColor={'transparent'}
                                                maskColor={'#FFF'}
                                                editable={false}
                                                style={{
                                                    width: "85%"
                                                }}
                                                keyboardType="phone-pad"
                                                inputStyle={{
                                                    fontSize: 13,
                                                    fontWeight: "bold",
                                                    color: "#000"
                                                }}
                                                value={this.state.contact.phoneNumbers[0].number.startsWith("+") === true ? this.state.contact.phoneNumbers[0].number :
                                                    "+" + this.state.countryCodeNumber + " " + this.state.contact.phoneNumbers[0].number}
                                            />
                                        </View>

                                    </View>

                                </View>


                                <View style={{ flexDirection: "row", marginTop: 20 }}>
                                    <View style={{ width: "33.3%" }}>
                                        <TouchableOpacity onPress={() => {
                                            let userName = "";
                                            if (this.state.user.displayName === undefined || this.state.user.displayName === null)
                                                userName = this.state.user.fullname;
                                            else
                                                userName = this.state.user.displayName;

                                            let phone = "";
                                            if (this.state.contact.phoneNumbers[0].number.startsWith("+") === true)
                                                phone = this.state.contact.phoneNumbers[0].number;
                                            else
                                                phone = "+" + this.state.countryCodeNumber + " " + this.state.contact.phoneNumbers[0].number;


                                            let text = "Bonjour," + " L'envoi de l'actricle est bien effetuée via l'application WineOne :) "+ "\n\n" +
                                                "Vous pouvez voir le document de contrat de cession en cliquant sur ce lien :" + "\n" + this.state.pdfUrl + "\n\n" + "Bonne journée"
                                            let url = 'whatsapp://send?text=' + text + '&phone=' + phone;
                                            Linking.openURL(url).then((data) => {
                                                console.log(JSON.stringify(data));
                                            }).catch((err) => {
                                                alert('Assurez-vous que Whatsapp est installé sur votre appareil');
                                            });

                                        }}>
                                            <Image
                                                style={{
                                                    width: 70,
                                                    height: 60,
                                                    resizeMode: "contain",
                                                    alignSelf: "center",
                                                    borderWidth: 2,
                                                    borderColor: "#F0F0F0"
                                                }}
                                                source={require('../../../assets/icons/whatsupLogo.jpg')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: "33.3%" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image
                                                style={{
                                                    width: 70,
                                                    height: 60,
                                                    resizeMode: "contain",
                                                    alignSelf: "center",
                                                    borderWidth: 2,
                                                    borderColor: "#F0F0F0"
                                                }}
                                                source={require('../../../assets/icons/gmailLogo.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: "33.3%" }}>
                                        <TouchableOpacity onPress={() => {}}>
                                            <Image
                                                style={{
                                                    width: 70,
                                                    height: 60,
                                                    resizeMode: "contain",
                                                    alignSelf: "center",
                                                    borderWidth: 2,
                                                    borderColor: "#F0F0F0"
                                                }}
                                                source={require('../../../assets/icons/smsLogo.jpg')}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                        </View>

                    </ScrollView>

                    <Overlay isVisible={this.state.showPdfModal} width={width-20} height={height-40}>
                        <Header
                            containerStyle={{height:55,justifyContent:"center",backgroundColor:"#fff",alignItems:"center",paddingBottom:20}}
                            rightComponent={{ icon: 'close', type:"fontisto", color: '#000', onPress:() => this.setState({showPdfModal:false}) }}
                            centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>{"Contrat de cession"}</Text>}
                            leftComponent={<Text style={{fontSize:10,fontWeight:"bold"}}>{this.state.nbPages+" pages" || "---" }</Text>}
                        />
                        <View style={styles.container}>
                            <Pdf
                                //http://51.158.97.220:3001/api/generateCesionActionSuisse
                                source={{uri:this.state.pdfUrl,cache:false}}
                                onLoadComplete={(numberOfPages,filePath)=>{
                                    this.setState({nbPages:numberOfPages})
                                }}
                                onPageChanged={(page,numberOfPages)=>{
                                    //console.log(`current page: ${page}`);
                                }}
                                onError={(error)=>{
                                    console.log(error);
                                }}
                                style={styles.pdf}/>
                        </View>
                    </Overlay>

                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:width -50,
        height:height -300,
    }
});
