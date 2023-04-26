import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts.component';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AllPostsComponent],
  providers: [UserService, PostService],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [AllPostsComponent],
})
export class AllPostsModule {}
