import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service'; // Adjust the path as needed
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;

      console.log('Sending reset link for email:', email);

      this.authService.forgetPassword(email).subscribe({
        next: (response) => {
          console.log('Reset link sent successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.message || 'Password reset successfully.',
            timer: 3000,
            showConfirmButton: false,
          });
        },
        error: (err) => {
                  Swal.fire({
                            icon: 'error',
                            title: 'error occur while signup',
                            text: err.message || 'An error occurred during signup'
                  });
                }
    });
    }
  }

  // onSubmit() {
  //   if (this.forgotPasswordForm.valid) {
  //     const email = this.forgotPasswordForm.value.email;
  //     this.authService.forgetPassword( email ).subscribe(
  //       (response) => {
  //         alert('Password reset link has been sent to your email.');
  //       },
  //       (error) => {
  //         console.error('Error sending reset link:', error);
  //         alert('An error occurred while sending the reset link. Please try again.');
  //       }
  //     );
  //   }
  // }
}