import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

export async function loadFirebaseConfig() {
    const response = await fetch('/__/firebase/init.json');
    const config = await response.json();
    const firebaseAuthEmulator = process.env.VUE_APP_FIREBASE_AUTH_EMULATOR;

    const app = initializeApp(config);

    if (firebaseAuthEmulator !== undefined) {
        const auth = getAuth(app);
        connectAuthEmulator(auth, firebaseAuthEmulator);
        console.log(`Firebase Auth Emulator connected at firebaseAuthEmulator`);
    }

    return app;
}
