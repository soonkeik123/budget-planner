import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder,
    private router: Router, // import Angular Router
    private snackBar: MatSnackBar // add this and import on top to get snackbar
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if(this.loginForm.valid) {
      console.log("Login Successful");
      console.log("Login info => ", this.loginForm.value);
      this.router.navigate(['/budget-planner/dashboard']);
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
    }
  }

  register() {
    if(this.registerForm.valid) {
      console.log("Register Successful");
      console.log("Register info => ", this.registerForm.value);
      // Once I save this form, then clear the form, so we set to reload the registerpage
      setTimeout(() => {
        window.location.reload();
      },2000);
      this.router.navigate(['/budget-planner/login']);
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
    }
  }

}
