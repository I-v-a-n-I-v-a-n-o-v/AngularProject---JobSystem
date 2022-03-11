import { Component, OnInit } from '@angular/core';
// import { User } from 'src/Models/User';
import { LoginService } from './authentication/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'JobSystem';


  constructor(private loginService: LoginService) {
    //delete all the files in the localStorage for securiry reasons
    // this.loginService.logout();
  }
  ngOnInit(): void {
    // this.loginService.getUsers().subscribe({
    //   next: (Response: User[]) => {
    //     this.
    //   };
    // });

  }


}
