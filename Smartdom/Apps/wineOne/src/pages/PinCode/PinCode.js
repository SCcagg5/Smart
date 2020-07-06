import React, { Component } from 'react';
import {Image, View, Text, AsyncStorage, Vibration,Dimensions} from 'react-native';
import PinView from '../../../custom_modules/react-native-pin-view'

class PinCode extends React.Component{

    constructor(props) {
        super(props);
        this.onComplete = this.onComplete.bind(this);

    }

    state = {
        pin: "",
        inputActiveBgColor:'#70B62F'
    };

    componentWillMount() {
        AsyncStorage.getItem('pincode').then(value => {
            this.setState({
                pin:value
            })
        })
    }

    onComplete(inputtedPin, clear) {
        this.props.navigation.navigate('Main');
    }

    render(){
        return (
            <View>
                <View style={{
                    marginTop: 30,
                    alignItems: 'center',marginBottom:25
                }}>
                    <Image
                        style={{
                            width: Dimensions.get("screen").width,
                            height: 50,
                        }}
                        source={require('../../assets/images/logo.png')}
                    />
                </View>
                <View style={{marginTop: 25, alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000',marginBottom:40}}>
                        Entrer votre code PIN
                    </Text>
                </View>
                <PinView
                    onComplete={this.onComplete}
                    pinLength={4}
                    inputBgColor="#C0C0C0"
                    inputActiveBgColor={this.state.inputActiveBgColor}
                    keyboardViewStyle={{
                        padding:5
                    }}

                />
            </View>

        );

    }

}


export default PinCode
