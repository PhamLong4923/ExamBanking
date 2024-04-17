// Function to check if a file exists in Firebase Storage
const checkFileExists = (src) => {
    try {
        // Check if the source URL contains 'firebasestorage.googleapis.com'
        const isFirebaseStorageURL = src.includes('https://firebasestorage.googleapis.com/v0/b/exambanking-81cef.appspot.com/o');
        return isFirebaseStorageURL;
    } catch (error) {
        console.error('Error checking file existence:', error);
        return false;
    }
};

// Example usage:
export default checkFileExists;
