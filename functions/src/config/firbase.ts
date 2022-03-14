import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
	credential: admin.credential.cert({
		// private key has different new line. Use Regex to replace it. Just like below.
		privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
		projectId: functions.config().project.id,
		clientEmail: functions.config().client.email,
	}),

	databaseURL: 'https://' + functions.config().project.id + '.firebaseio.com',
});

const db = admin.firestore();

export {admin, db};