/**
 * Instantiating environment
 */
import express from 'express';
import { checkSession } from './utilities/router.js';
import { myProfile, deleteUserData } from './utilities/database.js';
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
 * Get user information
 */
app.get('/my-profile', async (req, res) => {
    console.log('get my profile');
    const user_id = req.body.ory.id;
    console.log('user_id is', user_id);
    const userDocument = await myProfile(user_id);
    res.json(userDocument);
});
/**
 * delete user
 */
app.get('/delete', async (req, res) => {
    console.log('delete user');
    await deleteUserData(req.body.ory.id);
    res.json(req.body.ory.id);
});
