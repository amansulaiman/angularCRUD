import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../user-registration/services/authentication.service';
import { User } from '../user-registration/models/user.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  currentUser: User;
  isExpanded = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
