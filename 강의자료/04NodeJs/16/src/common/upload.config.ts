import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { randomUUID } from "crypto";

// 업로드 파일을 저장할 폴더. process.cwd() 기준이라 dist로 빌드해 돌려도 같은 위치다.
export const UPLOAD_DIR = "uploads";

// 상품 이미지라 이미지 형식만 받는다. 화이트리스트를 좁게 잡는 게 보안의 기본이다.
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// FileInterceptor에 그대로 넘길 multer 옵션.
export const imageUploadOptions = {
  storage: diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, callback) => {
      // 사용자가 보낸 파일명을 그대로 쓰면 충돌하고 "../" 경로 조작에도 노출된다.
      // 무작위 이름 + 원래 확장자로 새로 짓는다.
      const unique = randomUUID();
      const ext = extname(file.originalname).toLowerCase();
      callback(null, `${unique}${ext}`);
    },
  }),
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      callback(
        new BadRequestException(`이미지 파일만 올릴 수 있습니다: ${file.mimetype}`),
        false
      );
      return;
    }
    callback(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE },
};
