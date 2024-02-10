"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.storage = exports.firebaseApp = void 0;
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const fs_1 = __importDefault(require("fs"));
const firebaseConfig = {
    apiKey: "AIzaSyCS4xpFi4BvkO409Lg2jXr379mwuTt90fo",
    authDomain: "projects-8c267.firebaseapp.com",
    projectId: "projects-8c267",
    storageBucket: "projects-8c267.appspot.com",
    messagingSenderId: "18763893190",
    appId: "1:18763893190:web:ab60f7af0414fb47214ac7"
};
// Initialize Firebase
exports.firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(exports.firebaseApp);
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const windowsFilePath = fileName;
    const unixFilePath = windowsFilePath.replace(/\\/g, '/');
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const fileRef = (0, storage_1.ref)(exports.storage, unixFilePath);
    yield (0, storage_1.uploadBytes)(fileRef, fileContent);
});
exports.uploadFile = uploadFile;
