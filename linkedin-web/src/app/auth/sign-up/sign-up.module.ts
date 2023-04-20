import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [SignUpComponent],
  providers: [AuthService],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [SignUpComponent],
})
export class SignUpModule {}
