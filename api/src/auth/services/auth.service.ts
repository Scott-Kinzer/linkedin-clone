import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../models/token.entity';
import { Tokens } from '../models/auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepo: Repository<TokenEntity>,
    public jwtService: JwtService,
  ) {}
  hashPassword(passwd: string): Promise<string> {
    return bcrypt.hash(passwd, 10);
  }

  async registerAccount(user: User): Promise<User> {
    const { firstName, lastName, email, password } = user;

    const hashedPassword = await this.hashPassword(password);

    return await this.userRepo.save({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  generateTokens(user: User): { accessToken: string; refreshToken: string } {
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(user, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    return { accessToken, refreshToken };
  }

  async saveTokens(user: User): Promise<Tokens> {
    const { accessToken, refreshToken } = this.generateTokens(user);

    await this.tokenRepo.save({ accessToken, refreshToken, user });

    return { accessToken, refreshToken };
  }
}
