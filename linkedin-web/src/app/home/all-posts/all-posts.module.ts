import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts.component';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { PostService } from '../service/post.service';

@NgModule({
  declarations: [AllPostsComponent],
  providers: [UserService, PostService],
  imports: [CommonModule, IonicModule],
  exports: [AllPostsComponent],
})
export class AllPostsModule {}
