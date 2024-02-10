import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import fs from "fs";

const firebaseConfig = {
    apiKey: "AIzaSyCS4xpFi4BvkO409Lg2jXr379mwuTt90fo",
    authDomain: "projects-8c267.firebaseapp.com",
    projectId: "projects-8c267",
    storageBucket: "projects-8c267.appspot.com",
    messagingSenderId: "18763893190",
    appId: "1:18763893190:web:ab60f7af0414fb47214ac7"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);


export const uploadFile = async (fileName: string, localFilePath: string) => {
    const windowsFilePath = fileName;
    const unixFilePath = windowsFilePath.replace(/\\/g, '/');
    const fileContent = fs.readFileSync(localFilePath);
    const fileRef = ref(storage, unixFilePath);
    await uploadBytes(fileRef, fileContent);
}