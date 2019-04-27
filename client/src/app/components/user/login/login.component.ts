import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSub$: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^\w{3,16}$/)]]
    });
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.loginSub$ = this.userService.login(this.loginForm.value).subscribe(_ => this.router.navigate(['/home']));
    }
  }

  ngOnDestroy() {
    if (this.loginSub$) {
      this.loginSub$.unsubscribe();
    }
  }

}
