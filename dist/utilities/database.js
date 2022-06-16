import { admin, adminInit } from '../config.js';
adminInit();
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
export async function writeUserData(userId) {
    // get the user document from the database
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    // read data from the database user document
    const userDocData = userDoc.data();
    // check if the user exists / the user document has any data
    if (userDocData === undefined) {
        // To Do: Remove this line later
        const device_Name = 'Device Name';
        // create a new user document in the database
        await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .set({ Device_Name: device_Name });
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
 * @returns {Promise<boolean>} Returns true if the user document was updated successfully.
 * @returns {Promise<boolean>} Returns nothing if the user document was created successfully.
 */
export async function rememberDevice(userId) {
    // get the user document from the database
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    //print the user document
    console.log('userDoc:', userDoc);
    // read data from the database user document
    const userDocData = userDoc.data();
    const device_Name = 'Device Name';
    if (userDocData !== undefined) {
        await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .update({ Device_Name: device_Name });
        return true;
    }
    else {
        await admin
            .firestore()
            .collection('users')
            .doc(userId)
            .set({ Device_Name: device_Name });
    }
}
