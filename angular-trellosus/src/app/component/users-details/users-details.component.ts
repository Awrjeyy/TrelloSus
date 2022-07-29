import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/commons/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModel } from 'src/app/models/users/users.model';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentViewedUser: UsersModel = {
    email: '',
    first_name: '',
    last_name: '',

  }
  message = '';
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.viewMode){
      this.message = '',
      this.getUserDetail(this.route.snapshot.params["id"]);
    }
  }
  getUserDetail(id: string): void{
    this.authService.getUser(id).subscribe({
      next: (data) => {
        this.currentViewedUser = data;
        console.log(data);
      },
      error: (e) => console.log(e)
    })
  }
}