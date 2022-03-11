import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/Models/User";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private signUpUrlString!: string
  constructor(private http: HttpClient) {
  }

  SignUp$(data: any, isUser: boolean): Observable<any | null> {
    if (isUser) {
      this.signUpUrlString = 'User';
    } else {
      this.signUpUrlString = 'Organisation'
    }
    return this.http.post<any>(`${environment.apiUrl}/${this.signUpUrlString}`, data)
    // return this.http.get<User[]>(`${environment.apiUrl}/user`).pipe(
    //   map((response: User[]) => {
    //     const user = response.find(u => u.email === data.email && u.password === data.password);
    //     if (user) {
    //       return user;
    //     }

    //     return null;
    //   })
    // );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  storeUserData(user: User): void {
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('loggedUser')!);
  }
}
