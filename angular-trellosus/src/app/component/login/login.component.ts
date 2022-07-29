import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/commons/auth/auth.service';
import { TokenStorageService } from 'src/app/commons/token-storage/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  email?: '';
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()){
      this.isLoggedIn = true;
      this.email = this.tokenStorage.getUser().email;
    }
  }
  onLogin(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.email = this.tokenStorage.getUser().email;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
  };
  reloadPage(): void{
    window.location.reload();
  };
}

