import React from "react";
import {Container, Content} from "native-base";
import {
    Image,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert,
    AsyncStorage,
    ScrollView,
    SafeAreaView, PermissionsAndroid,
    VirtualizedList,
    ActivityIndicator
} from "react-native";
import {Header, CheckBox, Button} from "react-native-elements";
import RNImageToPdf from "react-native-image-to-pdf";
import RNFS from "react-native-fs";
import SmartService from "../../provider/SmartService";
import RNRestart from "react-native-restart";
import Spinner from 'react-native-loading-spinner-overlay';
import CameraRoll from "@react-native-community/cameraroll";
import FastImage from 'react-native-fast-image'
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import ItemListView from "./Components/ItemListView";
import CenterHeaderCount from "./Components/CenterHeaderCount";
import axios from 'axios';
import Upload from 'react-native-background-upload'
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get("screen")

const PHOTOS_COUNT_BY_FETCH = 40;

const endpoint = "https://api.smartdom.ch";
const ged_id = "896ca0ed-8b4a-41fd-aeff-8de26ee1bcf9";


export default class SelectedImages extends React.Component {

    constructor(props) {
        super(props);
        this.selectedImages = []
    }

    state = {
        loading: true,
        loading_msg:"Chargement...",
        upload_msgs:[],
        images: [],
        imagesCp: [],
        lastPhotoFetched: undefined,
        ged_id:"",

        refrechingList:false,
        has_next_page:true,
        end_cursor:null

    }

    componentDidMount() {

        AsyncStorage.getItem("ged_id").then( ged_id => {
            this.setState({ged_id:ged_id})

            const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
            PermissionsAndroid.request(permission).then(res => {
                if (res === 'granted') {
                    this.fetchPhotos(40,this.state.end_cursor);
                } else {
                    alert("NO PERMISSION")
                }
            })
        })

    }


    uploadDocs = async (dossier) => {

        Alert.alert(
            'Confirmation',
            'Voulez-vous vraiment envoyer les images sélectionnées vers le dossier /Courrier/' + dossier + ' ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Oui', onPress: () => {
                        this.setState({loading: true})
                        AsyncStorage.getItem("token").then(token => {
                            AsyncStorage.getItem("usrtoken").then(usrtoken => {
                                this.setState({token: token, usrtoken: usrtoken})
                                SmartService.getGed(this.state.ged_id,token, usrtoken)
                                    .then(async (gedRes) => {
                                        console.log(gedRes)
                                        if (gedRes.succes === true && gedRes.status === 200) {
                                            let folders = gedRes.data.Proprietary.Content.folders || [];
                                            let courrier_folder = folders.find(x => x.name.trim() === "Courrier" || x.name.trim() === "COURRIER" || x.name.trim() === "courrier");

                                            if (courrier_folder) {

                                                let search_folder = courrier_folder.Content.folders.find(x => x.name === dossier)

                                                if (search_folder)
                                                {
                                                    this.setState({loading: false})
                                                    console.log("FOLDER FOUNDED")

                                                    let images = this.selectedImages;
                                                    images.map((image, key) => {
                                                        let path = image.image.uri;
                                                        let parts = path.split("/");
                                                        let filename = parts.pop();

                                                        const options = {
                                                            url: endpoint + '/ged/'+ged_id+'/doc/addfile',
                                                            path: image.image.uri.replace("file://",""),
                                                            method: 'POST',
                                                            type: 'multipart',
                                                            field:'file',
                                                            maxRetries: 3,
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data', // Customize content-type
                                                                'token': token,
                                                                'usrtoken': usrtoken
                                                            },
                                                            parameters:{
                                                                'folder_id': search_folder.id
                                                            },
                                                            // Below are options only supported on Android
                                                            notification: {
                                                                enabled: true,
                                                                enableRingTone:true,
                                                                onProgressTitle:"Téléchargement en cours...",
                                                                onProgressMessage:filename,
                                                                onCompleteTitle:"Téléchargement terminé",
                                                                onCompleteMessage:filename +  "est envoyé avec succès",
                                                                onErrorTitle:"Téléchargement erroné",
                                                                onErrorMessage:"Une erreur est survenue ! Vérifier votre connexion ou débit internet"
                                                            },
                                                            useUtf8Charset: true
                                                        }

                                                        Upload.startUpload(options).then((uploadId) => {
                                                            if(key === 0){
                                                                setTimeout(() => {
                                                                    this.selectedImages = [];
                                                                    this.props.navigation.pop(2)
                                                                },250)
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
                                                                this.selectedImages = [];
                                                                this.props.navigation.pop(2)
                                                                Toast.show({
                                                                    type: 'error',
                                                                    position: 'top',
                                                                    text1: "Une errreur est survenue lors de téléchargement de l'image "+filename,
                                                                    text2: 'Vérifier votre connexion ou débit internet',
                                                                    visibilityTime: 4000,
                                                                    autoHide: true
                                                                });
                                                            })
                                                            Upload.addListener('cancelled', uploadId, (data) => {
                                                                console.log(`Cancelled!`)
                                                            })
                                                            Upload.addListener('completed', uploadId, (data) => {
                                                                if(key === images.length -1){
                                                                    Toast.show({
                                                                        type: 'success',
                                                                        position: 'top',
                                                                        text1: 'Téléchargement terminé',
                                                                        text2: 'Votre téléchargement est bien terminé avec succès',
                                                                        visibilityTime: 4000,
                                                                        autoHide: true
                                                                    });
                                                                }
                                                            })
                                                        }).catch((err) => {
                                                            console.log('Upload error!', err)
                                                        })
                                                    });

                                                }
                                            else {
                                                    SmartService.addFolder(this.state.ged_id,{
                                                        name: dossier,
                                                        folder_id: courrier_folder.id
                                                    }, token, usrtoken).then(async addSearchF_res => {

                                                        let images = this.selectedImages;
                                                        images.map((image, key) => {
                                                            let path = image.image.uri;
                                                            let parts = path.split("/");
                                                            let filename = parts.pop();

                                                            const options = {
                                                                url: endpoint + '/ged/'+this.state.ged_id+'/doc/addfile',
                                                                path: image.image.uri.replace("file://",""),
                                                                method: 'POST',
                                                                type: 'multipart',
                                                                field:'file',
                                                                maxRetries: 3,
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data', // Customize content-type
                                                                    'token': token,
                                                                    'usrtoken': usrtoken
                                                                },
                                                                parameters:{
                                                                    'folder_id': addSearchF_res.data.id
                                                                },
                                                                // Below are options only supported on Android
                                                                notification: {
                                                                    enabled: true,
                                                                    enableRingTone:true,
                                                                    onProgressTitle:"Téléchargement en cours...",
                                                                    onProgressMessage:filename,
                                                                    onCompleteTitle:"Téléchargement terminé",
                                                                    onCompleteMessage:filename +  "est envoyé avec succès",
                                                                    onErrorTitle:"Téléchargement erroné",
                                                                    onErrorMessage:"Une erreur est survenue ! Vérifier votre connexion ou débit internet"
                                                                },
                                                                useUtf8Charset: true
                                                            }

                                                            Upload.startUpload(options).then((uploadId) => {
                                                                if(key === 0){
                                                                    setTimeout(() => {
                                                                        this.selectedImages = [];
                                                                        this.props.navigation.pop(2)
                                                                    },250)
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
                                                                    this.selectedImages = [];
                                                                    this.props.navigation.pop(2)
                                                                    Toast.show({
                                                                        type: 'error',
                                                                        position: 'top',
                                                                        text1: "Une errreur est survenue lors de téléchargement de l'image "+filename,
                                                                        text2: 'Vérifier votre connexion ou débit internet',
                                                                        visibilityTime: 4000,
                                                                        autoHide: true
                                                                    });
                                                                })
                                                                Upload.addListener('cancelled', uploadId, (data) => {
                                                                    console.log(`Cancelled!`)
                                                                })
                                                                Upload.addListener('completed', uploadId, (data) => {
                                                                    if(key === images.length -1){
                                                                        Toast.show({
                                                                            type: 'success',
                                                                            position: 'top',
                                                                            text1: 'Téléchargement terminé',
                                                                            text2: 'Votre téléchargement est bien terminé avec succès',
                                                                            visibilityTime: 4000,
                                                                            autoHide: true
                                                                        });
                                                                    }
                                                                })
                                                            }).catch((err) => {
                                                                console.log('Upload error!', err)
                                                            })
                                                        });

                                                    }).catch(err => {
                                                        console.log(err)
                                                    })

                                                }

                                            }
                                            else {
                                                SmartService.addFolder(this.state.ged_id,{name: "COURRIER"}, token, usrtoken).then(addF_res => {

                                                    SmartService.addFolder(this.state.ged_id,{
                                                        name: dossier,
                                                        folder_id: addF_res.data.id
                                                    }, token, usrtoken).then(async addSubF_res => {

                                                        let images = this.selectedImages;
                                                        images.map((image, key) => {
                                                            let path = image.image.uri;
                                                            let parts = path.split("/");
                                                            let filename = parts.pop();

                                                            const options = {
                                                                url: endpoint + '/ged/'+this.state.ged_id+'/doc/addfile',
                                                                path: image.image.uri.replace("file://",""),
                                                                method: 'POST',
                                                                type: 'multipart',
                                                                field:'file',
                                                                maxRetries: 3,
                                                                headers: {
                                                                    'Content-Type': 'multipart/form-data', // Customize content-type
                                                                    'token': token,
                                                                    'usrtoken': usrtoken
                                                                },
                                                                parameters:{
                                                                    'folder_id': addSubF_res.id
                                                                },
                                                                // Below are options only supported on Android
                                                                notification: {
                                                                    enabled: true,
                                                                    enableRingTone:true,
                                                                    onProgressTitle:"Téléchargement en cours...",
                                                                    onProgressMessage:filename,
                                                                    onCompleteTitle:"Téléchargement terminé",
                                                                    onCompleteMessage:filename +  "est envoyé avec succès",
                                                                    onErrorTitle:"Téléchargement erroné",
                                                                    onErrorMessage:"Une erreur est survenue ! Vérifier votre connexion ou débit internet"
                                                                },
                                                                useUtf8Charset: true
                                                            }

                                                            Upload.startUpload(options).then((uploadId) => {
                                                                if(key === 0){
                                                                    setTimeout(() => {
                                                                        this.selectedImages = [];
                                                                        this.props.navigation.pop(2)
                                                                    },250)
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
                                                                    this.selectedImages = [];
                                                                    this.props.navigation.pop(2)
                                                                    Toast.show({
                                                                        type: 'error',
                                                                        position: 'top',
                                                                        text1: "Une errreur est survenue lors de téléchargement de l'image "+filename,
                                                                        text2: 'Vérifier votre connexion ou débit internet',
                                                                        visibilityTime: 4000,
                                                                        autoHide: true
                                                                    });
                                                                })
                                                                Upload.addListener('cancelled', uploadId, (data) => {
                                                                    console.log(`Cancelled!`)
                                                                })
                                                                Upload.addListener('completed', uploadId, (data) => {
                                                                    if(key === images.length -1){
                                                                        Toast.show({
                                                                            type: 'success',
                                                                            position: 'top',
                                                                            text1: 'Téléchargement terminé',
                                                                            text2: 'Votre téléchargement est bien terminé avec succès',
                                                                            visibilityTime: 4000,
                                                                            autoHide: true
                                                                        });
                                                                    }
                                                                })
                                                            }).catch((err) => {
                                                                console.log('Upload error!', err)
                                                            })
                                                        });

                                                    }).catch(err => {
                                                        console.log(err)
                                                    })

                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            }

                                        }
                                        else {
                                            Alert.alert("Une erreur est survenue ! ")
                                            this.props.navigation.goBack()
                                        }
                                    }).catch(err => {
                                    Alert.alert("Une erreur est survenue ! ")
                                    this.props.navigation.goBack()
                                })

                            });
                        });
                    }
                }
            ],
            {cancelable: false}
        );

    }

    renderItem = (item, index) => {
        return (
            <ItemListView
                item={item}
                index={index}
                updateList={this.updateSelected}
            />
        )
    }

    updateSelected = (index, item) => {
        if(item.selected === false){
            let find_index = this.selectedImages.findIndex(x => x.image.uri === item.image.uri);
            if(find_index > -1){
                this.selectedImages.splice(find_index,1)
            }
        }else{
            this.selectedImages.push(item);
        }
    };

    fetchPhotos(count = PHOTOS_COUNT_BY_FETCH, after) {
        CameraRoll.getPhotos({
            first: count,
            after,
            assetType: 'Photos'
        }).then(data => {
            this.setState({end_cursor:data.page_info.end_cursor,has_next_page:data.page_info.has_next_page,refrechingList:false})
            this.onPhotosFetchedSuccess(data)
        }).catch(err => {
            console.log(err)
        })
    }

    onEndReached() {
        this.fetchPhotos(PHOTOS_COUNT_BY_FETCH, this.lastPhotoFetched);
    }

    onPhotosFetchedSuccess(data) {
        let newPhotos = this.getPhotosFromCameraRollData(data);
        let images = this.state.images.concat(newPhotos);
        this.setState({images: images, loading: false});
        /*if (newPhotos.length > 0)
            this.setState({lastPhotoFetched:newPhotos[newPhotos.length - 1].uri})*/
    }

    getPhotosFromCameraRollData(data) {
        return data.edges.map((asset) => {
            return asset.node;
        });
    }

    handleRefrech = () => {
        console.log("called")
        if(this.state.has_next_page === true){
            this.setState({refrechingList:true})
            this.fetchPhotos(40,this.state.end_cursor)
        }
    }

    _renderFooter = () => {
        return (
            <View
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    alignItems:"center"
                }}
            >
                <Button loading={this.state.refrechingList} onPress={this.handleRefrech} title="Charger plus"
                        buttonStyle={{width: (width / 2 - 50), height: 35,borderWidth: 1,backgroundColor:"#fff",
                            borderRadius: 2,borderColor: '#ddd',
                            borderBottomWidth: 0,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 3,}}
                        titleStyle={{fontSize: 12, color: "#000"}}
                        loadingProps={{color:"#000"}}
                        type={"solid"}
                />
            </View>
        );
    };

    render() {
        return (
            <View style={{flex: 1}}>
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
                        centerComponent={
                            <CenterHeaderCount all={this.state.images.length} count={this.selectedImages.length}
                            />
                        }
                    />
                    <Content>
                        <View style={{marginTop: 20, marginLeft: 8, height:height - 205}}>

                            {
                                this.state.images.length > 0 &&
                                <SafeAreaView style={{flex: 1}}>
                                    <FlatList
                                        data={this.state.images}
                                        numColumns={4}
                                        renderItem={({item, index}) => this.renderItem(item, index)}
                                        keyExtractor={(item, index) => index}
                                        initialNumToRender={40}
                                        /*onEndReached={this.handleRefrech}
                                        onEndReachedThreshold={0.5}*/
                                        ListFooterComponent={this._renderFooter}
                                        /*onRefresh={this.handleRefrech}
                                        refreshing={this.state.refrechingList}*/


                                    />
                                </SafeAreaView>
                            }


                        </View>
                    </Content>

                </Container>
                <View style={{
                    position: "absolute",
                    bottom: 0,
                    height: 55,
                    backgroundColor: "#f0f0f0",
                    flex: 1,
                    width: "100%",
                    padding:10,
                    paddingBottom:5
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: 20,
                        //marginTop: 12,
                        marginRight: 20
                    }}>
                        <View>
                            <TouchableOpacity onPress={() => {
                                let selected = this.selectedImages;
                                if (selected.length > 0) {
                                    this.props.navigation.navigate("SelectClient", {images: this.selectedImages})
                                } else {
                                    Alert.alert("Alerte", "Vous devez sélectionner au moins une image pour continuer !")
                                }

                            }}>
                                <Image source={require("../../assets/images/classer.png")}
                                       style={{width: 20, height: 20, resizeMode: "contain", alignSelf: "center"}}/>
                                <Text style={{fontSize: 10, fontWeight: "bold", alignSelf: "center"}}>Classer</Text>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                let selected = this.selectedImages;
                                if (selected.length > 0) {
                                    this.uploadDocs("Compta")
                                } else {
                                    Alert.alert("Alerte", "Vous devez sélectionner au moins une image pour continuer !")
                                }

                            }}>
                                <Image source={require("../../assets/images/compta.png")}
                                       style={{width: 20, height: 20, resizeMode: "contain", alignSelf: "center"}}/>
                                <Text style={{fontSize: 10, fontWeight: "bold", alignSelf: "center"}}>Compta</Text>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                let selected = this.selectedImages;
                                if (selected.length > 0) {
                                    this.uploadDocs("Clients")
                                } else {
                                    Alert.alert("Alerte", "Vous devez sélectionner au moins une image pour continuer !")
                                }

                            }}>
                                <Image source={require("../../assets/images/clients.png")}
                                       style={{width: 20, height: 20, resizeMode: "contain", alignSelf: "center"}}/>
                                <Text style={{fontSize: 10, fontWeight: "bold", alignSelf: "center"}}>Clients</Text>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                let selected = this.selectedImages;
                                if (selected.length > 0) {
                                    this.uploadDocs("Veille")
                                } else {
                                    Alert.alert("Alerte", "Vous devez sélectionner au moins une image pour continuer !")
                                }
                            }}>
                                <Image source={require("../../assets/images/veille.png")}
                                       style={{width: 20, height: 20, resizeMode: "contain", alignSelf: "center"}}/>
                                <Text style={{fontSize: 10, fontWeight: "bold", alignSelf: "center"}}>Veille</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <Spinner
                    visible={this.state.loading}
                    textContent={this.state.upload_msgs.length > 0 ? this.state.loading_msg + "\n" + this.state.upload_msgs.join("\n") : this.state.loading_msg }
                    textStyle={{color: "#fff", fontSize: 14, marginTop: -25}}
                    overlayColor="rgba(0, 0, 0, 0.65)"
                />
            </View>


        )
    }
}