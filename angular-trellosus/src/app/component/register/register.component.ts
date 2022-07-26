import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/models/users/users.model';
import { AuthService } from 'src/app/commons/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: UsersModel = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    password1: '',
  };
  message = '';
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }
  onRegisterSubmit(): void {
    const data = {
      email: this.form.email,
      first_name: this.form.first_name,
      last_name: this.form.last_name,
      password: this.form.password,
      password1: this.form.password1
    }
    console.log(this.form);
    console.log(data);
    this.authService.register(data).subscribe({
      next: (res) => {
        console.log(res);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    
  }
}