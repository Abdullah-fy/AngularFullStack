import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('User logged in successfully!', response);
          localStorage.setItem('token' , JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error => console.error('Error logging in', error)
      );
    }
  }
}
