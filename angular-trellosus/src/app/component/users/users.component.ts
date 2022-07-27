import { Component, OnInit } from '@angular/core';
import { UsersModel } from 'src/app/models/users/users.model';
import { AuthService } from 'src/app/commons/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users?: UsersModel[];
  currentUserViewed: UsersModel = {};
  currentIndex = -1;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void{
    this.authService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.log(e)
    });
  }
  setActiveViewedUser(users: UsersModel, index: number): void {
    this.currentUserViewed = users;
    this.currentIndex = index;
  }

}