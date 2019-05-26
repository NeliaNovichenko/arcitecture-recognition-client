import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';
import { JwtService } from './jwt.service';
import { ErrorHandlingService } from './error-handling.service';
import { map, tap, catchError, delay } from 'rxjs/operators';
import { UserLoginModel } from '../models/user-login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser$ = new BehaviorSubject<User>(null);
  public currentUser: User = null;

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private errorHandlingService: ErrorHandlingService
  ) {
    this.setUpCurrentUserFromBackend().subscribe(() => { });
  }

  public signIn(loginModel: UserLoginModel): Observable<User> {
    const PATH = '/api/auth/sign-in';

    return this.httpClient.post<AuthModel>(PATH, loginModel)
      .pipe(
      tap(({user, token}) => {
        this.jwtService.persistToken(token);
        this.currentUser = user as User;
        this.currentUser$.next(user as User);
        console.log('User signed in', user);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public singUp(loginModel: UserLoginModel, firstName: string, lastName: string): Observable<User> {
    const PATH = '/api/auth/sign-up';

    return this.httpClient.post<AuthModel>(PATH, {
      signInModel: loginModel,
      firstName,
      lastName
    }).pipe(
      tap(({user, token}) => {
        this.jwtService.persistToken(token);
        this.currentUser = user as User;
        this.currentUser$.next(user as User);
        console.log('User signed up', user);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public signOut(): Observable<void> {
    return of(null).pipe(
      tap(() => {
        this.currentUser = null;
        this.currentUser$.next(null);
        this.jwtService.clearToken();
      })
    );
  }

  public setUpCurrentUserFromBackend(): Observable<User> {
    const PATH = '/api/user/current';

    if (!this.jwtService.getRawToken() || this.jwtService.isExpired()) {
      return of(null);
    }

    return this.httpClient.get<User>(PATH).pipe(
      tap((user: User) => {
        this.currentUser = user;
        this.currentUser$.next(user);
        console.log('Current user', user);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }
}

export class AuthModel { user: User; token: string; }
