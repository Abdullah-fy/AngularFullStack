import { UserService } from './../../_services/user.service';
import { ProductService } from './../../_services/product.service';
import { AuthService } from './../../_services/auth.service'; // Changed from UserService
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../_services/order.service';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
}) 
export class UserProfileComponent implements OnInit {
  orderhistory: any[] = [];
  customerId?: string;
  userForm!: FormGroup;
  user: any = {};
  product: Product[] = [];

  storedData = localStorage.getItem('token');
  userId = this.storedData ? JSON.parse(this.storedData).userId : null;

  constructor(
    private formBuilder: FormBuilder, 
    private orderService: OrderService, 
    private authService: AuthService,
    private ProductService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.nonNullable.group({
      firstName: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([ '-][A-Za-z]+)*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([ '-][A-Za-z]+)*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirmPassword: [''],
      role: ['', Validators.required],
      isActive: [1]
    }, { validators: this.matchPassword });

    // Fetch user data
    this.loadUserProfile();
    
    // Fetch order history
    this.getOrderHistory();
  }

  getOrderHistory(): void {
    this.orderService.getOrderByCustomerId(this.userId).subscribe(
      {
        next: (data) => {
          this.orderhistory = data;

          this.orderhistory.forEach((order, orderIndex) => {
            if(order.items && order.items.length > 0) {
              order.items.forEach((item: any, itemIndex: number) => {
                this.ProductService.getProductById(item.productId).subscribe(
                  {
                    next: (product) => {
                      this.orderhistory[orderIndex].items[itemIndex].productName = product.name;
                      this.orderhistory[orderIndex].items[itemIndex].productImage = product.images?.[0];
                    },
                    error: (error) => {
                      console.error('error fetching product:', error);
                    }
                  }
                );
              })
            }
          })
        },
        error: (error) => {
          console.error('error fetching order history: ', error);
        }
      }
    );
  }

  password: string = '';
  confirmPassword: string = '';

  roles = ['customer', 'seller', 'admin', 'manager', 'cashier', 'salesClerk', 'supplier'];

  loadUserProfile(): void {
    // Use the authService instead of userService to get user data
    // this.authService.getCurrentUserId().subscribe({
    //   next: (data) => {
    //     this.user = data;
    //     // Populate the form with user data
    //     this.userForm.patchValue({
    //       firstName: this.user.firstName || '',
    //       lastName: this.user.lastName || '',
    //       email: this.user.email || '',
    //       role: this.user.role || 'customer',
    //       // Password fields left empty
    //     });
    //   },
    //   error: (error) => {
    //     console.error('Error fetching user data:', error);
    //     Swal.fire({
    //       title: 'Error!',
    //       text: 'Could not load user profile.',
    //       icon: 'error',
    //       confirmButtonText: 'OK'
    //     });
    //   }
    // });
  }

  matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    // Only validate if both fields have values
    if (password || confirmPassword) {
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Create a user object from the form data
      const updatedUser = {
        ...this.user,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        // Only include password if it's been changed
        ...(this.userForm.value.password ? { password: this.userForm.value.password } : {}),
        role: this.userForm.value.role,
        isActive: this.userForm.value.isActive
      };

      // Call the authService to update the user profile
      this.userService.update(this.userId).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'Your profile has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was a problem updating your profile.',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      });
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