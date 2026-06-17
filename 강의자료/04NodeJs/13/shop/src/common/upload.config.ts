// npm i @nestjs/serve-static@5
// npm i -D @types/multer
import {diskStorage } from 'multer';
import { extname } from 'path'
import { randomUUID } from "crypto"
import { BadRequestException } from '@nestjs/common';

export const UPLOAD_DIR = "uploads";

const ALLOWED_MIME = ["image/jpeg","image/png","image/gif", "image/webp"];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb 

//FileInterceptor 에 그대로 넘길 옵션 (멀터)
export const imageUploadOptions = {
    storage: diskStorage({
        destination: UPLOAD_DIR, 
        filename : (_req, file, callback) => {
            // 파일명을 무작위로 
            const unique = randomUUID();
            const ext = extname(file.originalname).toLocaleLowerCase(); // file 의 originalname 모두 소문자로
            callback(null, `${unique}${ext}`)
        }
    }),
    fileFilter: (_req, file, callback) => {
        if(!ALLOWED_MIME.includes(file.mimetype)) {
            callback(
                new BadRequestException(`이미지 파일만 올수있어요`), false
            );
            return;
        }
        callback(null ,true)
    },
    limit: {fileSize: MAX_FILE_SIZE},
}