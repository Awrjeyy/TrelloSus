import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UsersComponent } from './component/users/users.component';
import { UsersDetailsComponent } from './component/users-details/users-details.component';
import { UsersProfileComponent } from './component/users-profile/users-profile/users-profile.component';
import { UsersProfileUpdateComponent } from './component/users-profile-update/users-profile-update.component';
import { TasksComponent } from './component/tasks/tasks.component';
import { TasksDetailsComponent } from './component/tasks-details/tasks-details.component';
import { BoardsComponent } from './component/boards/boards.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users-detail', component: UsersDetailsComponent},
  {path: 'users-profile', component: UsersProfileComponent},
  {path: 'users-profile/:id', component: UsersProfileUpdateComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks-details/:id', component: TasksDetailsComponent},
  {path: 'boards', component: BoardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
