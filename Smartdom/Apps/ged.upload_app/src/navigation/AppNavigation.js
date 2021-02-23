import React from 'react';
import {View, AsyncStorage, ActivityIndicator} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
} from 'react-navigation';
import LogInScreen from '../pages/Auth/LogIn/LogInScreen';
import {Icon} from 'react-native-elements'
import defaultConfig from "../constants/defaultConfig";
import EmptyPage from "../pages/emptyPage/EmptyPage";
import SignUpScreen from "../pages/Auth/SignUp/SignUpScreen";
import PinCode from "../pages/Auth/PinCode/PinCode";
import ProfileScreen from "../pages/Auth/Profile/ProfileScreen";
import CardService from "../pages/CardService/CardService";
import Journal from "../pages/Journal/Journal";
import PdfViewr from "../pages/PdfViewrPage/PdfViewr";
import SelectSociety from "../pages/Journal/SelectSociety";
import Events from "../pages/Journal/Events/Events";
import EventDetail from "../pages/Journal/Events/EventDetail";
import ChatBotV1 from "../pages/Chat/ChatBotV1";
import SelectedImages from "../pages/CardService/SelectedImages";
import SelectGedFolder from "../pages/CardService/SelectGedFolder";
import SelectClient from "../pages/CardService/SelectClient";
import SelectClientCase from "../pages/CardService/SelectClientCase";

class AppNavigation extends React.Component {

    state = {
        loading: true,
        redirectTo: ""
    }

    componentDidMount() {
        AsyncStorage.getItem("pinCode").then(value => {
            if (value === undefined || value === null) {
                this.setState({redirectTo: "login",loading:false})
            } else {
                this.setState({redirectTo: "home",loading:false})
            }
        });
    }


    render() {
        const LandingNavigator = createStackNavigator(
            {
                LogIn: LogInScreen,
                SignUp: SignUpScreen,
                PinCode: PinCode
            },
            {
                initialRouteName: this.state.redirectTo === "login" ? "LogIn" : "PinCode"
            }
        );
        const TabNavigator = createBottomTabNavigator(
            {
                Acceuil: {
                    screen: CardService,
                    navigationOptions: {
                        title: 'Carte services',
                        tabBarIcon: ({tintColor}) => (
                            <Icon color={tintColor} size={20} type="font-awesome" name='credit-card'/>
                        )
                    }
                },
                Journal: {
                    screen: Journal,
                    navigationOptions: {
                        title: "Journal",
                        tabBarIcon: ({tintColor}) => (
                            <View>
                                <Icon color={tintColor} size={20} type="feather" name='clock'/>
                            </View>
                        )
                    }
                },
                Select: {
                    screen: EmptyPage,
                    navigationOptions: {
                        title: 'Sélectionner',
                        tabBarIcon: ({tintColor}) => (
                            <View>
                                <Icon color={tintColor} size={20} type="font-awesome" name="hand-o-up"/>
                            </View>
                        )
                    }
                },
                ChatBot: {
                    screen: ChatBotV1,
                    navigationOptions: {
                        title: 'ChatBot',
                        tabBarIcon: ({tintColor}) => (
                            <View>
                                <Icon color={tintColor} size={20} type="material-community" name='robot'/>
                            </View>
                        )
                    }
                },
                MonCompte: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        title: 'Mon compte',
                        tabBarIcon: ({tintColor}) => (
                            <Icon color={tintColor} size={20} type="feather" name='user'/>
                        )
                    }
                }
            },
            {
                initialRouteName: 'Acceuil',
                navigationOptions: ({navigation}) => {
                    var {routeName} = navigation.state.routes[navigation.state.index];

                    return {
                        headerTitle: routeName,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            alignSelf: 'center',
                            color: 'white',
                            flex: 1
                        },
                        headerStyle: {
                            backgroundColor: '#70B62F',
                            elevation: 0,
                            shadowColor: 'transparent',
                            borderBottomWidth: 0
                        }
                    };
                },
                tabBarOptions: {
                    showLabel: true,
                    activeTintColor: defaultConfig.primaryColor,
                    inactiveTintColor: '#c0c0c0',
                    iconStyle: {},
                    labelStyle: {
                        fontSize: 10,fontWeight:"bold"
                    },
                    style: {
                        //alignItems:"center",
                        backgroundColor: '#fff',
                        borderTopWidth: 1,
                        borderTopColor: "#f0f0f0",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderRightColor: "#f0f0f0",
                        borderLeftColor: "#f0f0f0",
                        height: 65,
                        paddingBottom: 15
                    },
                }
            }
        );

        const MainNavigator = createStackNavigator(
            {
                Nav: TabNavigator,
                Empty: EmptyPage,
                PdfViewr:PdfViewr,
                SelectSociety:SelectSociety,
                Events:Events,
                EventDetail:EventDetail,
                SelectedImages:SelectedImages,
                SelectGedFolder:SelectGedFolder,
                SelectClient:SelectClient,
                SelectClientCase:SelectClientCase

            },
            {

                defaultNavigationOptions: {
                    header: null,
                    headerTitleStyle: {
                        fontSize: 17,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: 'white',
                        flex: 1
                    },
                    headerStyle: {
                        backgroundColor: defaultConfig.primaryColor,
                        elevation: 0,
                        shadowColor: 'transparent',
                        borderBottomWidth: 0
                    }
                }
            }
        );

        const Navigator = createSwitchNavigator(
            {
                Landing: {
                    screen: LandingNavigator
                },
                Main: {
                    screen: MainNavigator
                }
            },
            {

                initialRouteName: "Landing"
            }
        );
        const AppContainer = createAppContainer(Navigator);

        return (
            this.state.loading === true ?
                <View style={{flex: 1, justifyContent: "center", flexDirection: "row", backgroundColor: "#fff"}}>
                    <ActivityIndicator size="large" color="red"/>
                </View> :
                <AppContainer/>
        )
    }


}


export default AppNavigation;



