import React from "react";
import { Input } from 'react-native-elements';

export default function CustomInput(props){
    return(
        <Input
            value={props.value || ""}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            leftIcon={{ type: 'feather', name: props.lefticon, size:16,color:props.lefticonColor,iconStyle:{marginLeft:-8} }}
            rightIcon={{ type: 'feather', name: props.righticon, size:16,color:props.righticonColor,iconStyle:{marginLeft:-8}  }}
            containerStyle={{borderWidth:1,borderRadius:20,borderColor:"#f0f0f0",height:props.height}}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={{
                fontSize:14,fontFamily:"Baloo2-Medium"
            }}
            onChangeText={text => props.onChangeText(text)}
            disabled={props.disabled || false}
            
        />
    )
}