import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTypes, SignUpPayload } from '../models/inputTypes';
import { patterns } from 'src/app/models/patterns';
import { AuthService } from '../services/auth.service';
import { Token } from 'src/app/models/token.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  signUpForm = new FormGroup({
    [InputTypes.FirstName]: new FormControl('', [
      Validators.required,
      Validators.pattern(patterns.namePattern),
    ]),
    [InputTypes.LastName]: new FormControl('', [
      Validators.required,
      Validators.pattern(patterns.namePattern),
    ]),
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
    return this.signUpForm.get(InputTypes.Email);
  }

  get password() {
    return this.signUpForm.get(InputTypes.Password);
  }

  get firstName() {
    return this.signUpForm.get(InputTypes.FirstName);
  }

  get lastName() {
    return this.signUpForm.get(InputTypes.LastName);
  }

  onSubmit() {
    this.authService
      .register(this.signUpForm.value as SignUpPayload)
      .subscribe((data) => {
        localStorage.setItem(Token.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(Token.REFRESH_TOKEN, data.refreshToken);

        this.router.navigate(['/home']);
      });
  }
}
