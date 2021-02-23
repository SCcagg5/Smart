import React from "react";
import {Text, TouchableOpacity, View, Alert, AsyncStorage} from "react-native";
import {Header, Icon} from "react-native-elements";
import {Container, Content} from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import Upload from "react-native-background-upload";
import Toast from "react-native-toast-message";

const endpoint = "https://api.smartdom.ch";
const ged_id = "896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9";

export default class SelectGedFolder extends React.Component {

    state = {
        loading: false,
        images: this.props.navigation.state.params.images,
        case: this.props.navigation.state.params.case,
        ged_id:""
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.case)
        AsyncStorage.getItem("ged_id").then( ged_id => {
            AsyncStorage.getItem("token").then(token => {
                AsyncStorage.getItem("usrtoken").then(usrtoken => {
                    this.setState({token: token, usrtoken: usrtoken,ged_id:ged_id})
                });
            });
        })

    }

    uploadDocs = async (folder_id) => {

        let images = this.props.navigation.state.params.images;
        images.map((image, key) => {
            let path = image.image.uri;
            let parts = path.split("/");
            let filename = parts.pop();

            const options = {
                url: endpoint + '/ged/' + this.state.ged_id + '/doc/addfile',
                path: image.image.uri.replace("file://", ""),
                method: 'POST',
                type: 'multipart',
                field: 'file',
                maxRetries: 3,
                headers: {
                    'Content-Type': 'multipart/form-data', // Customize content-type
                    'token': this.state.token,
                    'usrtoken': this.state.usrtoken
                },
                parameters: {
                    'folder_id': folder_id
                },
                // Below are options only supported on Android
                notification: {
                    enabled: true,
                    enableRingTone: true,
                    onProgressTitle: "Téléchargement en cours...",
                    onProgressMessage: filename,
                    onCompleteTitle: "Téléchargement terminé",
                    onCompleteMessage: filename + "est envoyé avec succès",
                    onErrorTitle: "Téléchargement erroné",
                    onErrorMessage: "Une erreur est survenue ! Vérifier votre connexion ou débit internet"
                },
                useUtf8Charset: true
            }

            Upload.startUpload(options).then((uploadId) => {
                if (key === 0) {
                    setTimeout(() => {
                        this.props.navigation.pop(4)
                    }, 350)
                    Toast.show({
                        type: 'info',
                        position: 'top',
                        text1: 'Téléchargement en cours...',
                        text2: '',
                        visibilityTime: 5000,
                        autoHide: true
                    });
                }
                Upload.addListener('progress', uploadId, (data) => {
                    console.log(`Progress: ${data.progress}%`)
                })
                Upload.addListener('error', uploadId, (data) => {
                    this.props.navigation.pop(3)
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: "Une errreur est survenue lors de téléchargement de l'image " + filename,
                        text2: 'Vérifier votre connexion ou débit internet',
                        visibilityTime: 4000,
                        autoHide: true
                    });
                })
                Upload.addListener('cancelled', uploadId, (data) => {
                    console.log(`Cancelled!`)
                })
                Upload.addListener('completed', uploadId, (data) => {
                    if (key === images.length - 1) {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Téléchargement terminé',
                            text2: 'Votre téléchargement est bien terminé avec succès',
                            visibilityTime: 5000,
                            autoHide: true
                        });
                    }
                })
            }).catch((err) => {
                console.log('Upload error!', err)
            })
        });
    }

    render() {
        return (

            <View style={{flex: 1}}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Chargement...'}
                    textStyle={{color: "#fff", fontSize: 14, marginTop: -25}}
                />

                <Container>
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
                        centerComponent={<Text
                            style={{fontWeight: "bold"}}>{"Dossier sélectioné : " + this.state.case.name}</Text>}
                    />
                    <Content>
                        <View style={{marginTop: 20, marginLeft: 20, marginRight: 20}}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                alignSelf: "center",
                                textAlign: "center"
                            }}>Dans quel sous dossier voulez-vous les ajouter ? </Text>
                        </View>
                        <View style={{marginTop: 25, marginLeft: 25}}>
                            {
                                this.state.case.Content.folders.length === 0 &&
                                <View style={{textAlign:"center"}}>
                                    <Text style={{color:"grey",fontSize:15,marginTop:6}}>Aucun sous dossier trouvé !</Text>
                                </View>
                            }
                            {
                                (this.state.case.Content.folders || []).map((item, key) => (
                                    <TouchableOpacity onPress={() => {
                                        Alert.alert(
                                            'Confirmation',
                                            'Voulez-vous vraiment envoyer les images sélectionnées vers le dossier <' + item.name + '> du client ' + this.state.case.name + ' ?',
                                            [
                                                {
                                                    text: 'Annuler',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Oui', onPress: () => {
                                                        this.uploadDocs(item.id)
                                                    }
                                                }
                                            ],
                                            {cancelable: false}
                                        );
                                    }}
                                    >
                                        <View style={{flexDirection: "row", marginBottom: 8}}>
                                            <View style={{width: "15%"}}>
                                                <Icon name="folder" type="material" size={30} color="#c0c0c0"/>
                                            </View>
                                            <View style={{width: "85%"}}>
                                                <Text style={{
                                                    color: "grey",
                                                    fontSize: 15,
                                                    marginTop: 6
                                                }}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                ))
                            }
                        </View>
                    </Content>


                </Container>

            </View>


        )
    }

}