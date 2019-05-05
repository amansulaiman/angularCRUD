import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../user-registration/services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../user-registration/models/user.model';
import { TitleService } from '../shared/title.service';

@Component({
  selector: 'app-material-nav',
  templateUrl: './material-nav.component.html',
  styleUrls: ['./material-nav.component.css']
})
export class MaterialNavComponent {
  currentUser: User;
  isExpanded = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private breakpointObserver: BreakpointObserver,
      private tittleService: TitleService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }

}
