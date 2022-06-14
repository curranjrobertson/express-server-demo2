import { admin, adminInit } from '../config.js';
adminInit();
// Read the user's document form the database
export async function myProfile(userId) {
    const userDoc = await admin.firestore().collection('users').doc().get();
    console.log(userDoc);
    if (userDoc !== undefined) {
        //set user id to firebase
        console.log('user ID', userId);
        //const userDoc = await admin.firestore().collection('users');
        admin.firestore().collection('users').add({ user_id: userId });
        return;
    }
    else {
        //Error
        console.log('error');
    }
    return; // userDoc.data();
}
// export async function deleteUserData(userId: string) {
// }
