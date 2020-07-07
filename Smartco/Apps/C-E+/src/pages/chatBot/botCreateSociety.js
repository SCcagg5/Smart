import React from 'react';
import {
    Dimensions,
    Keyboard,
    Platform,
    View,
    Text as TextReact,
    TouchableOpacity,
    Image
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import botcall from "../../assets/images/botcall.jpg";
import user from "../../assets/images/user.png";
import Dialogflow_V2 from "react-native-dialogflow";
import {Body, Header, Left, Title, Button, Icon, Text} from "native-base";
import {CheckBox, Divider, Input, Overlay} from "react-native-elements";
import "moment/locale/fr";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import CustomCheckBox from "../../customComponents/checkBox/checkBox";
import {TypingAnimation} from 'react-native-typing-animation';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import BackButton from "../../components/BackButton/BackButton";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

let window = Dimensions.get('window');
const contentHeight = window.height;


export default class botCreateSociety extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <BackButton onPress={() => navigation.goBack()}/>
        ),
        title: 'ChatBot',
        headerRight: <View/>
    });

    constructor(props) {

        super(props);
        Dialogflow_V2.setConfiguration("418ad420d812463a928b763c9c992ad6", Dialogflow_V2.LANG_FRENCH);
        this.getDialogFlow = this.getDialogFlow.bind(this);
    }

    state = {
        marge: 130,
        active: false,
        text: '',
        gifted: [],
        answers: [],
        height: contentHeight - 130,
        checkpays1: false,
        checkpays2: false,
        checkpays3: false,
        checkpays4: false,
        checkpays5: false,
        userAdress: '',
        displayListAdress: true,
        inputContentType: 'Empty',
        action: '',
        returnToText: false,

        checked_banque: false,
        checked_assurance: false,
        checked_info_autre: false,

        checked_sante: false,
        checked_habitation: false,
        checked_voiture: false,
        checked_activite: false,
        checked_assurance_autre: false,

        checked_etudiant: false,
        checked_actif: false,
        checked_retraite: false,
        checked_categorie_autre: false,

        checked_quest1_rep1: false,
        checked_quest1_rep2: false,
        checked_quest1_rep3: false,
        checked_quest1_rep4: false,

        checked_quest2_rep1: false,
        checked_quest2_rep2: false,
        checked_quest2_rep3: false,
        checked_quest2_rep4: false,

        checked_quest3_rep1: false,
        checked_quest3_rep2: false,

        checked_quest4_rep1: false,
        checked_quest4_rep2: false,

        isTyping: false,
        showDateTimeModalPicker:false,
        formatedMettingDate:'',
        meetingDate:'',
        meetingTime:'',

        showDateMeetingModal:false,
        showDetailDay :false

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
        this.setState({height: this.state.height - e.endCoordinates.height});
    };

    _keyboardDidHide = (e) => {
        this.setState({height: contentHeight - this.state.marge});
    };

    componentWillMount() {
        this.setState({
            gifted: [
                {
                    _id: 1,
                    text: 'Bonjour! je suis un chatbot! je suis à votre disposition',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Botler',
                        avatar: botcall,
                    },
                },
            ],
        });


        this.getDialogFlow('Bonjour');

    }

    _handleDateTimePicked = (date) => {

        this.setState({
            meetingDate: date,
            meetingTime: moment(date).format('HH:mm'),
            formatedMettingDate: moment(date).format('DD/MM/YYYY HH:mm'),
            showDateTimeModalPicker:false
        });
        alert(this.state.meetingDate+'  '+this.state.meetingTime +'   '+this.state.formatedMettingDate);
    };

    addChoosedResponse = () => {
        this.setState(previousState => ({
            gifted: GiftedChat.append(previousState.gifted,
                {
                    _id: Math.random() * (+1000 - +10) + 10,
                    text: 'Babba Amine',
                    createdAt: new Date(),
                    user: {
                        _id: 101,
                        name: 'babba',
                        avatar: user,
                    },
                },
            ),
        }));
    };

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
            this.setState({
                text: '',
                userAdress: ''
            });
            if (this.state.action === 'YesNo1') {
                this.getDialogFlow('je veux créer une société');
                setTimeout(() => {
                        this.setState({
                            inputContentType: 'Pays',
                            height: contentHeight - 400,
                            marge: 400,
                            action: 'Text'
                        });
                    }
                    , 1200);
            } else if (this.state.action === 'Text') {
                this.getDialogFlow(text);
                setTimeout(() => {
                        this.setState({
                            inputContentType: 'Text',
                            height: contentHeight - 175,
                            marge: 175,
                            action: this.state.returnToText ? 'Text' : 'Adress'
                        });
                    }
                    , 1200);
            } else if (this.state.action === 'Adress') {
                this.getDialogFlow(text);
                setTimeout(() => {
                        this.setState({
                            inputContentType: 'Adress',
                            height: contentHeight - 175,
                            marge: 175,
                            action: 'Text',
                            returnToText: true
                        });
                    }
                    , 1200);
            } else {
                this.getDialogFlow(text);
            }

        }
    };

    onSend(messages = []) {
        this.setState(previousState => ({
            gifted: GiftedChat.append(previousState.gifted, messages),
        }));
        this.getDialogFlow(messages[0].text)
    }

    async getDialogFlow(msg) {
        //access Token lié au compte dialogFlow
        const ACCESS_TOKEN = '78e31b985bd241edb31a54de0d96fa9b';

        this.setState({
            isTyping: true,
            inputContentType: 'Empty',
            height: contentHeight - 130,
            marge: 130
        });
        Dialogflow_V2.requestQuery(msg, result => {
            let imageUrl = null;
            /*if(msg === "Oui")  alert(JSON.stringify(result));*/
            result.result.fulfillment.messages.map((item, i) => {
                //Ici c'est un control pour vérifié si la réponse de DialogFlow est une image
                if (item.payload !== undefined) {
                    if (item.payload.imageUrl !== undefined) {
                        imageUrl = item.payload.imageUrl;
                    }
                }
                return imageUrl
            });

            let answers = [
                {
                    _id: result.id,
                    text: result.result.fulfillment.speech,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Botler',
                        avatar: botcall,
                    },
                    image: imageUrl,
                    imageProps: {
                        height: 200,
                        width: 200
                    }
                },
            ];


            setTimeout(() => {

                this.setState({isTyping: false});
                this.setState(previousState => ({
                    gifted: GiftedChat.append(previousState.gifted, answers),
                }));

                setTimeout(() => {
                    if (result.result.contexts[0].name === 'defaultwelcomeintent-banque-followup') {
                        this.setState({
                            inputContentType: 'Assurance',
                            height: contentHeight - 395,
                            marge: 395
                        });
                        /*this.setState({
                            showDateTimeModalPicker:true
                        })*/
                    }

                    if (result.result.contexts[0].name === 'defaultwelcomeintent-banque-sante-followup') {
                        this.setState({
                            inputContentType: 'Categorie',
                            height: contentHeight - 340,
                            marge: 340
                        });
                    }

                    if (result.result.contexts[0].name === 'defaultwelcomeintent-banque-sante-categorie-followup') {
                        this.setState({
                            inputContentType: 'Question1',
                            height: contentHeight - 340,
                            marge: 340
                        });
                    }

                    if (result.result.contexts[0].name === 'defaultwelcomeintent-banque-sante-categorie-question1-followup') {
                        this.setState({
                            inputContentType: 'Question2',
                            height: contentHeight - 340,
                            marge: 340
                        });
                    }

                    if (result.result.contexts[0].name === 'defaultwelcomeintent-banque-sante-categorie-question1-question2-followup' ||
                        result.result.contexts[0].name === 'defaultwelcomeintent-banque-sante-categorie-question1-question2-question3-followup') {
                        this.setState({
                            inputContentType: 'YesNo',
                            height: contentHeight - 175,
                            marge: 175
                        });
                    }
                    if (result.result.metadata.endConversation === true) {
                        this.setState({
                            inputContentType: 'Empty',
                            height: contentHeight - 130,
                            marge: 130
                        });
                    }

                    if (msg === "Bonjour") {

                        this.setState({
                            inputContentType: 'Info',
                            height: contentHeight - 285,
                            marge: 285
                        });
                    }

                }, 400);

            }, 1000);

            return responseJson;

        }, error =>
            console.log(error));
    }

    renderInfoChoiseContent = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9"}}>
                <CustomCheckBox checked={this.state.checked_banque} label="banque" firstItem={true} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_banque: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Banque');
                                    }, 300);

                                }}/>
                <CustomCheckBox checked={this.state.checked_assurance} label="Assurance" firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_assurance: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Assurance');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_info_autre} label="Autre" firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_info_autre: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Autre');
                                    }, 300);
                                }}/>
            </View>
        )
    };

    renderAsuranceTypeContent = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9"}}>
                <CustomCheckBox checked={this.state.checked_sante} label="Santé" firstItem={true} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_sante: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Santé');
                                    }, 300);
                                }} />
                <CustomCheckBox checked={this.state.checked_habitation} label="Habitation" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_habitation: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Habitation');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_voiture} label="Voiture" firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_voiture: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Voiture');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_activite} label="Activité" firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_activite: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Activité');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_assurance_autre} label="Autre" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_assurance_autre: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Autre');
                                    }, 300);
                                }}/>
            </View>
        )
    };

    renderSanteCategorieContent = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9"}}>
                <CustomCheckBox checked={this.state.checked_etudiant} label="Etudiant" firstItem={true} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_etudiant: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Etudiant');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_actif} label="Actif" firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_actif: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Actif');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_retraite} label="Retraité" firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_retraite: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Retraité');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_categorie_autre} label="Autre" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_categorie_autre: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Autre');
                                    }, 300);
                                }}/>
            </View>
        )
    };

    renderQuest1ResponseContent = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9"}}>
                <CustomCheckBox checked={this.state.checked_quest1_rep1} label="Les pourcentages de remboursement"
                                firstItem={true} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest1_rep1: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Les pourcentages de remboursement');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_quest1_rep2} label="Le prix de la cotisation"
                                firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest1_rep2: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Le prix de la cotisation');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_quest1_rep3} label="Les services" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest1_rep3: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Les services');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_quest1_rep4} label="La notoriété de la mutuelle"
                                firstItem={false} itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest1_rep4: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('La notoriété de la mutuelle');
                                    }, 300);
                                }}/>
            </View>
        )
    };

    renderQuest2ResponseContent = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9"}}>
                <CustomCheckBox checked={this.state.checked_quest2_rep1}
                                label="Les soins courants (consultations chez le médecin)" firstItem={true}
                                itemHeight={68}
                                onPress={() => {
                                    this.setState({
                                        checked_quest2_rep1: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Les soins courants');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_quest2_rep2} label="L’hospitalisation" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest2_rep2: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('L’hospitalisation');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_quest2_rep3} label="L’optique" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest2_rep3: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('L’optique');
                                    }, 300);
                                }}/>
                <CustomCheckBox checked={this.state.checked_quest2_rep4} label="Les soins dentaires" firstItem={false}
                                itemHeight={50}
                                onPress={() => {
                                    this.setState({
                                        checked_quest2_rep4: true,
                                    });
                                    setTimeout(() => {
                                        this.sendUserText('Les soins dentaires');
                                    }, 300);
                                }}/>
            </View>
        )
    };

    renderYesNoContent = () => {
        return (
            <View style={{backgroundColor: "#f8f9f9", height: 65, flexDirection: 'row'}}>
                <View style={{
                    width: "50%",
                    borderRightWidth: 1,
                    borderColor: "#F0F0F0",
                    borderTopWidth: 1,
                    borderBottomWidth: 1
                }}>
                    <TouchableOpacity style={{height: 60, marginTop: 18, alignItems: 'center'}}
                                      onPress={() => {
                                          this.sendUserText('Oui');
                                      }}>
                        <TextReact style={{color: "#000", fontSize: 14, fontFamily: "Roboto_medium"}}>OUI</TextReact>
                    </TouchableOpacity>
                </View>
                <View style={{width: "50%", borderTopWidth: 1, borderColor: "#F0F0F0", borderBottomWidth: 1}}>
                    <TouchableOpacity style={{height: 60, marginTop: 18, alignItems: 'center'}}
                                      onPress={() => {
                                          this.sendUserText('Non');
                                      }}>
                        <TextReact style={{color: "#000", fontSize: 14, fontFamily: "Roboto_medium"}}>NON</TextReact>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    renderInputTextContent = () => {
        return (
            <View style={{flexDirection: 'row', backgroundColor: "#fff"}}>
                <View style={{width: '85%', padding: 5, paddingRight: 0}}>
                    <Input
                        value={this.state.text}
                        placeholder="Tapez votre réponse ici..."
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
                    <Button transparent onPress={() => {
                        Keyboard.dismiss();
                        this.sendUserText(this.state.text);
                    }}>
                        <Icon name='send' style={{color: '#00cc7f'}}/>
                    </Button>
                </View>
            </View>
        )
    };

    renderInputAdressContent = () => {
        return (
            <View style={{flexDirection: 'row', backgroundColor: "#fff"}}>
                <View style={{width: '85%', padding: 5, paddingRight: 0}}>
                    <GooglePlacesAutocomplete
                        placeholder="Adresse de rue, Ville, Etat"
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={"default"}
                        styles={{
                            textInputContainer: {
                                width: "100%",
                                borderWidth: 1,
                                borderColor: '#D3D3D3',
                                borderRadius: 5,
                                backgroundColor: '#fff',
                            },
                            textInput: {
                                color: "#000",
                                fontSize: 16
                            },
                            predefinedPlacesDescription: {
                                color: "#1faadb"
                            }
                        }}
                        currentLocation={false}
                        query={{
                            key: "AIzaSyARlXyxvLMWajwy_2X4QXOxhzgaFAOF5RY",
                            language: "fr",
                            types: "geocode"
                        }}
                        listViewDisplayed={this.state.displayListAdress}
                        enablePoweredByContainer={false}
                        onPress={data => {
                            this.setState({
                                userAdress: data.description,
                                displayListAdress: false
                            });
                        }}
                        textInputProps={{
                            onChangeText: (text) => {
                                this.setState({
                                    displayListAdress: true,
                                    userAdress: text
                                });
                            }
                        }}

                    />
                </View>
                <View style={{width: '20%', padding: 5, paddingLeft: 0}}>
                    <Button transparent onPress={() => {
                        Keyboard.dismiss();
                        this.sendUserText(this.state.userAdress);
                        this.setState({userAdress: ''})
                    }}>
                        <Icon name='send' style={{color: '#00cc7f'}}/>
                    </Button>
                </View>
            </View>
        )
    };

    renderPaysListContent = () => {
        return (
            <View style={{flexDirection: 'row', backgroundColor: "#fff"}}>
                <View style={{width: '15%', marginLeft: 30}}>
                    <Image style={{width: 40, height: 40, marginTop: 5}}
                           source={require('../../assets/images/france.png')}/>
                    <Image style={{width: 40, height: 40, marginTop: 15}}
                           source={require('../../assets/images/switzerland.png')}/>
                    <Image style={{width: 40, height: 40, marginTop: 15}}
                           source={require('../../assets/images/tunisia.png')}/>
                    <Image style={{width: 40, height: 40, marginTop: 15}}
                           source={require('../../assets/images/singapore.png')}/>
                    <Image style={{width: 40, height: 40, marginTop: 15}}
                           source={require('../../assets/images/china.png')}/>
                </View>
                <View style={{width: '80%'}}>
                    <View style={{marginRight: 40}}>
                        <CheckBox
                            title='France'
                            iconRight
                            iconType='material'
                            checkedIcon='check-box'
                            uncheckedIcon='check-box-outline-blank'
                            checkedColor='#6ACDBB'
                            containerStyle={{
                                marginTop: 5,
                                marginLeft: 10,
                                backgroundColor: 'transparent',
                                borderTopWidth: 0,
                                borderRightWidth: 0,
                                borderLeftWidth: 0
                            }}
                            textStyle={{
                                fontWeigh: 100,
                                fontSize: 16,
                                letterSpacing: 0.22,
                                color: 'grey', flexDirection: 'column', alignSelf: 'center', flex: 1
                            }}
                            checked={this.state.checkpays1}
                            onPress={() => {
                                this.setState({checkpays1: true});
                                setTimeout(() => {
                                        this.setState({inputContentType: 'Empty', height: contentHeight - 160, marge: 160});
                                        this.sendUserText('France');
                                        setTimeout(() => {
                                                this.setState({
                                                    inputContentType: 'Text',
                                                    height: contentHeight - 175,
                                                    marge: 175
                                                })
                                            }
                                            , 1000);
                                    }
                                    , 1000);
                            }}

                        /><CheckBox
                        title='Suisse'
                        iconRight
                        iconType='material'
                        checkedIcon='check-box'
                        uncheckedIcon='check-box-outline-blank'
                        checkedColor='#6ACDBB'
                        containerStyle={{
                            marginLeft: 10,
                            backgroundColor: 'transparent',
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderLeftWidth: 0
                        }}
                        textStyle={{
                            fontWeigh: 100,
                            fontSize: 16,
                            letterSpacing: 0.22,
                            color: 'grey', flexDirection: 'column', alignSelf: 'center', flex: 1
                        }}
                        checked={this.state.checkpays2}
                        onPress={() => {
                            this.setState({checkpays2: true});
                            setTimeout(() => {
                                    this.setState({inputContentType: 'Empty', height: contentHeight - 160, marge: 160});
                                    this.sendUserText('Suisse');
                                    setTimeout(() => {
                                            this.setState({inputContentType: 'Text', height: contentHeight - 175, marge: 175})
                                        }
                                        , 1000);
                                }
                                , 1000);
                        }}

                    /><CheckBox
                        title='Tunisie'
                        iconRight
                        iconType='material'
                        checkedIcon='check-box'
                        uncheckedIcon='check-box-outline-blank'
                        checkedColor='#6ACDBB'
                        containerStyle={{
                            marginLeft: 10,
                            backgroundColor: 'transparent',
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderLeftWidth: 0
                        }}
                        textStyle={{
                            fontWeigh: 100,
                            fontSize: 16,
                            letterSpacing: 0.22,
                            color: 'grey', flexDirection: 'column', alignSelf: 'center', flex: 1
                        }}
                        checked={this.state.checkpays3}
                        onPress={() => {
                            this.setState({checkpays3: true});
                            setTimeout(() => {
                                    this.setState({inputContentType: 'Empty', height: contentHeight - 160, marge: 160});
                                    this.sendUserText('Tunis');
                                    setTimeout(() => {
                                            this.setState({inputContentType: 'Text', height: contentHeight - 175, marge: 175})
                                        }
                                        , 1000);
                                }
                                , 1000);
                        }}

                    /><CheckBox
                        title='Singapore'
                        iconRight
                        iconType='material'
                        checkedIcon='check-box'
                        uncheckedIcon='check-box-outline-blank'
                        checkedColor='#6ACDBB'
                        containerStyle={{
                            marginLeft: 10,
                            backgroundColor: 'transparent',
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderLeftWidth: 0
                        }}
                        textStyle={{
                            fontWeigh: 100,
                            fontSize: 16,
                            letterSpacing: 0.22,
                            color: 'grey', flexDirection: 'column', alignSelf: 'center', flex: 1
                        }}
                        checked={this.state.checkpays4}
                        onPress={() => {
                            this.setState({checkpays4: true});
                            setTimeout(() => {
                                    this.setState({inputContentType: 'Empty', height: contentHeight - 160, marge: 160});
                                    this.sendUserText('Singapore');
                                    setTimeout(() => {
                                            this.setState({inputContentType: 'Text', height: contentHeight - 175, marge: 175})
                                        }
                                        , 1000);
                                }
                                , 1000);
                        }}

                    /><CheckBox
                        title='Chine	'
                        iconRight
                        iconType='material'
                        checkedIcon='check-box'
                        uncheckedIcon='check-box-outline-blank'
                        checkedColor='#6ACDBB'
                        containerStyle={{
                            marginLeft: 10,
                            backgroundColor: 'transparent',
                            borderTopWidth: 0,
                            borderRightWidth: 0,
                            borderLeftWidth: 0
                        }}
                        textStyle={{
                            fontWeigh: 100,
                            fontSize: 16,
                            letterSpacing: 0.22,
                            color: 'grey', flexDirection: 'column', alignSelf: 'center', flex: 1
                        }}
                        checked={this.state.checkpays5}
                        onPress={() => {
                            this.setState({checkpays5: true});
                            setTimeout(() => {
                                    this.setState({inputContentType: 'Empty', height: contentHeight - 160, marge: 160});
                                    this.sendUserText('Chine');
                                    setTimeout(() => {
                                            this.setState({inputContentType: 'Text', height: contentHeight - 175, marge: 175})
                                        }
                                        , 1000);
                                }
                                , 1000);
                        }}

                    />
                    </View>
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
                <View>

                    <View style={{height: this.state.height}}>
                        {this.renderChat()}
                    </View>
                    {
                        this.state.inputContentType === 'YesNo' &&
                        this.renderYesNoContent()
                    }
                    {
                        this.state.inputContentType === 'Pays' &&
                        this.renderPaysListContent()
                    }
                    {
                        this.state.inputContentType === 'Info' &&
                        this.renderInfoChoiseContent()
                    }
                    {
                        this.state.inputContentType === 'Assurance' &&
                        this.renderAsuranceTypeContent()
                    }
                    {
                        this.state.inputContentType === 'Categorie' &&
                        this.renderSanteCategorieContent()
                    }
                    {
                        this.state.inputContentType === 'Question1' &&
                        this.renderQuest1ResponseContent()
                    }
                    {
                        this.state.inputContentType === 'Question2' &&
                        this.renderQuest2ResponseContent()
                    }
                    {
                        this.state.inputContentType === 'Adress' &&
                        this.renderInputAdressContent()
                    }
                    {
                        this.state.inputContentType === 'Text' &&
                        this.renderInputTextContent()
                    }

                    <DateTimePicker
                        isVisible={this.state.showDateTimeModalPicker}
                        onConfirm={this._handleDateTimePicked}
                        onCancel={() => {
                            this.setState({
                                showDateTimeModalPicker:false
                            })
                        }}
                        mode='datetime'
                        minimumDate={new Date()}
                    />

                    <Overlay
                        isVisible={this.state.showDateMeetingModal}
                        width={screenWidth - 40}
                        height={screenHeight - 200}
                        onBackdropPress={() => {
                            this.setState({
                                showDateMeetingModal: false
                            })
                        }}
                    >

                        <View  style={{alignItems:'center',marginTop:25}}>
                            <TextReact style={{color:'grey',fontSize:17,fontWeight:'bold'}}>Prévoir une consultation</TextReact>
                            <TextReact style={{textDecorationLine:'underline',marginTop:20}}>Voir la fiche praticien</TextReact>
                        </View>
                        <View style={{marginLeft:7,marginRight: 7}}>
                            <Divider style={{ backgroundColor: '#F0F0F0',height:2,marginTop:25}}/>
                            <View style={{backgroundColor:"#F0F0F0"}}>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <View style={{width: '83%'}}>
                                        <View style={{alignItems: 'center'}}>
                                            <TextReact style={{
                                                color: '#000',
                                                fontWeight: 'normal',
                                                fontSize: 14,
                                                height: 35,
                                                marginLeft: 20,
                                                marginTop:10
                                            }}>
                                                Samedi 20 juillet 2019
                                            </TextReact>
                                        </View>
                                    </View>
                                    <View style={{width: '21%'}}>
                                        <Button transparent style={{height: 40}} onPress={() => {
                                            this.setState({
                                                showDetailDay: ! this.state.showDetailDay
                                            })
                                        }}>
                                            <Icon name={this.state.showDetailDay ? 'remove' : 'add'}
                                                  type="MaterialIcons" style={{color: '#000'}}/>
                                        </Button>
                                    </View>
                                </View>
                                {
                                    this.state.showDetailDay &&
                                    <View style={{flexDirection:'row',flexWrap: 'wrap',marginLeft:10,marginRight:10,marginBottom: 10}}>
                                        <View style={{borderWidth:1,borderColor:"#000",width:75,height:33,alignItems:'center',marginLeft:10,marginBottom:10}}>
                                            <TextReact style={{marginTop:5}}>07:00</TextReact>
                                        </View>
                                        <View style={{borderWidth:1,borderColor:"#000",width:75,height:33,alignItems:'center',marginLeft:10,marginBottom:10}}>
                                            <TextReact style={{marginTop:5}}>07:00</TextReact>
                                        </View>
                                        <View style={{borderWidth:1,borderColor:"#000",width:75,height:33,alignItems:'center',marginLeft:10,marginBottom:10}}>
                                            <TextReact style={{marginTop:5}}>07:00</TextReact>
                                        </View>
                                        <View style={{borderWidth:1,borderColor:"#000",width:75,height:33,alignItems:'center',marginLeft:10,marginBottom:10}}>
                                            <TextReact style={{marginTop:5}}>07:00</TextReact>
                                        </View>
                                        <View style={{borderWidth:1,borderColor:"#000",width:75,height:33,alignItems:'center',marginLeft:10,marginBottom:10}}>
                                            <TextReact style={{marginTop:5}}>07:00</TextReact>
                                        </View>
                                        <View style={{borderWidth:1,borderColor:"#000",width:75,height:33,alignItems:'center',marginLeft:10,marginBottom:10}}>
                                            <TextReact style={{marginTop:5}}>07:00</TextReact>
                                        </View>
                                    </View>
                                }

                            </View>

                            <View style={{backgroundColor:"#F0F0F0",marginTop:15}}>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                    <View style={{width: '83%'}}>
                                        <View style={{alignItems: 'center'}}>
                                            <TextReact style={{
                                                color: '#000',
                                                fontWeight: 'normal',
                                                fontSize: 14,
                                                height: 35,
                                                marginLeft: 20,
                                                marginTop:10
                                            }}>
                                                Dimance 21 juillet 2019
                                            </TextReact>
                                        </View>
                                    </View>
                                    <View style={{width: '21%'}}>
                                        <Button transparent style={{height: 40}} onPress={() => {
                                            this.setState({
                                                showAddUserModal: false
                                            })
                                        }}>
                                            <Icon name='add' type="MaterialIcons" style={{color: '#000'}}/>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </Overlay>

                </View>

            )
        }
    }

}
