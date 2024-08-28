import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [``],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  showPassword: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string = '';  // To store the error message
  roles: string[] = [];

  constructor(
    private router: Router,
    private s: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      console.log('this.isLoggedIn', this.isLoggedIn, 'this.roles', this.roles);
    }
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return alert('Please introduce your data');
    }
    this.s.signin(this.loginForm.value).subscribe(
      (response: any) => {
        // Reset any previous error message
        this.errorMessage = '';

        // set the token in the localStorage
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('role', response.roles);
        localStorage.setItem('id', response.id);
        localStorage.setItem('tracabiliteMap', response.tracabiliteMap);
        localStorage.setItem('analyse', response.analyse);
        localStorage.setItem('visualisation', response.visualisation);
        localStorage.setItem('tracabilite', response.tracabilite);

        this.s.updateLoggedInState(true);

        // Redirect to dashboard
        this.router.navigateByUrl('/board/show');
      },
      (error: any) => {
        console.log(error);
        this.s.updateLoggedInState(false);

        if (error.status === 401) {
          // Show error message for invalid credentials
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 404) {
          // Handle other possible errors
          this.errorMessage = 'Cannot get data!';
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    );
  }

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('input[name="password"]');
    if (passwordInput) {
      passwordInput.setAttribute(
        'type',
        this.showPassword ? 'text' : 'password'
      );
    }
  }
}
