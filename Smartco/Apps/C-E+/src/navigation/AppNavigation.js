/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import { View , AsyncStorage,Dimensions} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import WelcomeScreen from '../pages/Welcome/WelcomeScreen';
import LogInScreen from '../pages/LogIn/LogInScreen';
import SignUpScreen from '../pages/SignUp/SignUpScreen';
import Statistiques from '../pages/Statistiques/Statistiques';
import PortfolioScreen from '../pages/Portfolio/PortfolioScreen';
import Depenses from '../pages/Depenses/Depenses';
import Comptes from '../pages/Comptes/Comptes';
import Dashboard from '../pages/Dashboard/Dashboard';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements'
import defaultConfig from "../constants/defaultConfig";
import BotCreateSociety from "../pages/chatBot/botCreateSociety";
import BondDetails from "../pages/Portfolio/bondDetails"
import ChooseAddPayementMethod from "../pages/Comptes/chooseAddPayementMethod"
import TransferBondFirstScreen from "../pages/Portfolio/transferBondFirstScreen"
import TransferBondContactList from "../pages/Portfolio/transferBondContactList"
import SelectedContactScreen from "../pages/Portfolio/selectedContactScreen"
import RegisterPhoneNumber from "../pages/LogIn/registerPhoneNumber"
import AmountBondToSendScreen from "../pages/Portfolio/amountBondToSendScreen"
import SendLinkAmountScreen from "../pages/Portfolio/sendLinkAmountScreen"
import ProfileScreen from "../pages/Profile/ProfileScreen";
import Dons from "../pages/Dashboard/Dons/Dons";
import DetailDon from "../pages/Dashboard/Dons/DetailDon";
import MiseEnPlaceDon from "../pages/Dashboard/Dons/MiseEnPlaceDon";
import PetiteMonnaieScreen from "../pages/Dashboard/Dons/PetiteMonnaieScreen";
import PetiteMonnaieValidateScreen from "../pages/Dashboard/Dons/PetiteMonnaieValidateScreen";
import NewRecurentDon from "../pages/Dashboard/Dons/NewRecurentDon";
import DonRecurentValidateScreen from "../pages/Dashboard/Dons/DonRecurentValidateScreen";
import RevolutAddPayment from "../pages/Comptes/RevolutAddPayment";

class AppNavigation extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            redirectTo:""
        }
    }

    componentDidMount(){
        AsyncStorage.getItem("uid").then( value => {
            if(value === undefined || value === null){
                this.setState({redirectTo:"login"})
            } else{
                this.setState({redirectTo:"home"})
            }
        });
    }


    render(){
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
                        title: 'Comptes',
                        tabBarIcon: ({ tintColor }) => (
                            <Icon color={tintColor} size={20} type="material" name='credit-card'/>
                        )
                    }
                }, 
                Statistiques: {
                    screen: Statistiques,
                    navigationOptions: { 
                        title: 'Statistiques',
                        tabBarIcon: ({ tintColor }) => (
                            <View>
                                <Icon color={tintColor} size={20} type="material" name='pie-chart'/>
                            </View>     
                        )
                    }
                },
                Portfolio: {
                    screen: PortfolioScreen,
                    navigationOptions: {
                        title: 'Portefeuille',
                        tabBarIcon: ({ tintColor }) => (
                            <View>
                                <FontAwesomeIcon style={[{color: tintColor}]} size={20} name='money'/>
                            </View>
                        )
                    }
                },
                Depenses: {
                    screen: Depenses,
                    navigationOptions: {
                        title: 'Dépenses',
                        tabBarIcon: ({ tintColor }) => (
                            <View>
                                <Icon color={tintColor} size={20} type="feather" name='pie-chart'/>
                            </View>
                        )
                    }
                },
                Dashboard: {
                    screen: Dashboard,
                    navigationOptions: {
                        title: 'Tableau de bord',
                        tabBarIcon: ({ tintColor }) => (
                            <Icon color={tintColor} size={20} type="material" name='dashboard'/>
                        )
                    }
                }
            },
            {
                initialRouteName: 'Comptes',
                navigationOptions: ({ navigation }) => {
                    var { routeName } = navigation.state.routes[navigation.state.index];
                    if( routeName === "Portfolio")
                        routeName = "Portefeuille";
                    if( routeName === "Depenses")
                        routeName = "Dépenses";
                    if( routeName === "Dashboard")
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
                            backgroundColor: '#2F6EB5',
                            elevation: 0, 
                            shadowColor: 'transparent',
                            borderBottomWidth: 0
                        }
                    };
                },
                tabBarOptions: {
                    activeTintColor: '#2F6EB5',
                    inactiveTintColor: '#c0c0c0',
                    labelStyle: {
                        fontSize: 12
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
                ChatBot:BotCreateSociety,
                BondDetails:BondDetails,
                ChooseAddPayementMethod: ChooseAddPayementMethod,
                TransferBondFirstScreen: TransferBondFirstScreen,
                TransferBondContactList: TransferBondContactList,
                SelectedContactScreen: SelectedContactScreen,
                AmountBondToSendScreen: AmountBondToSendScreen,
                SendLinkAmountScreen: SendLinkAmountScreen,
                Dons:Dons,
                DetailDon:DetailDon,
                MiseEnPlaceDon:MiseEnPlaceDon,
                PetiteMonnaieScreen:PetiteMonnaieScreen,
                PetiteMonnaieValidateScreen:PetiteMonnaieValidateScreen,
                NewRecurentDon:NewRecurentDon,
                DonRecurentValidateScreen:DonRecurentValidateScreen,
                RevolutAddPayment:RevolutAddPayment
            },
            {
                defaultNavigationOptions: {
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
                initialRouteName: this.state.redirectTo === "login" ? "Landing" : "Main"
            }
        );
        const AppContainer = createAppContainer(Navigator);

        return(
            <AppContainer/>
        )
    }




}


export default AppNavigation;



