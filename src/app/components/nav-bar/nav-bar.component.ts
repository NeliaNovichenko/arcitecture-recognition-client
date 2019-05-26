import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public current$ = this.userService.currentUser$;

  ngOnInit() {
  }

  public logOut() {
    this.userService.signOut().subscribe(() => {
      console.log('logged.out');
      this.router.navigateByUrl('/home');
    });
  }

}
