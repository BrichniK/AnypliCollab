import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'] // Ensure you have a corresponding CSS file
})
export class RegisterComponent implements OnInit {
    signupForm!: FormGroup;
    formSubmitted: boolean = false;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            role: new FormControl('', [Validators.required]),
        });
    }

    register() {
        this.formSubmitted = true;
        if (this.signupForm.invalid) {
            return;
        }

        this.authService.register(this.signupForm.value).subscribe(
            (response: any) => {
                alert('Registration successful');
                this.router.navigateByUrl('/login');
            },
            (error: any) => {
                console.error(error);
                if (error.status === 404) {
                    alert('Error: Service not found');
                } else {
                    alert('An unexpected error occurred');
                }
            }
        );
    }

    get name() {
        return this.signupForm.get('name');
    }

    get email() {
        return this.signupForm.get('email');
    }

    get password() {
        return this.signupForm.get('password');
    }

    get role() {
        return this.signupForm.get('role');
    }
}
