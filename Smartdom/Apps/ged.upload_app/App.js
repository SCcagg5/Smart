import React from 'react';
import AppContainer from './src/navigation/AppNavigation';
import {View, ActivityIndicator, AsyncStorage} from "react-native";
import FlashMessage from "./custom_modules/react-native-flash-message/src";
import Toast from 'react-native-toast-message';

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
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>

            );

        }
    }


}

export default App;
