import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "../main/home/home.component";

const routes: Routes = [
    {
      path: '',
      component: AuthComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'signup',
          component: SignupComponent

        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'login'
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule {
  }