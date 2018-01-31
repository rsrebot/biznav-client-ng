import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@app/core/auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router) { }

  userSubs: Subscription;
  user: User;

  isLoggedIn(): boolean {
    return this.user && this.user != null;
  }

  logout() {
    this.authService.logout();

    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.userSubs = this.authService.currentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
