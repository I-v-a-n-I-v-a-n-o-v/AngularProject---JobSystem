import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth/auth.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class AuthenticationModule { }