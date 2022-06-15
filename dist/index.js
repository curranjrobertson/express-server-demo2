/**
 * Instantiating environment
 */
import express from 'express';
import { checkSession } from './utilities/router.js';
import { readUserData, writeUserData, deleteUserData } from './utilities/database.js';
import dotenv from 'dotenv';
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
 * Write User
 */
app.get('/new-user', async (req, res) => {
    console.log('new-user');
    const user_id = req.body.ory.id;
    console.log('user_id is', user_id);
    const userDocument = await writeUserData(user_id);
    res.json(userDocument);
});
/**
 * Delete user
 */
app.get('/delete-user', async (req, res) => {
    console.log('delete user');
    await deleteUserData(req.body.ory.id);
    res.json(req.body.ory.id);
});
