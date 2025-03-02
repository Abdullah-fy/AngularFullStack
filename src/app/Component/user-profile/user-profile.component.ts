<<<<<<< HEAD
import { UserService } from './../../_services/user.service';
import { ProductService } from './../../_services/product.service';
=======
>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { order } from '../../_models/order';
import { OrderService } from '../../_services/order.service';
<<<<<<< HEAD
import { Product } from '../../_models/product';
import { Router } from '@angular/router';
=======
import { AuthService } from '../../_services/auth.service';
>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9

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
<<<<<<< HEAD
  user: any = {};
  product: Product[] = [];
  body: any = {};
  isEditing: boolean = false;
=======
>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private authService: AuthService) { }

<<<<<<< HEAD
  constructor(
    private formBuilder: FormBuilder, 
    private orderService: OrderService, 
    private ProductService: ProductService,
    private userService: UserService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initUserForm();
=======
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
>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9

    this.customerId = this.authService.getCurrentUserId();

    this.getOrderHistory();
  }

<<<<<<< HEAD
  loadUserProfile(): void {
    if (this.userId) {
      // console.log(this.userId); 
      this.userService.getUserById(this.userId).subscribe({
        next: (data) => {
          console.log('user data:', data); 
          this.user = data;
          // Populate the form with user data
          this.userForm.patchValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
          });
        },
        error: (error) => {
          console.error('Error details:', error); 
          Swal.fire({
            title: 'Error!',
            text: 'Could not load user profile: ' + (error.error?.message || error.message),
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }

  initUserForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([ '-][A-Za-z]+)*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Za-z]+([ '-][A-Za-z]+)*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirmPassword: [''],
      role: [''],
      isActive: [true]
    }, { validators: this.matchPassword });
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

  matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    // only validate if both fields have values
    if (password || confirmPassword) {
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
    return null;
=======

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



>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9
  }

  startShopping(): void { 
    this.router.navigate(['/products']);
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // reset form to current user values if canceling edit
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        role: this.user.role,
        isActive: this.user.isActive
      });
      // clear password fields
      this.userForm.get('password')?.setValue('');
      this.userForm.get('confirmPassword')?.setValue('');
    }
  }

  onSubmit() {
<<<<<<< HEAD
    if (this.userForm.valid) {
      const updatedUser = {
        _id: this.userId,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        // only include password if it's been changed
        ...(this.userForm.value.password ? { password: this.userForm.value.password } : {}),
        
      };

      
      this.userService.update(updatedUser).subscribe({
        next: (response) => {
          console.log('profile updated:', response);
          this.user = response;
          this.isEditing = false;
          
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
            text: 'There was a problem updating your profile: ' + (error.error?.message || error.message),
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
=======
    if (this.userForm) {
      Swal.fire({
        title: 'Success!',
        text: 'Your profile has been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
>>>>>>> 00cdd3818002041f7d11c3eb063e5244aea47ba9
      });
      console.log(this.userForm.value);
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  }


}