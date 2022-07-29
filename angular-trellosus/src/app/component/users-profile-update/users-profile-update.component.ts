import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/commons/auth/auth.service';
import { UsersModel } from 'src/app/models/users/users.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/commons/token-storage/token-storage.service';

@Component({
  selector: 'app-users-profile-update',
  templateUrl: './users-profile-update.component.html',
  styleUrls: ['./users-profile-update.component.css']
})
export class UsersProfileUpdateComponent implements OnInit {
  form!: FormGroup;
  imageURL = '';
  message = '';
@Input() currentUser: UsersModel = {
  first_name: '',
  last_name: '',
  bio: '',
  user_img: [''],

}

  constructor(
    private authService: AuthService,
    private token: TokenStorageService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_img: ['']
    });
    this.getUser();
    console.log(this.currentUser.user_img);
  }
  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('user_img')?.setValue(file);
    }
  }
  getUser(): void{
    this.currentUser = this.token.getUser();
    
  }
  updateUser(): void {
    const formData = new FormData();
    formData.append('user_img', this.form.get('user_img')?.value)
    formData.append('first_name', this.currentUser.first_name!)
    formData.append('last_name', this.currentUser.last_name!)
    formData.append('bio', this.currentUser.bio!)
    console.log(this.form.get('user_img')?.value);
    console.log(this.currentUser.first_name!);
    console.log(this.currentUser.last_name!);
    console.log(this.currentUser.bio!);
    console.log(formData.getAll('user_img'));
    this.authService.updateCurrentUser(this.currentUser.id, formData)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : "User's Profile been updated"
      },
      error: (e) => console.error(e)
    });
  }
  
}
