/* eslint-disable comma-dangle */
import React from 'react';
import {
    TouchableHighlight,
    Image,
    Platform,
    AsyncStorage,
    ScrollView,
    Switch,
    StyleSheet,
    Linking,
    Text,
    View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import { Button,Avatar } from 'react-native-elements';
import {Icon} from "react-native-vector-icons/index";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {Container, Content, Header} from "native-base";
import DesignedLogo from "../../components/logo/designedLogo";
import Modal, {ModalContent} from "react-native-modals";
import SmartService from "../../provider/SmartService";
import moment from "moment";
import "moment/locale/fr"

moment.locale("fr")


const {height, width} = Dimensions.get('window');


export default class Scanner extends React.Component {
    constructor(props){
        super(props)
        this.state={

            showBottomModal:false,
            asset:"",
            data: ""

        }
    }
    onSuccess = e => {
        SmartService.getToken().then(res => {
            if (res.succes === true && res.status === 200) {
                SmartService.getAssetInfo(e.data,res.data.token).then( asset => {
                    if (asset.succes === true && asset.status === 200) {
                        this.setState({asset:asset.data,showBottomModal:true})
                    }else alert(asset.error)
                }).catch( err => alert(err))
            }else alert(res.error)
        }).catch(err => alert(err))
    };

    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <BackButton onPress={() => navigation.goBack()}/>
        ),
        title: '',
        headerRight: <View/>
    });



    render() {
        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68}}>
                    <View style={{alignContent:"center",justifyContent:"center"}}>
                        <DesignedLogo/>
                    </View>
                </Header>
                <Content>
                    <View>
                        <QRCodeScanner
                            reactivate={true}
                            onRead={this.onSuccess}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                            showMarker={true}
                            vibrate={true}
                            containerStyle={{height:height -200}}
                            markerStyle={{borderRadius:10,borderColor:"rgba(152, 27, 26,0.4)",borderStyle:"dashed"}}
                        />
                    </View>
                </Content>

                <Modal.BottomModal
                    visible={this.state.showBottomModal}
                    onTouchOutside={() => this.setState({ showBottomModal: false,itemNumber:1 })}
                    swipeDirection={['down']}
                    onSwipeOut={(event) => {
                        this.setState({ showBottomModal: false,itemNumber:1 });
                    }}
                >
                    <ModalContent
                        style={{
                            backgroundColor: 'fff',
                        }}
                    >
                        <View>
                            <Text style={{fontSize:18,alignSelf:"center",fontFamily:"sans-serif-medium"}}>Détails</Text>
                            <View style={{marginTop:25,marginLeft:20,marginRight:20}}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{width:"25%"}}>
                                        <Text style={{fontWeight:"bold",fontSize:14}}>Asset:</Text>
                                    </View>
                                    <View style={{width:"75%"}}>
                                        <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.asset || ""}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginTop:15}}>
                                    <View style={{width:"25%"}}>
                                        <Text style={{fontWeight:"bold",fontSize:14}}>Nom:</Text>
                                    </View>
                                    <View style={{width:"75%"}}>
                                        <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.name || ""}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginTop:15}}>
                                    <View style={{width:"25%"}}>
                                        <Text style={{fontWeight:"bold",fontSize:14}}>Adress:</Text>
                                    </View>
                                    <View style={{width:"75%"}}>
                                        <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.value && this.state.asset.value.address || ""}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:"row",marginTop:15}}>
                                    <View style={{width:"25%"}}>
                                        <Text style={{fontWeight:"bold",fontSize:14}}>Valeur:</Text>
                                    </View>
                                    <View style={{width:"75%"}}>
                                        <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.value &&this.state.asset.value.ind_value+" tokens" || ""}</Text>
                                    </View>
                                </View>
                                <View style={{marginTop:15}}>
                                    <Text style={{fontSize:14,fontWeight:"bold",color:"#c0c0c0"}}>Propriétaire</Text>
                                    <View style={{flexDirection:"row",marginTop:15}}>
                                        <View style={{width:"25%"}}>
                                            <Text style={{fontWeight:"bold",fontSize:14}}>Nom:</Text>
                                        </View>
                                        <View style={{width:"75%"}}>
                                            <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.owner &&this.state.asset.owner.name}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row",marginTop:15}}>
                                        <View style={{width:"25%"}}>
                                            <Text style={{fontWeight:"bold",fontSize:14}}>Email:</Text>
                                        </View>
                                        <View style={{width:"75%"}}>
                                            <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.owner &&this.state.asset.owner.email}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row",marginTop:15}}>
                                        <View style={{width:"25%"}}>
                                            <Text style={{fontWeight:"bold",fontSize:14}}>Depuis:</Text>
                                        </View>
                                        <View style={{width:"75%"}}>
                                            <Text style={{fontWeight:"normal",fontSize:15,color:"grey"}}>{this.state.asset.owner &&
                                            moment(parseInt(this.state.asset.owner.owner_since)).format("dddd DD MMMM YYYY")}</Text>
                                        </View>
                                    </View>
                                </View>


                            </View>
                            <View style={{marginLeft:"3%",marginTop:20,marginRight:"3%"}}>
                                <View style={{marginTop:20}}>
                                    <View style={{flexDirection:"row",justifyContent: "space-evenly"}}>
                                        <Button title="Re-Scanner" onPress={() => this.setState({showBottomModal:false,itemNumber:1})}
                                                buttonStyle={{width:(width / 2 ) - 50,height:50,backgroundColor:"#f0f0f0"}}
                                                titleStyle={{textTransform:"uppercase",fontSize:13,color:"grey",fontFamily:"sans-serif-medium"}}
                                        />
                                        <Button title="Transférer"
                                                buttonStyle={{width:(width / 2 ) - 50,height:50,backgroundColor:"#27BF0F"}}
                                                titleStyle={{textTransform:"uppercase",fontSize:13,color:"#fff",fontFamily:"sans-serif-medium"}}
                                                onPress={() => {
                                                    let command = this.state.command || [];
                                                    command.push({id:this.state.selectedItem.id,number:this.state.itemNumber,item:this.state.selectedItem})
                                                    AsyncStorage.setItem("command",JSON.stringify(command))
                                                    this.setState({showBottomModal:false,itemNumber:1,command:command})
                                                }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ModalContent>
                </Modal.BottomModal>
            </Container>



        );
    }
}
const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
