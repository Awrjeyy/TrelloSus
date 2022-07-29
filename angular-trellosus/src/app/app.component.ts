import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './commons/token-storage/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private roles: string[] = [];
  title = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  email?: string;
  userid?: string;
  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.userid = this.tokenStorageService.getUser().id;
      this.email = this.tokenStorageService.getUser().email;
      console.log(this.email);
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}