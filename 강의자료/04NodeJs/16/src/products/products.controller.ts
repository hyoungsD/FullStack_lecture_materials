import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { QueryProductDto } from "./dto/query-product.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser, AuthUser } from "../common/current-user.decorator";
import { imageUploadOptions } from "../common/upload.config";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // 등록 — 로그인 + 판매자/관리자만(간단한 if).
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateProductDto, @CurrentUser() user: AuthUser) {
    if (user.role !== "SELLER" && user.role !== "ADMIN") {
      throw new ForbiddenException("판매자만 상품을 등록할 수 있습니다.");
    }
    return this.productsService.create(dto, user.id);
  }

  @Get() // 공개
  findAll(@Query() query: QueryProductDto) {
    return this.productsService.findAll(query);
  }

  // 인기 상품 — ":id"보다 먼저 둬야 한다.
  @Get("popular")
  popular() {
    return this.productsService.popular();
  }

  @Get(":id") // 공개 — 캐시됨
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post(":id/view")
  incrementView(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.incrementView(id);
  }

  // 이미지 업로드 — 로그인 필요. 본인 상품인지(또는 관리자인지)는 서비스가 확인한다.
  @Post(":id/images")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { image: { type: "string", format: "binary" } },
    },
  })
  @UseInterceptors(FileInterceptor("image", imageUploadOptions))
  addImage(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthUser
  ) {
    if (!file) {
      throw new UnsupportedMediaTypeException("올릴 이미지가 없습니다.");
    }
    return this.productsService.addImage(id, user, file);
  }

  @Delete("images/:imageId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeImage(
    @Param("imageId", ParseIntPipe) imageId: number,
    @CurrentUser() user: AuthUser
  ) {
    return this.productsService.removeImage(imageId, user);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    @CurrentUser() user: AuthUser
  ) {
    return this.productsService.update(id, dto, user);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param("id", ParseIntPipe) id: number, @CurrentUser() user: AuthUser) {
    return this.productsService.remove(id, user);
  }
}
