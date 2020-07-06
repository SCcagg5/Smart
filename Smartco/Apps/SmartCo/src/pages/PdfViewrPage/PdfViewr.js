import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from "react-native";
import Pdf from 'react-native-pdf';
import {Icon, Header, Button} from "react-native-elements";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class PdfViewr extends React.Component{

    state={
        name:this.props.navigation.state.params.name,
        source:this.props.navigation.state.params.source,
        nbPages:""
    }


    render() {
        return(
            <View style={{flex:1}}>
                <Header
                    containerStyle={{height:55,justifyContent:"center",backgroundColor:"#fff",alignItems:"center",paddingBottom:20}}
                    leftComponent={{ icon: 'arrow-back', type:"material", color: '#000', onPress:() => {this.props.navigation.goBack()} }}
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>{this.state.name}</Text>}
                    rightComponent={<Text style={{fontSize:10,fontWeight:"bold"}}>{this.state.nbPages+" pages" || "---" }</Text>}
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
                            //disabled={this.state.email === "" || this.state.password === ""}
                                buttonStyle={{width: (width - 50), height: 35, backgroundColor: "rgb(235, 0, 141)"}}
                                titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                onPress={() => {}}
                        />
                    </View>
                </View>
            </View>

        )
    }

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