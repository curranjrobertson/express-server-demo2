import { FieldValue } from '@google-cloud/firestore';
import { admin, adminInit } from '../config.js';
adminInit();
//import axios from 'axios';
// import { opendirSync } from 'fs';
// To Do: Clean up
import sdk from '@ory/client';
/**
 * Instantiate Ory SDK for working with sessions
 */
const ory = new sdk.V0alpha2Api(
  new sdk.Configuration({
    basePath: '/.ory',
    baseOptions: {
      baseURL: 'http://localhost:4000'
    }
  })
);

/**
 * Read User from the database
 *
 * @param {string} user_id The Ory user id used as the document id of the user document in the database.
 *
 */
export async function readUserData(userId: string) {
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
export async function writeUserData(userId: string): Promise<boolean> {
  // get the user document from the database
  const userDoc = await admin.firestore().collection('users').doc(userId).get();

  // read data from the database user document
  const userDocData = userDoc.data();

  const Full_Name = 'Full Name';

  // check if the user exists / the user document has any data
  if (userDocData === undefined) {
    // To Do: Remove this line later
    const device_Name = 'Device Name';

    // create a new user document in the database
    await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .set({ Name: Full_Name, Device_Name: device_Name });

    // return true if the user document was created successfully
    return true;
  } else {
    // return error if the user document already exists
    throw new Error('User already exists');
  }
}

/**
 * Delete a user from the database
 * @param {string} userId The Ory user id used as the document id of the user document in the database.
 * @returns {Promise<boolean>} Returns true if the user document was deleted successfully.
 */
export async function deleteUserData(userId: string) {
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
  } else {
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
export async function rememberDevice(userId: string, sessionId: string) {
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
      .update({ devices: FieldValue.arrayUnion(sessionId) });
    return true;
  } else {
    // create a new user document in the database
    await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .set({ devices: [sessionId] });
  }
}

/**
 * Revoke Session
 */
export async function revokeSession(user_id: string, session_id: string) {
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

  // const temporary_session_id = 'd12ee9f2-8cda-4e95-b77c-4d771176ccd8';

  // Revoke the session at ory cloud
  try {
    ory.revokeSession(session_id);
  } catch (err) {
    console.log(err.message);
  }

  // If there is a user document with the user id
  if (userDocData !== undefined) {
    // delete the field value
    await admin
      .firestore()
      .collection('users')
      .doc(user_id)
      .update({ devices: FieldValue.arrayRemove(session_id) });
    return true;
  } else {
    // return error if the user document does not exist
    throw new Error('User does not exist');
  }
}
