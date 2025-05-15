import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { loginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async login(loginDto: loginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException(`Email or password is wrong `);
    }
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.sign(payload);
    return {
      status: 200,
      token: token,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      return payload;
    } catch (err) {
      throw new UnauthorizedException(`InValid or expired exception`);
    }
  }
}
