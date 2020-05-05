import { observable, action } from 'mobx';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';
import { login } from 'services/LoginService';

class AppStore{
    @observable appGreeting = 'Get started by opening'

    @action testFirestore = async() => {
        const querySnapshot = await firestore()
        .collection('houses')
        .get();
        
        console.log(querySnapshot.size);
    }

}

export default new AppStore();