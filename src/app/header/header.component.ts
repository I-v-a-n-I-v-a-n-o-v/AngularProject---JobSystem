import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../authentication/services/login.service';


/*@Injectable()
export class SomeSharedService {
  public isLogged = false;
}*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
  isLogged = true;
  //private someSharedService: SomeSharedService
  constructor(private router: Router,
    private loginService: LoginService,
  ) { }
  //isLoggedRead = this.someSharedService.isLogged;
  ngOnInit(): void {
    this.loginService.isLogged.subscribe((response) => {
      this.isLogged = response;
    });

  }

  /*public isUserLogged(): boolean {
    if (localStorage.getItem('loggedUser') != 'undefined' || localStorage.getItem('loggedUser') != null) {
      return true;
    }
    else {
      return false;
    }
  }*/

  onSubmit(): void {
    this.loginService.logout();
    this.isLogged = false;
    this.router.navigate(['/home']);
    // this.isLoggedRead = false;

  }

}


