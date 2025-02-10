import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.nonNullable.group({
      firstName: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([ '-][A-Za-z]+)*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([ '-][A-Za-z]+)*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      isActive: [1]
    }, { validators: this.matchPassword });
  }

  matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.userForm) {
      Swal.fire({
        title: 'Success!',
        text: 'Your profile has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log(this.userForm.value);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  }
}