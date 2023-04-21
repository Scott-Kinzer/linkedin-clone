import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from '../services/user.service';
import {
  UseGuards,
  Get,
  Request,
  Controller,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/models/user/user.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async create(@Request() req: { user: User }): Promise<User> {
    const userInfo = await this.userService.getUserInfo(req.user.id);

    if (!userInfo) {
      throw new NotFoundException('User not found');
    }

    return userInfo;
  }
}
