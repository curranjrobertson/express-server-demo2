import { admin, adminInit } from '../config.js';
adminInit();

/**
 * Read User from the database
 */
export async function readUserData(userId: string) {
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  console.log(userDoc);
}
/**
 * Write User to the database
 */
export async function writeUserData(userId: string) {
  const userDoc = await admin.firestore().collection('users').doc().get();
  console.log(userDoc);
  if (userDoc !== undefined) {
    //set user id to firebase
    console.log('user ID', userId);
    admin.firestore().collection('users').add({ user_id: userId });
    return;
  } else {
    //Error
    console.log('error');
  }
}
/**
 * Delete a user from the database
 */
export async function deleteUserData(userId: string) {
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  console.log('userDoc:', userDoc);
  // const user = await admin.firestore().collection('users').doc().get();
  // console.log('user:', user);
  if (userDoc !== undefined) {
    await admin.firestore().collection('users').doc(userId).delete();
    console.log('if');
  } else {
    console.log('else');
  }
}
