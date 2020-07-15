import React from 'react';
import {View, ActivityIndicator, Text, Dimensions, Image, TouchableOpacity, AsyncStorage,DeviceEventEmitter} from "react-native";
import SmartService from "../../provider/SmartService";
import {Container, Content} from "native-base";
import DesignedLogo from "../../components/logo/designedLogo";
import Spinner from "react-native-loading-spinner-overlay";
import ItemContainer from "../../components/Products/ItemContainer";
import Basket from "../../components/Panier/Basket";
import {Header,Button} from "react-native-elements";
import Modal, {
    ModalContent
} from 'react-native-modals';
import {showMessage} from "../../../custom_modules/react-native-flash-message/src";

const {height, width} = Dimensions.get('window');

export default class Items extends React.Component{

    state={
        loading:false,
        items:[],
        showBottomModal:false,
        selectedItem:"",
        itemNumber:1,
        command:[]
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('clearP', (e) => {
            this.setState({command:[]})
        })
        SmartService.getToken().then( data => {
            if (data.succes === true && data.status === 200) {
                SmartService.getItems(data.data.token).then(items => {
                    AsyncStorage.getItem("command").then( command => {
                        let cmd = [];
                        if(command !== undefined && command !== null){
                            cmd = JSON.parse(command);
                        }
                        this.setState({items:items.data || [],command:cmd})
                    })
                }).catch(err => console.log(err))
            } else {
                alert(data.error)
            }
        }).catch(err => console.log(err))

    }


    render() {
        return(
            <Container>
                <Header
                    containerStyle={{
                        height: 65,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                    rightComponent={<Basket value={this.state.command.length} onPress={() => this.props.navigation.navigate("Panier")}/>}
                    centerComponent={ <DesignedLogo />}
                />
                <Content style={{backgroundColor:"#f0f0f0"}}>
                    <View style={{marginRight:15,marginLeft:15}}>
                        <View style={{marginTop:20}}>
                            {
                                (this.state.items || []).map((item,key) =>
                                    <ItemContainer name={item.title} price={item.price.amount} currency={item.price.currency}
                                                   id={item.id}
                                                   onPress={() => this.props.navigation.navigate("ItemDetail",{item:item})}
                                                   onPressPlusButton={() => {
                                                       this.setState({showBottomModal:true,selectedItem:item})
                                                   }}
                                                   image={
                                                       item.id === "1" ? require("../../assets/images/1bouteille.jpeg") :
                                                           item.id === "2" ? require("../../assets/images/4bouteille.jpeg") :
                                                               item.id === "3" ? require("../../assets/images/12bouteille.jpg") :
                                                                   item.id === "4" ? require("../../assets/images/600bouteille.jpeg") : null
                                                   } />
                                )
                            }

                        </View>


                    </View>



                    <Modal.BottomModal
                        visible={this.state.showBottomModal}
                        onTouchOutside={() => this.setState({ showBottomModal: false,itemNumber:1 })}
                        swipeDirection={['down']}
                        onSwipeOut={(event) => {
                            this.setState({ showBottomModal: false,itemNumber:1 });
                        }}
                    >
                        <ModalContent
                            style={{
                                backgroundColor: 'fff',
                            }}
                        >
                            <Text style={{fontSize:18,alignSelf:"center",fontFamily:"sans-serif-medium"}}>Détails</Text>
                            <View style={{marginLeft:15,marginRight:15,marginTop:20}}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{width:"35%"}}>
                                        <Image source={require("../../assets/images/1bouteille.jpeg")} style={{width:80,height:100,resizeMode:"contain"}}/>
                                    </View>
                                    <View style={{width:"65%",padding:10}}>
                                        <Text style={{fontFamily:"sans-serif-medium",fontSize:14}}>{this.state.selectedItem.title}</Text>
                                        <Text style={{fontSize:13,marginTop:15,color:"#981b1a"}}>
                                            {this.state.selectedItem && this.state.selectedItem.price.amount + " " + this.state.selectedItem.price.currency} </Text>
                                        <View style={{marginTop:5}}>
                                            <View style={{alignItems:"flex-end"}}>
                                                <View style={{flexDirection:"row"}}>
                                                    <TouchableOpacity onPress={() => {
                                                        let nb = this.state.itemNumber;
                                                        if(nb > 1) this.setState({itemNumber: nb -1 })
                                                    }}>
                                                        <View style={{width:25,height:25,backgroundColor:"#c0c0c0",borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                                                            <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>-</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <Text style={{color:"#000",fontSize:15,fontWeight:"bold",marginLeft:5,marginRight:5,marginTop:2}}>{this.state.itemNumber}</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        let nb = this.state.itemNumber;
                                                        this.setState({itemNumber: nb +1 })
                                                    }}>
                                                        <View style={{width:25,height:25,backgroundColor:"#981b1a",borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                                                            <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>+</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{marginTop:20}}>
                                            <Text style={{fontSize:13,color:"#000",fontWeight:"bold"}}>Total:
                                                <Text style={{color:"#981b1a"}}>
                                                    {this.state.selectedItem && "  "+parseInt(this.state.selectedItem.price.amount)*this.state.itemNumber+" Eur"} </Text></Text>
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{marginLeft:"3%",marginTop:20,marginRight:"3%"}}>
                                <View style={{marginTop:20}}>
                                    <View style={{flexDirection:"row",justifyContent: "space-evenly"}}>
                                        <Button title="Annuler" onPress={() => this.setState({showBottomModal:false,itemNumber:1})}
                                                buttonStyle={{width:(width / 2 ) - 50,height:50,backgroundColor:"#f0f0f0"}}
                                                titleStyle={{textTransform:"uppercase",fontSize:14,color:"grey",fontFamily:"sans-serif-medium"}}
                                        />
                                        <Button title="Ajouter au panier"
                                                buttonStyle={{width:(width / 2 ) - 50,height:50,backgroundColor:"#27BF0F"}}
                                                titleStyle={{textTransform:"uppercase",fontSize:14,color:"#fff",fontFamily:"sans-serif-medium"}}
                                                onPress={() => {
                                                    let command = this.state.command || [];
                                                    command.push({id:this.state.selectedItem.id,number:this.state.itemNumber,item:this.state.selectedItem})
                                                    AsyncStorage.setItem("command",JSON.stringify(command)).then( ok => {
                                                        showMessage({message:"Article ajouté au panier avec succès",type:"success",icon:"success"})
                                                        this.setState({showBottomModal:false,itemNumber:1,command:command})
                                                    })

                                                }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ModalContent>
                    </Modal.BottomModal>





                    <Spinner
                        visible={this.state.loading}
                        textContent={'Chargement...'}
                        textStyle={{color:"#fff",fontSize:16}}
                        overlayColor="rgba(0, 0, 0, 0.6)"
                    />

                </Content>
            </Container>
        )
    }

}

