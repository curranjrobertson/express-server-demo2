import { admin, adminInit } from '../config.js';
adminInit();
// Read the user's document form the database
export async function myProfile(userId) {
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    return userDoc.data();
}
