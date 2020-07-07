import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    TouchableHighlight, TextInput
} from 'react-native';
import  {Text as TT}   from 'react-native-svg'
import DropDownPicker from 'react-native-dropdown-picker';



import {Container, Content, Header} from "native-base";

import * as firebase from "firebase";


import { Card, ListItem, Button, Icon,Input } from 'react-native-elements'
import DropdownAlert from "react-native-dropdownalert";






class wallets extends Component {
    constructor () {
        super()

        this.state = {
            search: '',
            selectedIndex:1,
            wallets:[],
            btnspinner:false,
            modalShow:false,
            walletSeleted:"",
            country:"",
            items:[],
            tokenNumber:"",
            walletTo:"",
            btnspinnerModel:false

        }

        this.onChanged=this.onChanged.bind(this)
    }
    onChanged(text){

        this.setState({  tokenNumber: text });
    }

    getwallets(){
        fetch('https://api.smartdom.ch/wallets',
            {
                method:'GET',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },




            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                this.setState({wallets:data.data.accounts})
                console.log(data)





            }else{
                console.log(data)
            }


        })

    }

    componentDidMount(): void {
        fetch('https://api.smartdom.ch/wallets',
            {
                method:'GET',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },




            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                console.log(data)
                this.setState({wallets:data.data.accounts})

                let items=[]

                data.data.accounts.map((item,key)=>{

                    items.push({label: item, value: item, icon: () => <Icon  name='wallet'
                                                                             type='simple-line-icon'
                                                                             color='#517fa4'
                        size={18}/>})

                })

                this.setState({items:items})





            }else{
                console.log(data)
            }


        })


    }

    addwallet(){
        this.setState({btnspinner:true})
        fetch('https://api.smartdom.ch/wallet/create/',
            {
                method:'POST',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },






            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                console.log(data)
                this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                    "Votre wallet a été ajouter avec success")


                 this.getwallets()
                this.setState({btnspinner:false})


            }else{
                this.setState({btnspinner:false})

                console.log(data)
            }

        })
    }



    sendToken(){

        this.setState({btnspinnerModel:true})
        fetch('https://api.smartdom.ch/wallet/'+this.state.walletSeleted+'/token/0x70dc7BE0c79159FffcE171CcA2C11Af5cb8552d4/send',
            {
                method:'POST',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },
                body:JSON.stringify({"to":this.state.walletTo,
                    "amount":this.state.tokenNumber})





            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                console.log(data)
                this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                    "token envoyer avec succes")






            }else{
                this.setState({btnspinner:false})

                this.dropDownAlertRef.alertWithType('error', 'Erreur',
                    data.error)

                console.log(data)
            }


        })
    }


    test(){
        console.log(JSON.parse(this.state.walletTo))
    }
    render() {

        return (
            <Container>


                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content  >



                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalShow}

                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                    <DropDownPicker
                                        items={this.state.items}
                                        defaultValue={this.state.country}
                                        containerStyle={{height: 60}}
                                        style={{backgroundColor: '#fafafa',width:"100%"}}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                            ,color: "black"
                                        }}
                                        dropDownStyle={{backgroundColor: '#fafafa',color:"blue",scrollHorizontal:true}}

                                        onChangeItem={item => this.setState({walletSeleted:item})
                                        }
                                        titleSty


                                    />


                                    <View style={{width:"100%",marginTop:10}}>
                                        <Input

                                            value={this.state.walletTo}
                                            style={{width:"100%"}}
                                            placeholder='input wallet adress'
                                            labelStyle={{}}
                                            onChangeText={(walletTo)=>this.setState({walletTo:walletTo})}
                                            leftIcon={{ type: 'simple-line-icon', name: 'wallet' }}
                                        />
                                    </View>

                                    <View style={{width:"100%",marginTop:10,flexDirection:"row",alignItems:"center"}}>
                                        <Text>
                                            Nombre de token
                                        </Text>

                                        <View style={{width:"50%"}}>
                                        <Input

                                            keyboardType = 'number-pad'


                                            style={{width:"20%"}}


                                            value={this.state.tokenNumber}
                                            onChangeText={(text)=>this.setState({tokenNumber:text})}

                                        />
                                        </View>
                                    </View>

                                    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:15,width:"100%"}}>
                                        <Button  onPress={()=>this.sendToken()} disabled={this.state.walletSeleted===""||this.state.tokenNumber===""
                                        ||this.state.walletTo===""} title="Envoyer"  />
                                        <Button  onPress={()=>this.setState({modalShow:false})}  title="Annuler"  />
                                    </View>


                                </View>
                            </View>
                        </Modal>


                    </View>



                    <View style={{backgroundColor:"#a6a6a6",height:2 , width:"90%", marginRight:"auto",marginLeft:"auto",marginTop:"5%"}}/>





                    <ScrollView style={{height:Dimensions.get("window").height-300}}>



                        {
                            this.state.wallets.map((item,key)=>
                                <Card>
                                    <View>
                                        <Text>
                                            {item}
                                        </Text>
                                    </View>
                                </Card>

                            )
                        }





                    </ScrollView>


                    <View style={{bottom:1,justifyContent:"center",flexDirection:"row", width:"100%",marginTop:10}}>
                        <View style={{flexDirection:"column"}}>
                        <Button onPress={()=>{this.setState({modalShow:true})}}  loading={this.state.btnspinner} title="Faire un transfert" buttonStyle={{width:"100%"}}/>
                            <Button onPress={()=>this.addwallet()} loading={this.state.btnspinner} title="Ajouter un wallet" buttonStyle={{width:"100%",marginTop:3}}/>

                        </View>
                    </View>




















                </Content>

                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

            </Container>
        );
    }
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width:"90%",

    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
export default wallets;
