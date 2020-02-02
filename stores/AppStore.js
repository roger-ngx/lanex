import { observable, action } from 'mobx';
import firestore from '@react-native-firebase/firestore';

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