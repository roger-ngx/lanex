import storage from '@react-native-firebase/storage';

//https://rnfirebase.io/storage/usage

export const uploadFile = async (uid, filename, fileUri) => {
    const ref = storage().ref(`${uid}/${filename}`);

    const task = await ref.putFile(fileUri);

    task.on('state_changed', taskSnapshot => {
        console.log(taskSnapshot.bytesTransterred, taskSnapshot.totalBytes);
    });

    task.then(() => {
        console.log('done');
    });
};