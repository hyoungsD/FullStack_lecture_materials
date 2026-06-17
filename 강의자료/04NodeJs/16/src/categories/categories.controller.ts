import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser, AuthUser } from "../common/current-user.decorator";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 분류 등록 — 로그인 + 관리자만. 역할은 간단한 if로 확인한다.
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateCategoryDto, @CurrentUser() user: AuthUser) {
    if (user.role !== "ADMIN") {
      throw new ForbiddenException("관리자만 분류를 만들 수 있습니다.");
    }
    return this.categoriesService.create(dto);
  }

  @Get() // 공개 — 누구나 분류 목록을 본다.
  findAll() {
    return this.categoriesService.findAll();
  }
}
