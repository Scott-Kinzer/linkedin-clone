import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StartPostComponent } from './start-post.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [StartPostComponent],
  exports: [StartPostComponent],
})
export class StartPostModule {}
