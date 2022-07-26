import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.model.html',
  styleUrls: ['./users.model.css']
})
export class UsersModel {
  id?: string;
  email?: string;
  password?: string;
  password1?: string;
  first_name?: string;
  last_name?: string;
}

