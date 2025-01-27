import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
export class UserInformation{
  firstname : string;
  lastname : string;
  email : string;
  username : string;
  password : string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<any>(
        'http://localhost:8080/api/auth/signin',
        credentials,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>('Error occured')));
  }

  register(user:UserInformation){
    return this.http
    .post<any>(
      'http://localhost:8080/api/auth/signup',
      user,
      this.httpOptions
    )
    .pipe(catchError(this.handleError<any>('Username/Email already exist!')));

  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.userData.next(null);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
