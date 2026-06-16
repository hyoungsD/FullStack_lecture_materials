import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // app.get 
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/say") // app.get("/say", (req, res)=>{})
  getSayHi(): string {
    return this.appService.sayHi();
  }

  // 문제 3 GET 요청 추가  /profile  -> 응답을 "안녕하세요 개인정보 보여드립니다."
  @Get("/profile")
  getProfile() : string {
    return this.appService.getProfile()
  }
  // 문제 4 GET 요청 추가  /path  -> 응답을 "안녕하세요 경로 안내입니다."
  @Get("/path")
  getPath(): string {
    return this.appService.getPath();
  }
}
