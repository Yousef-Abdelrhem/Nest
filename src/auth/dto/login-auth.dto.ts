import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @IsEmail({}, { message: `Enter valid Email` })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;
}
