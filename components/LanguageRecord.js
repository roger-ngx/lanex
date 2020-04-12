import React from 'react';
import { TouchableOpacity, View, Image, Text, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

const LanguageRecord = ({language, isRecording, onPress}) => (
    <TouchableOpacity
        style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 5,
            borderColor: '#999'
        }}
        onPress={() => onPress(!isRecording)}
    >
        <ImageBackground
            source={language.icon}
            style={{flex: 1}}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)'
                }}
            >
                <Icon color='#fff' size={48} name={isRecording ? 'pause' : 'play-arrow'} />
            </View>
        </ImageBackground>
    </TouchableOpacity>
)

export default LanguageRecord;