import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/commons/token-storage/token-storage.service';
import { AuthService } from 'src/app/commons/auth/auth.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  currentUser: any;
  urlImg?: string;
  constructor(
    private token: TokenStorageService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
    this.urlImg = 'http://localhost:8000' + this.currentUser.user_img
    console.log(this.currentUser.user_img);
  }

  
}
