// Import Firebase SDK
import { firebase } from '../services/firebase';
import { getStorage } from 'firebase/storage';

// Function to check if a file exists in Firebase Storage
const checkFileExists = async (src) => {
    // Create a reference to Firebase Storage
    const storage = getStorage(firebase);

    // Create a reference to the file
    const storageFile = storage.ref(src);

    try {
        // Check if the file exists
        const [exists] = await storageFile.exists();
        if (exists) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking file existence:', error);
    }
};

// Example usage:

export default checkFileExists;
