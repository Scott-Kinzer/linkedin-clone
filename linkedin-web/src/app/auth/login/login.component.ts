import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { InputTypes, LoginPayload } from '../models/inputTypes';
import { patterns } from 'src/app/models/patterns';
import { AuthService } from '../services/auth.service';
import { Token } from 'src/app/models/token.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  loginForm = new FormGroup({
    [InputTypes.Email]: new FormControl('', [
      Validators.required,
      Validators.pattern(patterns.emailPattern),
    ]),
    [InputTypes.Password]: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get email() {
    return this.loginForm.get(InputTypes.Email);
  }

  get password() {
    return this.loginForm.get([InputTypes.Password]);
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value as LoginPayload)
      .subscribe((data) => {
        localStorage.setItem(Token.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(Token.REFRESH_TOKEN, data.refreshToken);

        this.router.navigate(['/home']);
      });
  }
}
