import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const Tag = ({text, onClose}) => {

    return(
        <TouchableOpacity
            style={{
                backgroundColor: 'green',
                borderRadius: 20,
                padding: 5,
                margin: 5,
                borderWidth: 1,
                borderColor: 'grey',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10
            }}
            onPress={onClose}
        >
            <Text style={{color: 'white', marginRight: 5}}>{text}</Text>
            <Icon
                name='close'
                color='white'
            />
        </TouchableOpacity>
    )
}

export default Tag;