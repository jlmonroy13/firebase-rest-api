import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import serviceAccount from '../permissions.json';
import router from './api/index';
import firebaseCredentials from '../firebaseCredentials';

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
});

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use('/', router);

export const db = admin.firestore();
export const api = functions.https.onRequest(app);
