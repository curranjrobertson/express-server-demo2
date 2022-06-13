import sdk from '@ory/client';
//import { getDatabase, ref, child, get } from 'firebase/database';
//const dbRef = ref(getDatabase());
/**
 * Instantiate Ory SDK for working with sessions
 */
const ory = new sdk.V0alpha2Api(new sdk.Configuration({
    basePath: '/.ory',
    baseOptions: {
        baseURL: 'http://localhost:4000'
    }
}));
/**
 * Checking the clients cookie for a valid session
 */
export const checkSession = (req, res, next) => {
    ory
        .toSession(undefined, req.header('cookie'))
        .then(({ data: session }) => {
        console.log('session available');
        console.log({
            user_id: session.identity.id,
            user_email: session.identity.traits.email
        });
        next();
    })
        .catch((err) => {
        console.log('session not available');
        res.status(500).json({
            status: err.response.status,
            message: err.message
        });
    });
};
