"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = void 0;
const MAX_ID_LENGTH = 5;
const generateID = () => {
    const letters = "1234567898qwertyuiopasdfghjklzxcvbnm";
    let id = "";
    for (let i = 0; i < MAX_ID_LENGTH; i++) {
        id += letters[Math.floor(Math.random() * letters.length)];
    }
    return id;
};
exports.generateID = generateID;
