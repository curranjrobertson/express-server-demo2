// import { getDatabase, ref, child, get } from 'firebase/database';
// //import { initializeApp } from 'firebase-admin/app';
// import { Firestore } from '@google-cloud/firestore';
// import { app } from 'firebase-admin';
// const db = new Firestore();
// const dbRef = ref(getDatabase());
// const defaultapp = initializeApp();
// /**
//  * Create a user document in the database, based on the ory user id
//  */
// export const createUserDoc = () => {
//   // read the ory user id from the session data
//   get(child(dbRef, `users${user_id}`))
//     // check if the database already contains a document with the ory user id
//     .then((snapshot: any) => {
//       if (snapshot.exists()) {
//         //> exists: throw an error
//         console.log(snapshot.val());
//         //> does not exists: create a user document in the database (/user), give the document the same id as the ory id and add a property to the document
//         //
//       } else {
//         console.log('No data available');
//       }
//     })
//     .catch((error: any) => {
//       console.error(error);
//     });
// };
