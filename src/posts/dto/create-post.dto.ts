import {
  IsString,
  IsInt,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  body: string;

  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
