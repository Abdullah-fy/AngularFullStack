import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { order } from '../../_models/order';
import { OrderService } from '../../_services/order.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
}) 
export class UserProfileComponent implements OnInit {
  orderhistory: any[] = [];
  customerId: string = "";
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private authService: AuthService) { }

  getOrderHistory(): void {
    if(this.customerId) {
      this.orderService.getOrderByCustomerId(this.customerId).subscribe(
        {
          next: (data) => {
            this.orderhistory = data;
            console.log('Order History:', this.orderhistory);
          },
          error: (error) => {
            console.error('error fetchinh order history: ', error);
          }
        }
      );
    }
  }

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

    this.customerId = this.authService.getCurrentUserId();

    this.getOrderHistory();
  }


  password: string = '';
  confirmPassword: string = '';

  roles = ['customer', 'seller', 'admin', 'manager', 'cashier', 'salesClerk', 'supplier'];

  // loadUserProfile(): void {
  //   this.userService.getById("mariam").subscribe(data => {
  //     this.user = data;
  //   });


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