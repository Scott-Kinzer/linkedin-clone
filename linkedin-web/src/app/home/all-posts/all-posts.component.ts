import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../models/Post';
import { delay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() postBody?: Post;
  @Input() imagePath?: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((event) => {
      this.allPosts = [];
      this.take = 5;
      this.skip = 0;

      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  isFirstMount = true;

  ngOnChanges(changes: SimpleChanges) {
    if (this.isFirstMount) {
      this.isFirstMount = false;
      return;
    }

    const data = this.postService.getSelectedPosts(this.skip, 0);
    data.subscribe((data) => {
      this.allPosts = data;
    });
  }

  allPosts = <Post[]>[];
  isStopLoading = false;
  isShowLoader = true;
  take = 5;
  skip = 0;

  @HostListener('document:scroll', ['$event'])
  public onViewportScroll() {
    if (window.innerHeight + window.scrollY + 1 >= document.body.scrollHeight) {
      if (this.isStopLoading) return;
      this.isStopLoading = true;
      this.isShowLoader = true;

      this.skip += 5;
      this.getPosts();
    }
  }

  ngOnInit() {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.allPosts = [];

    this.take = 5;
    this.skip = 0;
  }

  async getPosts() {
    const data = this.postService
      .getSelectedPosts(this.take, this.skip)
      .pipe(delay(1000));
    data.subscribe((data) => {
      this.isStopLoading = false;
      this.isShowLoader = false;

      if (data.length < 5) {
        this.isStopLoading = true;
      }
      this.allPosts.push(...data);
    });
  }
}
