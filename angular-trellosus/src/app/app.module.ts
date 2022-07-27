import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './commons/helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { UsersModel } from './models/users/users.model';
import { RegisterComponent } from './component/register/register.component';
import { UsersComponent } from './component/users/users.component';
import { UsersDetailsComponent } from './component/users-details/users-details.component';
import { UsersProfileComponent } from './component/users-profile/users-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersModel,
    RegisterComponent,
    UsersComponent,
    UsersDetailsComponent,
    UsersProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
