import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginButton, AccessToken,  GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import { login } from 'services/LoginService';
import UserStore from '../stores/UserStore';

GoogleSignin.configure({
    webClientId: '75262550263-6ne1rfsalhpnrqsps6938ubguimjbl73.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    // accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '75262550263-dtv9kr2irdr72l43vm48kn555vkb0nir.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const LoginScreen = ({navigation}) => {
    const [ isSigninInProgress, setIsSignInProgress ] = useState(false);

    useEffect(() => {
        const token = AsyncStorage.getItem('@AccessToken');
        if(token){
            facebookGraphRequest(token);
        }
    }, []);

    facebookGraphRequest = (token) => {
        const infoRequest = new GraphRequest(
            '/me',
            {
                accessToken: token,
                parameters: {
                    //https://developers.facebook.com/docs/graph-api/reference/user
                    fields: {
                        string: 'id, email, name, gender, birthday, picture.type(large) '
                    }
                }
            },
            (error, result) => {
                console.log(error, result);

                if(!error && result){
                    login(result);
                    navigation.navigate('Home');
                }
            }
        );

        new GraphRequestManager().addRequest(infoRequest).start();
    };

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          login(userInfo);
        } catch (error) {
            console.log(error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('user cancelled the login flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('operation (e.g. sign in) is in progress already');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('play services not available or outdated');
          } else {
            console.log('some other error happened');
          }
        }
      };

    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LoginButton
            onLoginFinished={
                async (error, result) => {
                    if (error) {
                        console.log("login has error: " + result.error);
                    } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                    } else {
                        const tokenData = await AccessToken.getCurrentAccessToken();

                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: tokenData.accessToken.toString(),
                                parameters: {
                                    //https://developers.facebook.com/docs/graph-api/reference/user
                                    fields: {
                                        string: 'id, email, name, gender, birthday, picture.type(large) '
                                    }
                                }
                            },
                            (error, result) => {
                                console.log(error, result);

                                if(!error && result){
                                    // login(result);
                                    UserStore.setCurrentUser(result);
                                }
                            }
                        )

                        new GraphRequestManager().addRequest(infoRequest).start();

                        AsyncStorage.setItem('@AccessToken', tokenData.accessToken.toString());
                    }
                }
            }
            onLogoutFinished={() => console.log("logout.")}
        />
        <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={isSigninInProgress}
        />
    </View>
}

export default LoginScreen;