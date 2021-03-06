import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private router: Router) { }

  // pay attention! this is an arrow function
  // uncomment console.logs, what is 'this' (current scope / context)?
  // uncomment handleError() below
  // look at console logs
  // this is undefine now.
  // it's because context was lost due to call like 'catchError(this.errorHandlingSerivce.handleError)'

  public handleError = (error: any): Observable<any> => {
    console.error(error);


    return throwError(error);
  }
}
