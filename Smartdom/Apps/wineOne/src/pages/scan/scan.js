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
    View, TouchableWithoutFeedback, Keyboard, TouchableOpacity
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import { Button,Avatar } from 'react-native-elements';
import {Icon} from "react-native-vector-icons/index";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';



export default class scan extends React.Component {
    constructor(props){
        super(props)
        this.state={

            isEnable:true,
            data: ""

        }
    }
    onSuccess = e => {
        this.setState({data:e.data})
    };

    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <BackButton onPress={() => navigation.goBack()}/>
        ),
        title: 'Profile',
        headerRight: <View/>
    });



    render() {
        return (

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1, padding:20}}>
                    <View style={{flexDirection:"row", alignItems:"center",width:"100%"}}>
                        <View style={{
                            width:"33%",

                            justifyContent:"flex-start"
                        }}>
                            <Image
                                style={{
                                    width: "100%",
                                    height: 50,
                                }}
                                source={require('../../assets/images/logo.png')}
                            />
                        </View>

                        <View >
                            <Text style={{fontSize: 18 ,fontWeight:"bold"}}>Scan QR-Code </Text>
                        </View>


                    </View>

                    <QRCodeScanner

                        onRead={this.onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.torch}
                        cameraStyle={{marginLeft:"auto", marginRight:"auto", width:"50%"}}
                        topContent={
                            <Text style={styles.centerText}>
                                Data : {this.state.data}

                            </Text>
                        }

                        bottomContent={
                            <TouchableOpacity style={styles.buttonTouchable}>
                                <Button
                                    onPress={()=>{this.props.navigation.navigate("Scan")}}
                                    buttonStyle={{borderRadius:60,width:"100%"}}

                                    title="Scan "
                                />
                            </TouchableOpacity>
                        }
                    />











                </View>


            </TouchableWithoutFeedback>


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
