import React, {Component} from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import FastImage from "react-native-fast-image";
import {CheckBox} from "react-native-elements";
const {height, width} = Dimensions.get("screen")

export default class ItemListView extends Component{

    constructor(props) {
        super(props);


        this.GetListItem = this.GetListItem.bind(this);
        this.state={
            item: this.props.item,
            index: this.props.index
        }
    }


    GetListItem(item) {
        item.selected = !this.state.item.selected;

        this.setState({ item: item });
        this.props.updateList(this.state.index,item);
    }

    render() {
        return(
            <View>
                <TouchableOpacity
                    onPress={this.GetListItem.bind(this, this.state.item)}
                >
                    <FastImage
                        style={{
                            width: width / 4 - 12,
                            height: 100,
                            opacity: this.state.item.selected && this.state.item.selected === true ? 0.5 : 1,
                            borderColor: this.state.item.selected && this.state.item.selected === true ? "blue" : "#f0f0f0",
                            borderWidth: 2,
                            margin: 2
                        }}
                        source={{
                            uri: this.state.item.image.uri
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View style={{position: "absolute", bottom: -1, right: -6}}>
                        <CheckBox
                            iconType="material"
                            checkedIcon='check-box'
                            checkedColor="blue"
                            uncheckedIcon='check-box-outline-blank'
                            checked={this.state.item.selected ? this.state.item.selected : false}
                            size={20}
                        />
                    </View>


                </TouchableOpacity>
            </View>
        )
    }


}