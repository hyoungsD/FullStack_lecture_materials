import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

// localhost:3000/products?page=1&limit=10 
export class QueryProductDto {

    @IsOptional()
    @Type(()=> Number) // string -> number 
    @IsInt()
    @Min(1)
    page : number = 1;

    @IsOptional()
    @Type(()=> Number) // string -> number 
    @IsInt()
    @Min(1)
    limit : number = 10;
}