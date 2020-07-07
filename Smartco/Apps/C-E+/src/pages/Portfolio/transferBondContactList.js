/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, ScrollView, Dimensions, PermissionsAndroid} from 'react-native';
import styles from './styles';
import { account } from '../../AppStyles';
import BackButton from '../../components/BackButton/BackButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { ButtonGroup, ListItem } from "react-native-elements"
import TextAvatar from "react-native-text-avatar"
import SearchBar from "../../components/SearchBar";
const { width, height } = Dimensions.get('window');
import Contacts from 'react-native-contacts';


class transfertBondContactlist extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title="" />,
            title: "",
            headerRight: <View />
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            selectedIndex: 0,
            contacts: [],
            contactsCopy:[],
            bond:this.props.navigation.state.params.bond,
            searchPlaceholder: "Chercher",
            searchInput:""
        };

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({contacts:global.contacts,contactsCopy:global.contacts,loading:false})
        },50);
    }

    render() {
        const buttons = ['Tous', 'Comptes bancaires'];
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.loading === true ?

                        <Spinner
                            visible={this.state.loading}
                            textContent={''}
                        /> :
                        <View style={account.contactsContainer}>

                            <Text style={{marginLeft:10,color:"#000",fontWeight:"bold",fontSize:16,marginTop:20}}>A qui transférer ?</Text>

                            <View style={{ marginTop: 15 }}>

                                <ButtonGroup
                                    onPress={() => {}}
                                    selectedIndex={this.state.selectedIndex}
                                    buttons={buttons}
                                    containerStyle={{ height: 40 }}
                                />

                                <SearchBar
                                    searchPlaceholder={this.state.searchPlaceholder}
                                    onChangeText={(text) => this.setState({searchInput:text})}
                                />

                            </View>
                            <View style={{ marginLeft: 10, marginTop: 30 }}>
                                <Text style={{ color: "grey", fontSize: 14 }}>Amis</Text>

                                {
                                    this.state.contacts.map((item, key) => (
                                        item.phoneNumbers.length > 0 && item.displayName !== null && item.displayName !== undefined && item.displayName !== "" &&
                                        ( (item.displayName.toLowerCase().includes(this.state.searchInput.toLowerCase()))  ||
                                            (item.phoneNumbers[0].number.replace(/ +/g, "").toLowerCase().includes(this.state.searchInput.toLowerCase()))    ) &&
                                        <ListItem
                                            key={key}
                                            leftElement={ (item.thumbnailPath === null || item.thumbnailPath === undefined || item.thumbnailPath === "")  &&
                                                <TextAvatar
                                                    backgroundColor={
                                                        Math.floor(Math.random() * 5) === 1 ? "#E91E63" :
                                                        Math.floor(Math.random() * 5) === 2 ? "#2196F3" :
                                                        Math.floor(Math.random() * 5) === 3 ? "#9C27B0" :
                                                        Math.floor(Math.random() * 5) === 4 ? "#3F51B5" :
                                                        Math.floor(Math.random() * 5) === 5 ? "#00BCD4" : "#F44336"
                                                    }
                                                    textColor={'#fff'}
                                                    size={40}
                                                    type={'circle'}
                                                    bottomDivider
                                                >
                                                    {item.displayName || "X"}
                                                </TextAvatar>
                                            }
                                            leftAvatar={item.thumbnailPath !== null && item.thumbnailPath !== undefined && item.thumbnailPath !== ""
                                            && {source:{uri:item.thumbnailPath}} }
                                            bottomDivider
                                            title={item.displayName || ""}
                                            subtitle={item.phoneNumbers.length > 0 ? (item.phoneNumbers[0].number || "") : 'Numéro inconnu'}
                                            onPress={() => this.props.navigation.navigate("SelectedContactScreen",{contact:item, bond:this.state.bond})}
                                        />
                                    ))
                                }

                            </View>




                        </View>
                }

            </ScrollView>
        );
    }
}



export default transfertBondContactlist;
