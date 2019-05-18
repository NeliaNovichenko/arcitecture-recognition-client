import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.userService.currentUser) {
      return true;
    } else {
      this.router.navigateByUrl('/sign-in');
      return false;
    }
  }

  // canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
  //   return this.userService..map(e => {
  //       if (e) {
  //           return true;
  //       }
  //   }).catch(() => {
  //       this.router.navigate(['/login']);
  //       return Observable.of(false);
  //   });
// }
}
