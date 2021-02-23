import React, {useState} from "react";
import {Button, Header} from "react-native-elements";
import {Text, View} from "react-native";
import Pdf from "react-native-pdf";

export default function PdfView(props) {


    return(
        <View style={{flex:1}}>
            <Header
                containerStyle={{height:55,justifyContent:"center",backgroundColor:"#fff",alignItems:"center",paddingBottom:20}}
                rightComponent={{ icon: 'close', type:"fontisto", color: '#000', onPress:props.closePdf }}
                centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>{this.state.name}</Text>}
                leftComponent={<Text style={{fontSize:10,fontWeight:"bold"}}>{this.state.nbPages+" pages" || "---" }</Text>}
            />
            <View style={styles.container}>
                <Pdf
                    source={this.state.source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                        this.setState({nbPages:numberOfPages})
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
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
        </View>
    )
}