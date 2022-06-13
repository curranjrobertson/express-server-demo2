/**
 * Instantiating environment
 */
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCeRehafZ4BdHmhp6M8qtxHWRNF6YUYRVg',
//   authDomain: 'express-server-demo.firebaseapp.com',
//   projectId: 'express-server-demo',
//   storageBucket: 'express-server-demo.appspot.com',
//   messagingSenderId: '253929761948',
//   appId: '1:253929761948:web:6b2211be7e34dd21eb5159'
// };
// const firebaseApp = initializeApp(firebaseConfig);
// Admin SDK
import admin from 'firebase-admin';
admin.initializeApp({
    // to do: move credential data to .env file
    credential: admin.credential.cert('/Users/curranrobertson/projects/express-server-demo/src/fb-config.json'),
    databaseURL: 'https://express-server-demo-default-rtdb.europe-west1.firebasedatabase.app'
});
// Initialize Firebase
async function getUsers() {
    const docs = await admin.firestore().collection('users').get();
    return docs.docs[0].data();
}
//import { checkSession } from './utilities/router.js';
//import { createUserDoc } from './utilities/router.js';
/**
 * Defining the port from the .env file
 */
const port = process.env.PORT || 3000;
/**
 * Instantiating express app.
 */
const app = express();
/**
 * Checking cookies on the home page
 */
//app.use(checkSession);
/**
 * Create a user document in the database
 */
//app.post('/signup', [createUserDoc]);
// function writeUserData(userID, name, email, imageUrl) {
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + userID);
//   set(reference, {
//     username: name,
//     email: email,
//     profile_picture: imageUrl
//   });
// }
// writeUserData('andreawu', 'awu', 'myemail@me.com', 'myimageurl');
/**
 * Register
 */
//app.post
/**
 * Listening for traffic
 */
app.listen(port, () => {
    console.log(`rest api listening on port ${port}`);
});
app.get('/', (req, res) => {
    res.status(200).json({
        page: 'home, authenticated'
    });
});
app.get('/database', async (req, res) => {
    console.log(await getUsers());
    res.json({ message: 'database' });
});
