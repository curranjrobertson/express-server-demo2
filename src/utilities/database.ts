import { admin, adminInit } from '../config.js';
adminInit();

// Read the user's document form the database
export async function myProfile(userId: string) {
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  console.log(userId);
  return userDoc.data();
}

export async function writeUserData(userId: string) {
  if (myProfile(userId) == null) {
    //set user id to firebase
    console.log(userId);
    const userDoc = await admin.firestore().collection('users');
    userDoc.add({ user_id: userId });
    return;
  } else {
    console.log('error');
  }
}
