import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfileSummaryComponent } from './profile-summary.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ProfileSummaryComponent],
  exports: [ProfileSummaryComponent],
})
export class ProfileSummaryModule {}
