import {IsOptional, IsString, MinLength}  from 'class-validator';

export class CreatePostDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    content: string;

    @IsOptional()
    @IsString()
    author?: string;
}
