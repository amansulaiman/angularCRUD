import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../user-registration/services/authentication.service';
import { User } from '../user-registration/models/user.model';
import { TitleService } from '../shared/title.service';

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
    private authenticationService: AuthenticationService,
    private tittleService: TitleService
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
