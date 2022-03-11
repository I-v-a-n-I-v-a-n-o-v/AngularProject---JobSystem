import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
// import { Login } from "src/Models/login.model";
// import { User } from "src/Models/User";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrlString!: string
  isLogged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
  }

  login$(data: any, isUser: boolean): Observable<any | null> {
    if (isUser === true) {
      this.loginUrlString = 'User';
    } else {
      this.loginUrlString = 'Organisation'
    }
    return this.http.get<any[]>(`${environment.apiUrl}/${this.loginUrlString}`).pipe(
      map((response: any[]) => {
        const user = response.find(u => u.email === data.email && u.password === data.password);
        if (user) {
          return user;
        }

        return null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  storeUserData(user: any): void {
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.isLogged.next(true);
  }

  getUserFromStorage(): any {
    return JSON.parse(localStorage.getItem('loggedUser')!);
  }
}
