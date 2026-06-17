import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StatsService } from "./stats.service";

@ApiTags("stats")
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get() // 적재된 스냅샷 목록
  findAll() {
    return this.statsService.findAll();
  }

  // 1분을 기다리지 않고 즉시 한 번 집계 (시연·테스트용)
  @Post("run")
  run() {
    return this.statsService.snapshot();
  }
}
