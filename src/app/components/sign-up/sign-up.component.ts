import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../models/user-login.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  public signUp(): void {
    this.userService.singUp({ login: this.email, password: this.password } as UserLoginModel,
      this.firstName, this.lastName)
      .subscribe(_ => {
        this.router.navigate(['/home']);
      });
  }
}
