import express from 'express';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';
//import * as serviceAccount from '../fb-config.json' assert { type: 'JSON' };
const { default: info } = await import('../fb-config.json', {
    assert: {
        type: 'json'
    }
});
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
import { checkSession } from './utilities/router.js';
//import { createUserDoc } from './utilities/firestore-router.js';
//import { getDatabase, ref, child, get } from 'firebase/database';
//import { Firestore } from '@google-cloud/firestore';
//import { fileURLToPath } from 'url';
const db = admin.firestore();
// const dbRef = ref(getDatabase());
// const defaultapp = initializeApp();
/**
 * Instantiating environment
 */
dotenv.config();
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
/**
 * Register
 */
//app.post
/**
 * Listening for traffic
 */
app.listen(port, () => {
    console.log('rest api listening on port ${port}');
});
app.get('/', async (req, res) => {
    res.json({ status: 'get request working' });
});
app.get('/:userid', async (req, res) => {
    const userid = req.params.userid;
    const query = db.collection('users').where('id', '==', userid);
    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
        res.json(querySnapshot.docs[0].data());
    }
    else {
        res.json({ status: 'Not found!' });
    }
});
