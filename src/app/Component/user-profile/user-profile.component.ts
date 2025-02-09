import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  
  user: User = {
    firstName: '',
    lastName: '', 
    email: '',
    password: '',
    role: 'customer',
    isActive: 1
  }

  password: string = '';
  confirmPassword: string = '';

  roles = ['customer', 'seller', 'admin', 'manager', 'cashier', 'salesClerk', 'supplier'];

  constructor(private userService: UserService) {}

  loadUserProfile(): void {
    this.userService.getById("mariam").subscribe(data => {
      this.user = data;
    });
  }

  update(): void {
    this.userService.update(this.user).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile. Please try again!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }
  
  ngOnInit(): void {
    this.loadUserProfile();
  }
}
