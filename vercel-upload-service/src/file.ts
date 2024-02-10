import fs from "fs";
import path from "path";
export const getAllFiles = (folderPath: string): string[] => {
    let filesArray: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach((file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            filesArray = filesArray.concat(getAllFiles(fullFilePath));
        } else {
            filesArray.push(fullFilePath);
        }
    }))
    return filesArray;
}

export const deleteLocalFile = (filePath: string) => {
    new Promise((resolve, reject) => {
        return fs.unlink(filePath, () => { return resolve("") });
    })
}