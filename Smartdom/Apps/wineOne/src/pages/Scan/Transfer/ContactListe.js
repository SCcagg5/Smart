/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Header, ListItem} from "react-native-elements"
import TextAvatar from "react-native-text-avatar"
import SearchBar from "../../../components/SearchBar";


const { width, height } = Dimensions.get('window');



export default class ContactListe extends React.Component {


    state = {
        loading: true,
        selectedIndex: 0,
        contacts: [],
        contactsCopy:[],
        searchPlaceholder: "Chercher",
        searchInput:"",
        asset:this.props.navigation.state.params.asset,
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({contacts:global.contacts,contactsCopy:global.contacts,loading:false})
        },50);
    }

    render() {
        return (
            <View>
                <Header
                    containerStyle={{
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                    leftComponent={{
                        icon: 'arrow-back', type: "material", color: '#000', onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>A qui transférer ?</Text>}
                />
                <View>
                    <ScrollView style={{backgroundColor:"#f0f0f0"}}>
                        {
                            this.state.loading === true ?

                                <Spinner
                                    visible={this.state.loading}
                                    textContent={''}
                                /> :
                                <View style={{borderRadius: 10, backgroundColor: 'white', width: '90%', marginBottom: 20, alignSelf: 'center', marginTop: 15}}>

                                    <View style={{ marginTop: 15 }}>

                                        <SearchBar
                                            searchPlaceholder={this.state.searchPlaceholder}
                                            onChangeText={(text) => this.setState({searchInput:text})}
                                        />

                                    </View>
                                    <View style={{ marginLeft: 10, marginTop: 10 }}>
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
                                                    onPress={() => this.props.navigation.navigate("ContactDetail",{contact:item,asset:this.state.asset})}
                                                />
                                            ))
                                        }

                                    </View>




                                </View>
                        }

                    </ScrollView>
                </View>
            </View>

        );
    }
}
