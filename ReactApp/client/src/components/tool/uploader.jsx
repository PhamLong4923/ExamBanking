// Import Firebase SDK
import { firebase } from '../../services/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import checkFileExists from '../../ultils/checkurlexist';


// Hàm tải lên ảnh lên Firebase Storage
const uploadImageToFirebase = async (src) => {
    // Tạo tham chiếu tới Firebase Storage
    const storage = getStorage(firebase);

    if (checkFileExists(src)) {
        console.log(src + "=====================");
        return src; // trả về nếu tồn tại
    }

    // Tạo tên ngẫu nhiên cho ảnh
    const imageName = Math.random().toString(36).substring(2);

    try {
        // Tải lên ảnh lên Firebase Storage
        const response = await fetch(src);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(imageRef, blob);

        // Lấy URL của ảnh từ Firebase
        const downloadURL = await getDownloadURL(imageRef);

        // Trả về URL của ảnh từ Firebase
        console.log(downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image to Firebase:', error);
        // Trả về null nếu có lỗi
        return null;
    }
};

export { uploadImageToFirebase };
