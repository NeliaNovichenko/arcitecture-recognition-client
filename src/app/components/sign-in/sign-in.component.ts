import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { UserLoginModel } from '../models';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  public email: string;
  public password: string;

  constructor(private router: Router, private userService: UserService) {}


  public signIn() {
    this.userService
      .signIn({
        login: this.email,
        password: this.password
      })
      .subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        () => {
          alert('Invalid credentials');
        }
      );
  }
}
