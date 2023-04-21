import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal.component';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../service/post.service';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}
