import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern(/^\w{3,16}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^\w{3,16}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^\w{3,16}$/)]],
      confirmPass: ['', [Validators.required, Validators.pattern(/^\w{3,16}$/)]],
    }, { validator: this.passwordValidator });
  }

  passwordValidator(form: FormGroup) {
    const password = form.controls.password;
    const confirmPass = form.controls.confirmPass;
    return password.value.length !== 0 && confirmPass && password.value !== confirmPass.value ? { invalidMatch: true } : null;
  }

  submitRegister() {
    console.log(this.registerForm);
  }

}
