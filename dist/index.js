/**
 * Instantiating environment
 */
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { checkSession } from './utilities/router.js';
import { myProfile, writeUserData } from './utilities/database.js';
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
    const userDocument = await myProfile(user_id);
    res.json(userDocument);
});
/**
 * Register
 */
app.get('/signup', async (req, res) => {
    const user_id = req.body.ory.id;
    const newUser = await writeUserData(user_id);
    console.log('new user is:', newUser);
    res.json(newUser);
});
