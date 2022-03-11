import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HeaderComponent } from 'src/app/header/header.component';
//import { HeaderComponent, } from 'src/app/header/header.component';
//SomeSharedService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(HeaderComponent) child!: boolean;
  formGroup!: FormGroup;
  isUser = true;
  isLogged = false;
  //private someSharedService: SomeSharedService
  constructor(private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {

  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      //belows are 'controlsConfig' objects
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    } else {
      // 1. login request
      this.loginService.login$(this.formGroup.value, this.isUser).subscribe({
        next: (response) => {
          if (response) {
            this.loginService.logout();
            // 2. store data, local-storage
            this.loginService.storeUserData(response);
            //this.someSharedService.isLogged = true;

            // 3. navigate inside system
            this.router.navigate(['/home']);

            console.log('Login to the system is succeed!!! And you are navigated to home page')
          } else {
            this.loginService.logout();
          }
        }
      });
      console.log('----------->');
      console.log(this.loginService.getUserFromStorage());

    }
  }



  onSwitch(): void {
    if ((document.getElementById('toggBtn') as HTMLInputElement).checked) {
      this.isUser = false;
      console.log('is checked');
    } else {
      this.isUser = true;
      console.log('not checked');
    }

  }

}
