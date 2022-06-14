import { admin, adminInit } from '../config.js';
adminInit();
// Read the user's document form the database
// Write a user to the database if they do not exist
export async function myProfile(userId) {
    const userDoc = await admin.firestore().collection('users').doc().get();
    console.log(userDoc);
    if (userDoc !== undefined) {
        //set user id to firebase
        console.log('user ID', userId);
        admin.firestore().collection('users').add({ user_id: userId });
        return;
    }
    else {
        //Error
        console.log('error');
    }
    return; // userDoc.data();
}
/**
 * Delete a user
 */
export async function deleteUserData(userId) {
    const userDoc = await admin.firestore().collection('users').doc().get();
    console.log(userDoc);
    const user = await admin.firestore().collection('users').doc().get();
    if (user == userDoc) {
        admin
            .firestore()
            .collection('users')
            .delete({ user_id: userId, name: iphone });
    }
}
