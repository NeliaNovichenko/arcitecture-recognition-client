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

  private currentUser$ = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private errorHandlingService: ErrorHandlingService
  ) { }

  public isSignedIn(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(currentUser => !!currentUser)
    );
  }

  // login : new_user2
  // pass: 666
  public signIn(loginModel: UserLoginModel): Observable<User> {
    const PATH = '/api/auth/sign-in';

    return this.httpClient.post<AuthModel>(PATH, loginModel)
      .pipe(
      tap(({user, token}) => {
        this.jwtService.persistToken(token);
        this.currentUser$.next(user as User);
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
        this.currentUser$.next(user as User);
      }),
      catchError(this.errorHandlingService.handleError)
    );
  }

  public signOut(): Observable<void> {
    return of(null).pipe(
      delay(1500),
      tap(() => {
        this.currentUser$.next(null);
        this.jwtService.clearToken();
      })
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  // public validateLogin(login: string): Observable<boolean> {
  //   const valid = !this.mockedUsers.some(userItem => userItem[0].login == login);
  //   return of(valid).pipe(
  //     delay(1500),
  //     catchError(this.errorHandlingService.handleError)
  //   );
  // }
}

export class AuthModel { user: User; token: string; }
