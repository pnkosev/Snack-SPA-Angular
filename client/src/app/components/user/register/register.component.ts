import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from './../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registerSub$: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
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
    const payload = {
      email: this.registerForm.get('email').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      password: this.registerForm.get('password').value,
    };
    if (this.registerForm.valid) {
      this.registerSub$ = this.userService.register(payload).subscribe(_ => this.router.navigate(['/user/login']));
    }
  }

  ngOnDestroy() {
    if (this.registerSub$) {
      this.registerSub$.unsubscribe();
    }
  }

}
