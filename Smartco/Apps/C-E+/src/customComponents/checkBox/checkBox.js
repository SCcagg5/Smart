import React from 'react';
import {
    View,
    Text as TextReact,
    TouchableOpacity,
}
from 'react-native';
import {Icon} from "native-base";

class checkBox extends React.Component{

    render(){

        const { checked, label,itemHeight, firstItem, onPress} = this.props;

        return(
            <View style={{
                height: itemHeight,
                marginBottom: 5,
                borderColor: "#F0F0F0",
                borderTopWidth: firstItem ? 1 : 0,
                borderBottomWidth: 1
            }}>
                <TouchableOpacity
                    onPress={onPress}>
                    <View style={{flexDirection: 'row',marginTop:12}}>
                        <Icon type="MaterialIcons"
                              name={checked ? 'check-box' : 'check-box-outline-blank'}
                              style={{
                                  color: checked ? '#6ACDBB' : '#C0C0C0',
                                  marginTop: itemHeight >= 60 ? 1 : -4,
                                  fontSize: 30,
                                  marginLeft: 3
                              }}/>
                        <TextReact style={{
                            color: "#000",
                            fontSize: 17,
                            fontFamily: "Roboto_medium",
                            marginLeft: 5,
                        }}>{label}</TextReact>
                    </View>

                </TouchableOpacity>
            </View>
        )



    }


}


export default checkBox;
