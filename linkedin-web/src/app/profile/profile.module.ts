import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileService],
})
export class ProfileModule {}
