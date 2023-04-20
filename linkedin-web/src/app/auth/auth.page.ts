import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginModule } from './login/login.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginModule,
    SignUpModule,
    HttpClientModule,
  ],
})
export class AuthPage implements OnInit {
  authStage: 'login' | 'signUp' = 'login';
  constructor() {}

  showLogin() {
    this.authStage = 'login';
  }

  showSignUp() {
    this.authStage = 'signUp';
  }

  ngOnInit() {}
}
