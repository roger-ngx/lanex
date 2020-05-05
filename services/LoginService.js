import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-community/async-storage';

import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

export const fbTokenLogin = async (token) => {
    const credential = auth.FacebookAuthProvider.credential(token);
    await auth().signInWithCredential(credential);
};

export const googleTokenLogin = async token => {
    const credential = auth.GoogleAuthProvider.credential(token);
    await auth().signInWithCredential(credential);
};

export const loginWithFacebook = async() => {
    // Login with permissions
    try{
        const result = await LoginManager.logInWithPermissions(['public_profile']);
        console.log(result);
        if (result.isCancelled) {
            throw new Error('User cancelled the login process');
        }

        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw new Error('Something went wrong obtaining access token');
        }
        console.log(data);

        const credential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log(credential);
        await auth().signInWithCredential(credential);

        await AsyncStorage.setItem('@FacebookAccessToken', data.accessToken);

        return null;
    }catch(error){
        console.log('loginWithFacebook-' + error);
        return error;
    }
};

export const requestFacebookUserData = (token) => {
    const infoRequest = new GraphRequest(
        '/me',
        {
            accessToken: token,
            parameters: {
                //https://developers.facebook.com/docs/graph-api/reference/user
                fields: {
                    string: 'id, email, name, gender, birthday, picture.type(large)'
                }
            }
        },
        (error, result) => {
            console.log(error, result);

            if(!error && result){
                login(token);
                navigation.navigate('Home');
            }
        }
    );

    new GraphRequestManager().addRequest(infoRequest).start();
};

export const loginWithGoogle = async() => {
    try{
        const { idToken } = await GoogleSignin.signIn();
    
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
    }catch(error){
        return error;        
    }
    return null;
};