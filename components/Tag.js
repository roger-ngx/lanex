import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const Tag = ({text, onClose}) => {

    return(
        <TouchableOpacity
            style={{
                backgroundColor: 'green',
                borderRadius: 10,
                padding: 5,
                borderWidth: 1,
                borderColor: 'grey'
            }}
            onPress={onClose}
        >
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text>{text}</Text>
                <Icon
                    name='close'
                />
            </View>
        </TouchableOpacity>
    )
}

export default Tag;