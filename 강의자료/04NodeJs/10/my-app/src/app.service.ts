import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  sayHi(): string {
    return "안녕하세요 이지훈입니다."
  } // http://localhost:3000/say

  getProfile(): string {
    return "안녕하세요 개인정보 보여드립니다"
  }

  getPath() : string {
    return "안녕하세요 경로 안내입니다."
  }
}
