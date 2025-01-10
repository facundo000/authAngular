import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/authLayout/authLayout.component';
import { LoginPageComponent } from './pages/LoginPage/LoginPage.component';
import { RegisterPageComponent } from './pages/RegisterPage/RegisterPage.component';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent,
    children: [
      {path: 'login', component: LoginPageComponent },
      {path: 'register', component: RegisterPageComponent },
      {path: '**', redirectTo: 'login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
