import React, {useState} from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {Button, Header, Icon, ListItem, Overlay} from "react-native-elements";
import Pdf from "react-native-pdf";
import moment from "moment";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function EventItem(props) {

    const [showDoc, setDocVisibility] = useState(false);
    const [docUrl, setDocUrl] = useState("");
    const [docName, setdocName] = useState("");
    const [nbPages, setNbPages] = useState("");

    return(
        <View style={{padding:10,marginBottom:20}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#00cc7f'}}>{props.title}</Text>
            <Text style={{fontSize:12,fontWeight:'normal',color:'#c0c0c0'}}>{moment(props.dateFin).fromNow(false)}</Text>
            <View style={{height:2,marginTop:10,marginBottom:15,backgroundColor:"#f0f0f0"}}/>
            <View style={{flexDirection:"row"}}>
                <View style={{width:"50%"}}>
                    <View style={{flexDirection:"row"}}>
                        <Icon type="feather" name="calendar" color="#00cc7f" size={12} />
                        <Text style={{marginLeft:5,fontSize:10}}>{props.date}</Text>
                    </View>
                </View>
                <View style={{width:"50%"}}>
                    <View style={{flexDirection:"row",marginLeft:15}}>
                        <Icon type="font-awesome" name="calendar-plus-o" color="#00cc7f" size={12} />
                        <Text style={{marginLeft:5,fontSize:10}}>{"Ajouter à mon agenda"}</Text>
                    </View>

                </View>
            </View>
            <View style={{flexDirection:"row",marginTop:10}}>
                <View style={{width:"50%"}}>
                    <View style={{flexDirection:"row"}}>
                        <Icon type="feather" name="map-pin" color="#00cc7f" size={12} />
                        <Text style={{marginLeft:5,fontSize:10}}>{props.adress_phy}</Text>
                    </View>
                </View>
                <View style={{width:"50%"}}>
                    <View style={{flexDirection:"row",marginLeft:15}}>
                        <Icon type="feather" name="video" color="#00cc7f" size={12} />
                        <Text style={{marginLeft:5,fontSize:10}}>{props.adress_virt}</Text>
                    </View>

                </View>
            </View>
            <View style={{ alignItems: 'center',marginTop:30}}>
                {
                    props.finished === true ?
                        <Button title="Voir résultat"
                                buttonStyle={{width: (width / 2), height: 35, backgroundColor: "#00cc7f"}}
                                titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                onPress={props.onPressBtnVote}
                        /> :
                        <Button title="Effectuer le vote"
                                buttonStyle={{width: (width / 2), height: 35, backgroundColor: "#00cc7f"}}
                                titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                onPress={props.onPressBtnVote}
                        />
                }

            </View>
            {
                props.showDocs === true &&
                <View style={{marginTop:30}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'#00cc7f',alignSelf:"center"}}>Fichiers à consulter</Text>
                    <View style={{height:2,marginTop:10,marginBottom:15,backgroundColor:"#f0f0f0"}}/>
                    <View>
                        {
                            (props.docs || []).map((doc, key) => (
                                <ListItem
                                    bottomDivider={true}
                                    leftElement={
                                        <Icon type="font-awesome" name="file-pdf-o" color="red" size={16}/>
                                    }
                                    key={key}
                                    title={doc.name}
                                    titleStyle={{fontWeight:"bold",fontSize:13}}
                                    rightElement={
                                        <Button title="Voir"
                                                buttonStyle={{width: 60, height: 35, backgroundColor: "#00cc7f"}}
                                                titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                                onPress={() => {
                                                    setDocUrl(doc.url)
                                                    setdocName(doc.name)
                                                    setDocVisibility(true)
                                                } }
                                        />
                                    }
                                />
                            ))
                        }
                    </View>
                </View>
            }


            <Overlay isVisible={showDoc} width={width-20} height={height-40}>
                <Header
                    containerStyle={{height:55,justifyContent:"center",backgroundColor:"#fff",alignItems:"center",paddingBottom:20}}
                    rightComponent={{ icon: 'close', type:"fontisto", color: '#000', onPress:() => setDocVisibility(false) }}
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>{docName}</Text>}
                    leftComponent={<Text style={{fontSize:10,fontWeight:"bold"}}>{nbPages+" pages" || "---" }</Text>}
                />
                <View style={styles.container}>
                    <Pdf
                        source={{uri:docUrl}}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            setNbPages(numberOfPages)
                        }}
                        onPageChanged={(page,numberOfPages)=>{
                            //console.log(`current page: ${page}`);
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        style={styles.pdf}/>
                </View>
                <View style={{height:60,backgroundColor:"#f0f0f0",position:"absolute",bottom:0,right:0,left:0,padding:10}}>
                    <View style={{ alignItems: 'center'}}>
                        <Button title="Liste des résolutions pour vote"
                                buttonStyle={{width: (width - 50), height: 35, backgroundColor: "rgb(235, 0, 141)"}}
                                titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                onPress={() => {}}
                        />
                    </View>
                </View>
            </Overlay>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:width -50,
        height:height -300,
    }
});