import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

const BottomModal = ({children, isVisible, style, ...props}) => (
    <Modal
        style={style}
        isVisible={isVisible}
        backdropColor='transparent'
        {...props}
    >
        <View style={{justifyContent: 'flex-end'}}>
            {children}
        </View>
    </Modal>
)

export default BottomModal;