import React from 'react';
import {
    Dimensions,
    Keyboard,
    Platform,
    View,
    Text as TextReact,
    TouchableOpacity, ScrollView, TouchableWithoutFeedback
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import botcall from "../../assets/icons/botcall.jpg";
import user from "../../assets/icons/user.png";
import { Icon,Text,Button as BtnNb} from "native-base";
import {Input, Overlay, ListItem, CheckBox, Button, Header} from "react-native-elements";
import "moment/locale/fr";
import CustomCheckBox from "../../components/checkBox/checkBox";
import {TypingAnimation} from 'react-native-typing-animation';
import moment from "moment";
import "moment/locale/fr";
import SearchBar from "../../components/SearchBar";
import TextAvatar from "react-native-text-avatar"
import Share from "react-native-share";
import styles from "../Auth/LogIn/styles";

moment.locale('fr')

let window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');
const contentHeight = window.height;

const answers = [
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: "Je suis un chatbot et je suis à votre disposition.",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: "Qu'est-ce que vous-voulez faire ?",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: "Quels sont les membres que vous voulez ajoutées à la visioconférence ?",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: "Quel message à envoyer au membres à fin de participer à la réunion",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: "Félicitation ! La visioconférence à été bien crée",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: "Vous pouvez joindre la réunion en cliquant sur ce lien:",
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
    {
        _id: Math.random() * (+1000 - +10) + 10,
        text: 'https://meet.smartdom.ch/Conf'+moment().format("YYYYMMDDHHmmss"),
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Botler',
            avatar: botcall,
        }
    },
];


export default class ChatBotV1 extends React.Component {


    constructor(props) {
        super(props);
    }

    state = {
        marge: 150,
        active: false,
        text: "",
        gifted: [],
        answers: [],
        height: contentHeight - 150,
        inputContentType: 'Empty',
        checked_choix1: "",
        isTyping: false,

        showContactModal:false,
        contacts: [],
        contactsCopy:[],
        searchPlaceholder: "Chercher",
        searchInput:"",
        action:"",
        confUrl:'https://meet.smartdom.ch/Conf'+moment().format("YYYYMMDDHHmmss")
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (e) => {
        console.log(this.state.height)
        console.log(e.endCoordinates.height)
        this.setState({height: contentHeight - e.endCoordinates.height});
    };  

    _keyboardDidHide = (e) => {
        //console.log(this.state.height)
        this.setState({height: contentHeight - this.state.marge});
    };

    componentWillMount() {

        this.setState({
            gifted: [
                {
                    _id: 1,
                    text: 'Bienvenue sur SmartCo ! ',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Botler',
                        avatar: botcall,
                    },
                },
            ]
        });

        setTimeout(() => {
            this.setState({isTyping: true});

            setTimeout(() => {
                this.setState({isTyping: false});
                this.setState(previousState => ({
                    gifted: GiftedChat.append(previousState.gifted, answers[0]),
                }));

                setTimeout(() => {
                    this.setState({isTyping: true});
                    setTimeout(() => {
                        this.setState({isTyping: false});
                        this.setState(previousState => ({
                            gifted: GiftedChat.append(previousState.gifted, answers[1]),
                        }));

                        setTimeout(() => {
                            this.setState({isTyping: true});
                            setTimeout(() => {

                                this.setState({
                                    isTyping:false,
                                    inputContentType: 'Choix1',
                                    height: contentHeight - 320,
                                    marge: 320
                                });

                            },1200);
                        },200);

                    },1200)
                },200)

            },1200);

        },200);
    }


    sendUserText = (text) => {
        if (text !== '') {
            this.setState(previousState => ({
                gifted: GiftedChat.append(previousState.gifted,
                    {
                        _id: Math.random() * (+1000 - +10) + 10,
                        text: text,
                        createdAt: new Date(),
                        user: {
                            _id: 101,
                            name: 'babba',
                            avatar: user,
                        },
                    },
                ),
            }));
            if(text === "Lancer une visioconférence de groupe"){

                setTimeout(() => {
                    this.setState({isTyping:true,inputContentType: 'Empty', height: contentHeight - 150, marge: 150})
                    setTimeout(() => {
                        this.setState(previousState => ({
                            isTyping: false,
                            gifted: GiftedChat.append(previousState.gifted, answers[2]),
                        }));
                        setTimeout(() => {
                            this.setState({showContactModal:true})
                        },100);
                    },1000);
                },200);

            }
            if(this.state.action === "inputConfName"){
                setTimeout(() => {
                    this.setState({isTyping:true,inputContentType: 'Empty', height: contentHeight - 150, marge: 150})
                    setTimeout(() => {
                        this.setState(previousState => ({
                            isTyping: false,
                            gifted: GiftedChat.append(previousState.gifted, answers[4]),
                        }));

                        setTimeout(() => {
                                            let confUrl = 'https://meet.smartdom.ch/Conf'+moment().format("YYYYMMDDHHmmss")
                                            const shareOptions = {
                                                title: 'Réunion de 15 minute',
                                                message: "Voici l'url de la conférence \n",
                                                url: confUrl,
                                                social: Share.Social.WHATSAPP,
                                                whatsAppNumber: "+21652979291",  // country code + phone number
                                                //filename: 'test' , // only for base64 file in Android
                                            };

                                            Share.shareSingle(shareOptions)
                                                .then((res) => {

                                                    setTimeout(() => {
                                                        this.setState({isTyping:true,inputContentType: 'Empty', height: contentHeight - 150, marge: 150})
                                                        setTimeout(() => {
                                                            this.setState(previousState => ({
                                                                isTyping: false,action:"",
                                                                gifted: GiftedChat.append(previousState.gifted, answers[5]),
                                                            }));
                                                            setTimeout(() => {
                                                                this.setState({isTyping:true,inputContentType: 'Empty', height: contentHeight - 150, marge: 150})
                                                                setTimeout(() => {
                                                                    this.setState(previousState => ({
                                                                        isTyping: false,
                                                                        gifted: GiftedChat.append(previousState.gifted, answers[6]),
                                                                    }));
                                                                },1000);
                                                            },200);
                                                        },1000);
                                                    },200);

                                                })
                                                .catch((err) => {
                                                    err && console.log(err);
                                                });

                                        },500);




                    },1000);
                },200);
            }


        }
    };

    renderChoix1 = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9",marginLeft:25,marginRight:25,borderRadius:15}}>
                <CustomCheckBox checked={this.state.checked_choix1 === "Lancer une visioconférence de groupe"}
                                label="Lancer une visioconférence de groupe" firstItem={true} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_choix1: "Lancer une visioconférence de groupe",
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Lancer une visioconférence de groupe');
                                    }, 400);
                                }}/>
                <CustomCheckBox checked={false} label="Créer une société" firstItem={false} itemHeight={50}
                                onPress={() => {
                                }}/>
                <CustomCheckBox checked={false} label="Augmentation de capiatl" firstItem={false} itemHeight={50}
                                onPress={() => {}}/>
            </View>
        )
    };



    renderInputTextContent = () => {
        return (
                    <View style={{flexDirection: 'row', backgroundColor: "#fff"}}>
                        <View style={{width: '85%', padding: 5, paddingRight: 0}}>
                            <Input
                                value={this.state.text}
                                placeholder="..."
                                onChangeText={(text) => this.setState({
                                    text: text
                                })}
                                inputContainerStyle={{
                                    borderWidth: 1,
                                    borderColor: '#D3D3D3',
                                    borderRadius: 5,
                                    backgroundColor: '#fff',
                                    height: 45,
                                }}
                            />
                        </View>
                        <View style={{width: '20%', padding: 5, paddingLeft: 0}}>
                            <BtnNb transparent onPress={() => {
                                Keyboard.dismiss();
                                this.setState({action:"inputConfName"})
                                setTimeout(() => {
                                    this.sendUserText(this.state.text);
                                    this.setState({text:"",inputContentType: 'Empty', height: contentHeight - 150, marge: 150})

                                },400)



                            }}>
                                <Icon name='send' style={{color: '#00cc7f'}}/>
                            </BtnNb>
                        </View>
                    </View>

        )
    };

    renderTyping = () => {
        return (
            <View style={{
                height: 35,
                backgroundColor: "#F0F0F0",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 10,
                width: 45,
                marginLeft: 53,
                marginBottom: 3
            }}>
                <TypingAnimation
                    dotColor="#6ACDBB"
                    dotAmplitude={3}
                    dotSpeed={0.20}
                    dotRadius={2.5}
                    style={{
                        marginLeft: 8,
                        marginTop: 9
                    }}
                />
            </View>
        )
    };

    renderChat = () => {
        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    locale="fr"
                    dateFormat="DD MMMM, YYYY"
                    messages={this.state.gifted}
                    user={{
                        _id: 101,
                        name: 'babba',
                        avatar: user,
                    }}
                    textStyle={{
                        color: "#6ACDBB"
                    }}
                    showUserAvatar={true}
                    minInputToolbarHeight={0}
                    renderInputToolbar={() => null}
                    listViewProps={{
                        style: {
                            backgroundColor: '#ffffff'
                        },
                    }}
                    renderFooter={this.state.isTyping ? () => this.renderTyping() : () => null}
                />
            </View>


        );
    };

    render() {
        if (Platform.OS === 'ios') {
            return this.renderChat();
        } else {
            return (
                <View style={{flex:1}}>
                    <Header
                        containerStyle={{
                            height: 55,
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            alignItems: "center",
                            paddingBottom: 20
                        }}
                        rightComponent={{
                            icon: 'arrow-back', type: "material", color: '#000', onPress: () => {
                                this.props.navigation.goBack()
                            }
                        }}
                    />

                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <ScrollView style={{flex:1}} >

                            <View style={{height: this.state.height}}>
                                {this.renderChat()}
                            </View>
                            {
                                this.state.inputContentType === 'Choix1' &&
                                this.renderChoix1()
                            }


                            {
                                this.state.inputContentType === 'Text' &&
                                this.renderInputTextContent()
                            }

                        </ScrollView>
                    </TouchableWithoutFeedback>





                    <Overlay isVisible={this.state.showContactModal} width={width-20} height={height-100}
                             onBackdropPress={() => this.setState({showContactModal:false})}>

                                <View>

                                    <ScrollView style={{height:height-180}}>
                                        <View style={{borderRadius: 10, backgroundColor: 'white', width: '100%', marginBottom: 20, alignSelf: 'center', marginTop: 15}}>

                                            <View style={{ marginTop: 15 }}>

                                                <SearchBar
                                                    searchPlaceholder={this.state.searchPlaceholder}
                                                    onChangeText={(text) => this.setState({searchInput:text})}
                                                />

                                            </View>
                                            <View style={{  marginTop: 10 }}>
                                                <Text style={{ color: "grey", fontSize: 14 }}>Contacts</Text>

                                                {
                                                    this.state.contacts.map((item, key) => (
                                                        item.phoneNumbers.length > 0 && item.displayName !== null && item.displayName !== undefined && item.displayName !== "" &&
                                                        ( (item.displayName.toLowerCase().includes(this.state.searchInput.toLowerCase()))  ||
                                                            (item.phoneNumbers[0].number.replace(/ +/g, "").toLowerCase().includes(this.state.searchInput.toLowerCase()))    ) &&
                                                        <ListItem
                                                            key={key}
                                                            leftElement={ (item.thumbnailPath === null || item.thumbnailPath === undefined || item.thumbnailPath === "")  &&
                                                            <TextAvatar
                                                                backgroundColor={"#3F51B5"}
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
                                                            onPress={() => {}}
                                                            rightElement={
                                                                <CheckBox
                                                                    checked={item.checked}
                                                                    containerStyle={{backgroundColor: "#fff", borderWidth: 0, height: 25}}
                                                                    textStyle={{fontWeight: "normal", color: "#000"}}
                                                                    checkedColor="#34c474"
                                                                    uncheckedColor="#c0c0c0"
                                                                    size={18}
                                                                    onPress={() => {
                                                                        let contacts = this.state.contacts;
                                                                        contacts[key].checked = ! item.checked;
                                                                        //console.log(contacts[key])
                                                                        this.setState({contacts:contacts})
                                                                    }}
                                                                    fontFamily="Baloo2-Medium"
                                                                />
                                                            }
                                                        />
                                                    ))
                                                }

                                            </View>
                                        </View>
                                    </ScrollView>




                                </View>
                        <View style={{marginTop:10,marginBottom:20}}>
                            <Button title="Envoyer"
                                    buttonStyle={{width: (width - 50), height: 45, backgroundColor: "rgb(235, 0, 141)"}}
                                    titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                    onPress={() => {
                                        console.log("OK")
                                        this.setState({showContactModal:false})
                                        let members = this.state.contacts.filter(x => x.checked === true);
                                        members.map((item,key) => {
                                            let text = item.displayName || "";
                                            let number = item.phoneNumbers.length  >  0 ? (item.phoneNumbers[0].number || "") : 'Numéro inconnu' ;
                                            this.sendUserText(text + "\n" + number);
                                        })

                                        setTimeout(() => {
                                            this.setState({
                                                isTyping: true,
                                                inputContentType: 'Empty',
                                                height: contentHeight - 150,
                                                marge: 150
                                            })
                                            setTimeout(() => {
                                                this.setState(previousState => ({
                                                    isTyping: false,
                                                    gifted: GiftedChat.append(previousState.gifted, answers[3]),
                                                }));
                                                setTimeout(() => {
                                                    this.setState({
                                                        inputContentType: 'Text',
                                                        height: contentHeight - 220,
                                                        marge: 220
                                                    })
                                                },300);
                                            },1200)
                                        },200)


                                    }}
                            />
                        </View>
                    </Overlay>

                </View>

            )
        }
    }

}