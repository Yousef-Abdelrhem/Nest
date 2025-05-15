import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodo {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId({ message: `Invalid user id` })
  userId?: string;
}
