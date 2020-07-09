import React, {Component} from 'react';
import {Image, View, Text, AsyncStorage, Vibration} from 'react-native';
import PINCode from '@haskkor/react-native-pincode'

class PinCode extends React.Component {

    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
    }

    state = {
        pin: "",
        pinCodeStatus:""
    };

    componentDidMount() {
        AsyncStorage.getItem('pinCode').then(value => {
            if(value && value !== ""){
                this.setState({pinCodeStatus:"enter",pin:value})
            }else{
                this.setState({pinCodeStatus:"choose"})
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <PINCode status={this.state.pinCodeStatus}
                         maxAttempts={5}
                         pinCodeVisible={false}
                         storePin={pin => {this.setState({pin: pin})}}
                         finishProcess={async (pinCode) => {
                             AsyncStorage.setItem("pinCode",pinCode).then( ok => {
                                 this.props.navigation.navigate('Main');
                             })
                         }}
                         titleEnter="Entrez votre code PIN"
                         titleChoose="Entrez un code PIN"
                         subtitleChoose="pour sécuriser vos informations"
                         titleConfirm="Confirmez votre code pin"
                         titleConfirmFailed="Vos entrées ne correspondent pas"
                         subtitleError="Veuillez réessayer"
                         buttonDeleteText="Effacer"
                         titleAttemptFailed="Code PIN incorrect"
                         storedPin={this.state.pin || undefined}
                         delayBetweenAttempts={1000}
                         launchTouchID={() => {}}

                />
            </View>

        );

    }

}


export default PinCode
