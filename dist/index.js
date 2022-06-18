/**
 * Instantiating environment
 */
import express from 'express';
import { checkSession } from './utilities/router.js';
import { readUserData, writeUserData, deleteUserData, rememberDevice, revokeSession } from './utilities/database.js';
import dotenv from 'dotenv';
dotenv.config();
console.log(':)');
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
 * Listening for traffic
 */
app.listen(port, () => {
    console.log(`rest api listening on port ${port}`);
});
/**
 * home page
 */
app.get('/', (req, res) => {
    res.status(200).json({
        page: 'home, authenticated'
    });
});
/**
 * Read User
 */
app.get('/my-profile', async (req, res) => {
    console.log('get my profile');
    const user_id = req.body.ory.id;
    console.log('user_id is', user_id);
    const userDocument = await readUserData(user_id);
    res.json(userDocument);
});
/**
 * Create a new user in the database
 */
app.get('/new-user', async (req, res) => {
    try {
        // get the user id from ory
        const user_id = req.body.ory.id;
        // get user document from the function writeUserData
        const userDocument = await writeUserData(user_id);
        // if there is already a user with the user id from ory
        if (userDocument !== true) {
            // throw error
            throw new Error(`Unexpected error when creating user document`);
        }
        return (res
            // return a success message if a user has been created
            .status(200)
            .json({ message: 'User document created successfully' }));
    }
    catch (err) {
        // return an error message if there is an error
        return res.status(405).json({ message: err.message });
    }
});
/**
 * Delete user
 */
app.get('/delete-user', async (req, res) => {
    try {
        // get the user id from ory
        const user_id = req.body.ory.id;
        // get user document from the function deleteUserData
        const userDocument = await deleteUserData(user_id);
        // if there is no user with the user id from ory
        if (userDocument !== true) {
            throw new Error(`Unexpected error when deleting user document`);
        }
        return (res
            .status(200)
            // return a success message if a user has been deleted
            .json({ message: 'User document deleted successfully' }));
    }
    catch (err) {
        // return an error message if there is an error
        return res.status(405).json({ message: err.message });
    }
});
/**
 * Remember Device
 */
app.get('/remember-device', async (req, res) => {
    try {
        // get the user id from ory
        const user_id = req.body.ory.id;
        // get user document from the function rememberDevice
        const userDocument = await rememberDevice(user_id);
        // if there is no user with the user id from ory
        if (userDocument !== true) {
            // return message that a new user was created because there was no user in the database with the ory id
            throw new Error(`User document not found. User has been created.`);
        }
        return (res
            .status(200)
            // return a success message if a device has been added to the user document
            .json({ message: 'Device remembered successfully' }));
    }
    catch (err) {
        // return an error message if there is an error
        return res.status(405).json({ message: err.message });
    }
});
/**
 * Revoke Session
 */
app.get('/revoke-session', async (req, res) => {
    try {
        // get the user id from ory
        const user_id = req.body.ory.id;
        const device_Name = 'device_Name';
        await revokeSession(user_id, device_Name);
    }
    catch (err) {
        // return an error message if there is an error
        return res.status(405).json({ message: err.message });
    }
});
