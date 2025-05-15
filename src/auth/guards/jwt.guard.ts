import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith(`Bearer `)) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    const payload = await this.authService.validateToken(token);

    request['user'] = payload;
    return true; 
  }
}
