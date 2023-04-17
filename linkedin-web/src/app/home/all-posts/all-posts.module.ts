import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './all-posts.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AllPostsComponent],
  imports: [CommonModule, IonicModule],
  exports: [AllPostsComponent],
})
export class AllPostsModule {}
