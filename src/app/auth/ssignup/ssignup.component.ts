import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStaffServiceTsService } from '../../_services/auth.staff.service.ts.service';

@Component({
  selector: 'app-ssignup',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './ssignup.component.html',
  styleUrl: './ssignup.component.css'
})
export class SsignupComponent {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthStaffServiceTsService, private router: Router) {}

  
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s'-]+$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s'-]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      role: ['clerk', Validators.required]

      // passwordConfirm: ['', [Validators.required]],
      // role: ['customer', Validators.required]
    });
  //   , 
  //   { validators: this.passwordMatchValidator });
  // }
  }

  // passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const password = control.get('password');
  //   const passwordConfirm = control.get('passwordConfirm');
  //   return password && passwordConfirm && password.value !== passwordConfirm.value 
  //     ? { passwordMismatch: true } 
  //     : null;
  // };
  onSubmit(): void {
    if (this.signupForm.invalid) {
      
      this.signupForm.markAllAsTouched();
      return;
    }
    this.authService.ssignup(this.signupForm. value).subscribe(
      (response) => {
        console.log('User logged in successfully!', response);
        localStorage.setItem('stoken' , response.stoken );
        // localStorage.setItem( 'userId', response.data.newUser._id );
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error registering user', error);
        alert('Registration failed. Please try again.');
      }
    );
  }

  }