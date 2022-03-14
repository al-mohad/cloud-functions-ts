import * as functions from "firebase-functions";
import * as express from 'express';
import { addEntry, getEntries, updateEntry, deleteEntry } from "./entryControllers";

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!\nFirebase Cloud Functions is running!'));
app.post('/addEntry', addEntry);
app.get('/getEntries', getEntries);
app.patch('/updateEntry/:entryId', updateEntry);
app.delete('/deleteEntry/:entryId', deleteEntry);

exports.app = functions.https.onRequest(app);

