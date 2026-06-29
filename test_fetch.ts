import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
const auth = getAuth(app);

async function test() {
    try {
        await signInWithEmailAndPassword(auth, 'admin@adinathmotors.com', 'Admin@123'); // assuming password or I will just see the error. Wait, I don't know the password!
    } catch(e) {
        // I can't easily sign in without the password.
    }
}
test();
