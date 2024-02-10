import express from 'express';
import cors from "cors";
import { generateID } from './utils';
import simpleGit from 'simple-git';
import path from "path";
import { deleteLocalFile, getAllFiles } from './file';
import { createClient } from 'redis';
import { uploadFile } from './firebase';

//Redis Queue 
const publisher = createClient();
publisher.connect();

const app = express();
app.use(cors())
app.use(express.json());

app.post("/api/v1/deploy", async (req, res) => {
    if (!req.body.repoUrl) {
        return res.json({
            error: "Bad Request",
            message: "Repository url is required",
            statusCode: 404,
        })
    }
    const repoUrl = req.body.repoUrl;
    //Generating unique id for each deployment process
    const id = generateID();
    //clonning git repository
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
    //getting all files path in a array 
    const files = getAllFiles(path.join(__dirname, `output/${id}`));

    //Uploading each file on S3/R2 - check uploadFile() in aws.ts
    //Uploading via firebase - check uploadFile() in firebase.ts
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    })

    //Deleting local downloaded files
    files.forEach(async file => {
        await deleteLocalFile(file);
    })
    //after uploading all files pushing id to queue
    publisher.lPush("build-queue", id);

    res.json({
        id: id
    })
});

//PORT
app.listen(3000);