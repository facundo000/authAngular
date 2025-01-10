import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/authLayout/authLayout.component';
import { LoginPageComponent } from './pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './pages/RegisterPage/RegisterPage.component';


@NgModule({
  declarations: [
    LoginPageComponent,    
    RegisterPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
