import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/user/user.entity';
import { User } from 'src/auth/models/user/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async getUserInfo(userId: string): Promise<User> {
    const userInfo = await this.userRepo.findOneBy({ id: userId });

    if (!userInfo) {
      return null;
    }

    return userInfo;
  }
}
