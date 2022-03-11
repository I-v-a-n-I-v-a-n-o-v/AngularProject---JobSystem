import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../services/signup.service';
import { User } from 'src/Models/User';
import { Organisation } from 'src/app/main/models/Organisation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup!: FormGroup;
  isUser = true;
  private organisationModel: Organisation = new Organisation();
  private UserModel: User = new User();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public signupService: SignUpService) {
  }

  get organisationFormControl(): FormControl {
    return this.formGroup.get('organisationName') as FormControl;
  }
  get usernameFormControl(): FormControl {
    return this.formGroup.get('username') as FormControl;
  }
  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }
  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      //belows are 'controlsConfig' objects
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      organisationName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  onSwitch(): void {
    if ((document.getElementById('toggBtn') as HTMLInputElement).checked) {
      this.isUser = false;

      this.formGroup.get('organisationName')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
      this.formGroup.get('username')?.clearValidators();
      console.log('Not checked');
      console.log('is checked');
    }
    else {
      this.isUser = true;

      this.formGroup.get('username')?.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(30)]);
      this.formGroup.get('organisationName')?.clearValidators();
      console.log('Not checked');
    }

  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      // this.formGroup.value.email
    }
    else {

      if (this.isUser) {
        this.UserModel.email = this.formGroup.value.email;
        this.UserModel.username = this.formGroup.value.username;
        this.UserModel.password = this.formGroup.value.password;

        this.signupService.SignUp$(this.UserModel, this.isUser).subscribe();
      }
      else {
        this.organisationModel.organisationName = this.formGroup.value.organisationName;
        this.organisationModel.email = this.formGroup.value.email;
        this.organisationModel.password = this.formGroup.value.password;

        this.signupService.SignUp$(this.organisationModel, this.isUser).subscribe();
      }

      // 1.[HttpPost] signup request
      // this.signupService.SignUp$(this.formGroup.value, this.isUser).subscribe();
      // this.signupService.logout();

      // 3. navigate inside system
      this.router.navigate(['/']);
      console.log('Login to the system is succeed!!! And you are navigated to home page');

      // this.signupService.logout();
      console.log(this.signupService.getUserFromStorage());
    }
    // console.log(this.formGroup);
  }
}
