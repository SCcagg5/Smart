import React from 'react';
import {View, AsyncStorage, Dimensions} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
} from 'react-navigation';
import WelcomeScreen from '../pages/Welcome/WelcomeScreen';
import LogInScreen from '../pages/LogIn/LogInScreen';
import SignUpScreen from '../pages/SignUp/SignUpScreen';

import Comptes from '../pages/Comptes/Comptes';
import Dashboard from '../pages/Dashboard/Dashboard';
import {Icon} from 'react-native-elements'
import defaultConfig from "../constants/defaultConfig";

import RegisterPhoneNumber from "../pages/LogIn/registerPhoneNumber"

import ProfileScreen from "../pages/Profile/ProfileScreen";

import PinCode from "../pages/PinCode/PinCode"
import scan from "../pages/scan/scan";

import commander from "../pages/wines/commander"
import wines from "../pages/wines/wines"
import Wine from "../pages/wines/wine"
import PlayVideo from "../pages/wines/Video"
import stripeWebView from "../pages/wines/stripeWebView";
import listcard from "../pages/Cards/listcard";
import addCard from "../pages/Cards/addCard";
import selectCard from "../pages/wines/selectCard";

class AppNavigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: ""
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            if (value === undefined || value === null) {
                this.setState({redirectTo: "login"})
            } else {
                this.setState({redirectTo: "home"})
            }
        });
    }


    render() {
        const LandingNavigator = createStackNavigator(
            {
                Welcome: WelcomeScreen,
                LogIn: LogInScreen,
                SignUp: SignUpScreen,
                RegisterPhoneNumber: RegisterPhoneNumber
            },
            {
                initialRouteName: 'Welcome'
            }
        );
        const TabNavigator = createBottomTabNavigator(
            {
                Comptes: {
                    screen: Comptes,
                    navigationOptions: {
                        title: 'Carte listes services',
                        tabBarIcon: ({tintColor}) => (
                            <Icon color={tintColor} size={24} type="material" name='credit-card'/>
                        )
                    }
                },
              /*  Statistiques: {
                    screen: Statistiques,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => (
                            <View>
                                <Icon color={tintColor} size={24} type="font-awesome" name='clock-o'/>
                            </View>
                        )
                    }
                },
                BodyCheck: {
                    screen: bodyCheck,
                    navigationOptions: {

                        title: 'BodyCheck',
                        tabBarIcon: ({tintColor}) => (
                            <View>
                                <FontAwesomeIcon style={[{color: tintColor}]} size={24} name='hand-o-up'/>
                            </View>
                        )
                    }
                },
                Depenses: {
                    screen: Depenses,
                    navigationOptions: {
                        title: 'Dépenses',
                        tabBarIcon: ({tintColor}) => (
                            <View>
                                <Icon color={tintColor} size={24} type="font-awesome" name='shopping-cart'/>
                            </View>
                        )
                    }
                },*/
                Dashboard: {
                    screen: Dashboard,
                    navigationOptions: {
                        title: 'Mon compte',
                        tabBarIcon: ({tintColor}) => (
                            <Icon color={tintColor} size={24} type="font-awesome" name='user'/>
                        )
                    }
                }
            },
            {
                initialRouteName: 'Comptes',
                navigationOptions: ({navigation}) => {
                    var {routeName} = navigation.state.routes[navigation.state.index];
                    if (routeName === "BodyCheck")
                        routeName = "BodyCheck";

                    if (routeName === "Dashboard")
                        routeName = "tableau de bord";


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
                    showLabel: false,
                    activeTintColor: '#70B62F',
                    inactiveTintColor: '#c0c0c0',
                    labelStyle: {
                        fontSize: 10
                    },
                    style: {
                        backgroundColor: '#fafafa'
                    }
                }
            }
        );

        const MainNavigator = createStackNavigator(
            {
                Nav: TabNavigator,
                Profile: ProfileScreen,
                /*
                ChatBot: BotCreateSociety,
                BondDetails: BondDetails,
                ChooseAddPayementMethod: ChooseAddPayementMethod,
                TransferBondFirstScreen: TransferBondFirstScreen,
                TransferBondContactList: TransferBondContactList,
                SelectedContactScreen: SelectedContactScreen,
                AmountBondToSendScreen: AmountBondToSendScreen,
                SendLinkAmountScreen: SendLinkAmountScreen,
                Dons: Dons,
                DetailDon: DetailDon,
                MiseEnPlaceDon: MiseEnPlaceDon,
                PetiteMonnaieScreen: PetiteMonnaieScreen,
                PetiteMonnaieValidateScreen: PetiteMonnaieValidateScreen,
                NewRecurentDon: NewRecurentDon,
                DonRecurentValidateScreen: DonRecurentValidateScreen,
                RevolutAddPayment: RevolutAddPayment,
                QuestionsWebView: QuestionsWebView,
                Products:Products,

                ProductDetails:ProductDetails,
                ProductPaiement:ProductPaiement,
                PaiementMethod:PaiementMethod,
                Landing:LandingNavigator,
                TakePicyure:TakePicyure,
                ValidatePicture:ValidatePicture,
                */
                Wines:wines,
                parcourirRepas:wines,
                listcards:listcard,
                wine:Wine,
                PlayVideo:PlayVideo,
                commander:commander,


                stripe:stripeWebView,
                scan:scan,
                addcard:addCard,
                selectCard:selectCard

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
                },
                pinCode: {
                    screen: PinCode
                }
            },
            {

                initialRouteName: this.state.redirectTo === "login" ? "Landing" : "pinCode"
            }
        );
        const AppContainer = createAppContainer(Navigator);

        return (
            <AppContainer/>
        )
    }


}


export default AppNavigation;



