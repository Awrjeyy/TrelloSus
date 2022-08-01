import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './commons/helpers/auth.interceptor';
import { MatSliderModule } from '@angular/material/slider';
import {DragDropModule} from '@angular/cdk/drag-drop'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UsersModel } from './models/users/users.model';
import { RegisterComponent } from './component/register/register.component';
import { UsersComponent } from './component/users/users.component';
import { UsersDetailsComponent } from './component/users-details/users-details.component';
import { UsersProfileComponent } from './component/users-profile/users-profile/users-profile.component';
import { UsersProfileUpdateComponent } from './component/users-profile-update/users-profile-update.component';
import { TasksComponent } from './component/tasks/tasks.component';
import { TasksDetailsComponent, } from './component/tasks-details/tasks-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardsComponent } from './component/boards/boards.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersModel,
    RegisterComponent,
    UsersComponent,
    UsersDetailsComponent,
    UsersProfileComponent,
    UsersProfileUpdateComponent,
    TasksComponent,
    TasksDetailsComponent,
    BoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
