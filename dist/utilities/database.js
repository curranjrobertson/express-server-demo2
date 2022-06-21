import { FieldValue } from '@google-cloud/firestore';
import { admin, adminInit } from '../config.js';
import axios from 'axios';
adminInit();
// To Do: Clean up
// import sdk from '@ory/client';
/**
 * Instantiate Ory SDK for working with sessions
 */
// const ory = new sdk.V0alpha2Api(
//   new sdk.Configuration({
//     basePath: '/.ory',
//     baseOptions: {
//       baseURL: 'http://localhost:4000'
//     }
//   })
// );
/**
 * Read User from the database
 *
 * @param {string} user_id The Ory user id used as the document id of the user document in the database.
 *
 */
export async function readUserData(userId) {
    // get the user document from the database
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    // print the user document
    console.log(userDoc);
}
/**
 * Checking if a user document with the id exists, then creates a user document in the database.
 *
 * @param {string} userId The Ory user id used as the document id of the user document in the database.
 * @returns {Promise<boolean>} Returns true if the user document was created successfully.
 */
export async function writeUserData(userId, session_id) {
    // get the user document from the database
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    // read data from the database user document
    const userDocData = userDoc.data();
    // check if the user exists / the user document has any data
    if (userDocData === undefined) {
        // To Do: Remove this line later
        // create a new user document in the database
        await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .set({ SessionID: session_id });
        // return true if the user document was created successfully
        return true;
    }
    else {
        // return error if the user document already exists
        throw new Error('User already exists');
    }
}
/**
 * Delete a user from the database
 * @param {string} userId The Ory user id used as the document id of the user document in the database.
 * @returns {Promise<boolean>} Returns true if the user document was deleted successfully.
 */
export async function deleteUserData(userId) {
    // get the user document from the database
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    // print the user document
    console.log('userDoc:', userDoc);
    // read data from the database user document
    const userDocData = userDoc.data();
    // If there is a user document with the user id
    if (userDocData !== undefined) {
        // delete the user document
        await admin.firestore().collection('users').doc(userId).delete();
        // return true if the user document was deleted successfully
        return true;
    }
    else {
        // return error if the user document does not exist
        throw new Error('User does not exist');
    }
}
/**
 * Remember Device
 * @param {string} userId The Ory user id used as the document id of the user document in the database.
 * @param {string} sessionId The session to remember.
 * @param {string} deviceName The device name to associated with the session.
 * @returns {Promise<boolean>} Returns true if the user document was updated successfully.
 * @returns {Promise<boolean>} Returns nothing if the user document was created successfully.
 */
export async function rememberDevice(userId, sessionId) {
    // get the user document from the database
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    //print the user document
    console.log('userDoc:', userDoc);
    // read data from the database user document
    const userDocData = userDoc.data();
    if (userDocData !== undefined) {
        // update the user document
        await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .update({ SessionID: FieldValue.arrayUnion(sessionId) });
        return true;
    }
    else {
        // create a new user document in the database
        await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .set({ SessionID: [sessionId] });
    }
}
/**
 * Revoke Session
 */
export async function revoke_session(user_id, session_id, cookie) {
    // get the user document from the database
    const userDoc = await admin
        .firestore()
        .collection('users')
        .doc(user_id)
        .get();
    // print the user document
    // console.log('userDoc:', userDoc);
    // read data from the database user document
    const userDocData = userDoc.data();
    // Revoke the session at ory cloud
    try {
        const response = await axios.delete('http://https://hardcore-ramanujan-qv58dlw7k3.projects.oryapis.com/sessions/' +
            session_id, {
            headers: {
                Authorization: cookie
            }
        });
        response;
    }
    catch (err) {
        console.log(err.response.data);
    }
    // If there is a user document with the user id
    if (userDocData !== undefined) {
        // delete the field value
        await admin
            .firestore()
            .collection('users')
            .doc(user_id)
            .update({ SessionID: FieldValue.arrayRemove(session_id) });
        return true;
    }
    else {
        // return error if the user document does not exist
        throw new Error('User does not exist');
    }
}
