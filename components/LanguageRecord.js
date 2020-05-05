import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';
import { throttle } from 'lodash';

import { FileSystem } from 'react-native-unimodules';
import { uploadFile } from 'services/StorageService';

let recordingInstance = null;

const LanguageRecord = ({language}) => {
    
    const [ audioRecordPermission, setAudioRecordPermission ] = useState(false);
    const [ isRecording, setRecording ] = useState(false);

    startRecording = async() => {
        if(audioRecordPermission !== 'granted'){
            await askForAudioPermission();
        }

        console.log('---recording---');
        setRecording(true);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
        });

        try{
            if(recordingInstance != null){
                recordingInstance.setOnRecordingStatusUpdate(null);
                recordingInstance = null;
            }

            recordingInstance = new Audio.Recording();
            // await recordingInstance.prepareToRecordAsync(JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)));
            await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
            recordingInstance.setOnRecordingStatusUpdate(updateRecordingStatus);

            await recordingInstance.startAsync();
        }catch(error){
            console.log(error);
        }
    }

    stopRecording = async() => {
        console.log('---stop recording---');

        setRecording(false);
        if(recordingInstance !== null){
            await recordingInstance.stopAndUnloadAsync();
            const info = await FileSystem.getInfoAsync(recordingInstance.getURI());

            console.log(info);
            uploadFile('ajshfdsah', 'haha', info.uri);
        }
    }

    updateRecordingStatus = (status) => {
        console.log(status);
        // Object {
        //     "canRecord": false,
        //     "durationMillis": 1364,
        //     "isDoneRecording": true,
        //     "isRecording": false,
        //   }
    }

    askForAudioPermission = async() => {
        if(isRecording){
            stopRecording().then(() => setRecording(false));
        }else{
            const result = await Audio.requestPermissionsAsync();
            setAudioRecordPermission(result.status === 'granted');
            console.log(result);
        }
    };

    return (<TouchableOpacity
        style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 5,
            borderColor: '#999'
        }}
        onPress={throttle(isRecording ? stopRecording : startRecording, 1000, { trailing: false })}
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
    </TouchableOpacity>)
}

export default LanguageRecord;