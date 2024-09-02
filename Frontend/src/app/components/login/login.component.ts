import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Token } from '@angular/compiler';
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
      console.log('token',Token)
    }
  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
        return alert('Please introduce your data');
    }

    this.s.signin(this.loginForm.value).subscribe(
        (response: any) => {
            console.log('Full response:', response); // Log the full response

            // Correctly access the token and role from the response
            const token = response.token;
            const role = response.role; // Assuming the role is returned as a single string
            
            if (token) {
                // Store the token and role in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('role', role); // Store the role in localStorage
                console.log('rrrrr', role)
                this.s.updateLoggedInState(true);

                // Redirect to dashboard
                this.router.navigateByUrl('/board/show');
            } else {
                console.error('Token is missing in the response.');
            }
        },
        (error: any) => {
            console.log(error);
            this.s.updateLoggedInState(false);
            if (error.status === 401) {
                this.errorMessage = 'Invalid email or password';
            } else if (error.status === 404) {
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
