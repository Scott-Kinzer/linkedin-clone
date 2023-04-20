import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { Observable, from } from 'rxjs';
import { User } from 'src/auth/models/user/user.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  async createPost(user: User, feedPost: FeedPost): Promise<FeedPost> {
    feedPost.author = user;

    const createdPost = await this.feedPostRepository.save(feedPost);

    delete createdPost.author.password;
    delete createdPost.author.role;

    return createdPost;
  }

  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  findPosts(take: number, skip: number): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return posts;
      }),
    );
  }

  async updatePost(
    id: string,
    feedPost: FeedPost,
    user: User,
  ): Promise<UpdateResult> {
    const findPost = await this.feedPostRepository.findOneBy({ id });

    if (findPost.author.id !== user.id) {
      return null;
    }

    return this.feedPostRepository.update(id, feedPost);
  }

  async deletePost(id: string, user: User): Promise<DeleteResult> {
    const findPost = await this.feedPostRepository.findOneBy({ id });

    if (findPost.author.id !== user.id) {
      return null;
    }

    return this.feedPostRepository.delete(id);
  }
}
