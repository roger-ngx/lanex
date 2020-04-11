import firestore from '@react-native-firebase/firestore';

export const login = (user) => {
    firestore().collection('users').add(user);
};