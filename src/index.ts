/**
 * Instantiating environment
 */
import express, { Express } from 'express';
import { checkSession } from './utilities/router.js';
import { myProfile } from './utilities/database.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Defining the port from the .env file
 */
const port = process.env.PORT || 3000;

/**
 * Instantiating express app.
 */
const app: Express = express();

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
