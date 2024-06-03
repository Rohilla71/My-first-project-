import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/User';
import { environment } from 'src/environments/environment';
import { ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.APiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}


  loadCurrentUser(token: string | null) {
    this.currentUserSource.next(null);
    return of(null)
    // if (token == null) {
    //   this.currentUserSource.next(null);
    //   return of(null);
    // }

    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);

    // return this.http.get<User>(this.baseUrl + 'account', {headers}).pipe(
    //   map(user => {
    //     if (user) {
    //       localStorage.setItem('token', user.Token);
    //       this.currentUserSource.next(user);
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   })
    // )
  }

  login(values: any) {
    // return this.http.post<User>(this.baseUrl + 'Authentication/Login', values).pipe(
    //   map(user => {debugger
    //     var uData = JSON.parse(JSON.parse(JSON.stringify(user)).data);
        
    //     console.log(user)
    //     // localStorage.setItem('token', user.Token);
    //     localStorage.setItem('token', uData.Token);
    //     localStorage.setItem('userId',uData.UserId);
    //     this.currentUserSource.next(user);
    //   })
    // )
    return this.http.get('./assets/JSON/createcustomer.json')
  }
  register(values: any) {
    return this.http.post(this.baseUrl + 'Authentication/Register', values);
    // .pipe(
    //   map(user => {
    //     localStorage.setItem('token', user.Token);
    //     this.currentUserSource.next(user);
    //   })
    // )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigate(['/auth/sign-in'])//navigateByUrl('/');
  }

  sendForgotPasswordMail(values:any) {
    return this.http.post(this.baseUrl + 'ForgotPassword/ForgotPassword', values)
  }

  resetPassword(values:any) {
    return this.http.post(this.baseUrl + 'ForgotPassword/UpdatePassword', values)
  }
  

}
