import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { InputTypes } from '../models/inputTypes';
import { patterns } from 'src/app/models/patterns';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}
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

  onSubmit() {}
}
