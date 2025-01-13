import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

export async function loadFirebaseConfig() {
    try {
        const response = await fetch('/__/firebase/init.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch Firebase config: ${response.statusText}`);
        }

        const config = await response.json();
        const firebaseAuthEmulator = process.env.VUE_APP_FIREBASE_AUTH_EMULATOR;

        const app = initializeApp(config);

        if (firebaseAuthEmulator) {
            const auth = getAuth(app);
            connectAuthEmulator(auth, firebaseAuthEmulator);
            console.log(`Firebase Auth Emulator connected at ${firebaseAuthEmulator}`);
        }

        return app;
    } catch (error) {
        console.error("Error loading Firebase configuration:", error);
        throw error; // Прокидаємо помилку для обробки у main.js
    }
}
