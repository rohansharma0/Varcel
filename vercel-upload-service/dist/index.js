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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const simple_git_1 = __importDefault(require("simple-git"));
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const redis_1 = require("redis");
const firebase_1 = require("./firebase");
//Redis Queue 
const publisher = (0, redis_1.createClient)();
publisher.connect();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/v1/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.repoUrl) {
        return res.json({
            error: "Bad Request",
            message: "Repository url is required",
            statusCode: 404,
        });
    }
    const repoUrl = req.body.repoUrl;
    //Generating unique id for each deployment process
    const id = (0, utils_1.generateID)();
    //clonning git repository
    yield (0, simple_git_1.default)().clone(repoUrl, path_1.default.join(__dirname, `output/${id}`));
    //getting all files path in a array 
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    //Uploading each file on S3/R2 - check uploadFile() in aws.ts
    //Uploading via firebase - check uploadFile() in firebase.ts
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, firebase_1.uploadFile)(file.slice(__dirname.length + 1), file);
    }));
    //after uploading all files pushing id to queue
    publisher.lPush("build-queue", id);
    res.json({
        id: id,
        files: files,
    });
}));
//PORT
app.listen(3000);
