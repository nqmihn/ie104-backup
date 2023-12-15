import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public, User } from './decorator/customize';
import { IUser } from './users/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) { }



  
}
