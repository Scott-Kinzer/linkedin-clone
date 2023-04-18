import { Component, HostListener, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../models/Post';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  constructor(private postService: PostService) {}

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
