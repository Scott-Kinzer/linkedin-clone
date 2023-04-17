import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PostService } from '../service/post.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  constructor(private postService: PostService) {}

  allPosts = <Post[]>[];
  isStopLoading = false;
  take = 5;
  skip = 0;

  ngOnInit() {
    this.getPosts();
  }

  async getPosts() {
    const data = this.postService.getSelectedPosts(this.take, this.skip);
    data.subscribe((data) => {
      if (data.length < 5) {
        this.isStopLoading = true;
      }
      this.allPosts.push(...data);
    });
  }

  async onIonInfinite(ev: Event) {
    if (this.isStopLoading) {
      (ev as InfiniteScrollCustomEvent).target.complete();
      return;
    }
    this.skip += 5;

    await this.getPosts();
    (ev as InfiniteScrollCustomEvent).target.complete();
  }
}
