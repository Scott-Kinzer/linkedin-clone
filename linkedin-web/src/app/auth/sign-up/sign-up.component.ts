import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputTypes } from '../models/inputTypes';
import { patterns } from 'src/app/models/patterns';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor() {}
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

  onSubmit() {}
}
