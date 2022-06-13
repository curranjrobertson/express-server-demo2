/**
 * Instantiating environment
 */
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { checkSession } from './utilities/router.js';
import { myProfile } from './utilities/database.js';
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
app.use(checkSession);
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
// app.get('/database', async (req, res) => {
//   console.log(await getUsers());
//   res.json({ message: 'database' });
// });
app.get('/my-profile', async (req, res) => {
    console.log('get my profile');
    const userDocument = myProfile(req.body.session.identity.id);
    res.json(userDocument);
});
// app.get('/signup', async (req, res) => {
//   const lang = 'fr';
//   const docs = await admin.firestore().collection('users').set();
//   res = docs.docs[1].set(lang);
//   console.log('Setting user');
// });
