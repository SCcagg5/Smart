import React from 'react';
import AppContainer from './src/navigation/AppNavigation';
import {View, ActivityIndicator} from "react-native";
import * as firebase from "firebase";
import FlashMessage from "./custom_modules/react-native-flash-message/src";

var firebaseConfig = {
    apiKey: "AIzaSyB36i6XUg4UFhMRNw12cf5VqlrIvAyvxdI",
    authDomain: "smartcofrance.firebaseapp.com",
    databaseURL: "https://smartcofrance.firebaseio.com",
    projectId: "smartcofrance",
    storageBucket: "smartcofrance.appspot.com",
    messagingSenderId: "482572690350",
    appId: "1:482572690350:web:227e8392adc52f86"
};

firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    componentDidMount() {

    }

    render() {
        if (this.state.loading === true) {
            return (
                <View style={{flex: 1, justifyContent: "center", flexDirection: "row", backgroundColor: "#fff"}}>
                    <ActivityIndicator size="large" color="green"/>
                </View>
            )
        } else {

            return (
                <View style={{flex:1}}>
                    <AppContainer/>
                    <FlashMessage position="top" hideOnPress={true} duration={5000}
                                  titleStyle={{fontWeight:"bold"}} animated={true}
                    />
                </View>

            );

        }
    }


}

export default App;
