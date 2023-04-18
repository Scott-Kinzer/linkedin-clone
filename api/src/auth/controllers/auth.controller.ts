import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.interface';
import { Tokens } from '../models/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async registerUser(@Body() user: User): Promise<Tokens> {
    const createdUser = await this.authService.registerAccount(user);
    const tokens = await this.authService.saveTokens(createdUser);

    return tokens;
  }
}
