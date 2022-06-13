import admin from 'firebase-admin';

const adminInit = () =>
  admin.initializeApp({
    // to do: move credential data to .env file
    credential: admin.credential.cert(
      '/Users/curranrobertson/projects/express-server-demo/src/fb-config.json'
    ),
    databaseURL:
      'https://express-server-demo-default-rtdb.europe-west1.firebasedatabase.app'
  });

export { admin, adminInit };
